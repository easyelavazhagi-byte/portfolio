import React, { useState } from 'react';
import { ArrowLeftRight, Check, Sparkles } from 'lucide-react';

const CONVERSION_TYPES = {
  length: {
    name: 'Length',
    units: ['Meters', 'Kilometers', 'Centimeters', 'Feet', 'Inches'],
    toBase: { Meters: 1, Kilometers: 1000, Centimeters: 0.01, Feet: 0.3048, Inches: 0.0254 }
  },
  weight: {
    name: 'Weight',
    units: ['Kilograms', 'Grams', 'Pounds', 'Ounces'],
    toBase: { Kilograms: 1, Grams: 0.001, Pounds: 0.453592, Ounces: 0.0283495 }
  },
  temperature: {
    name: 'Temperature',
    units: ['Celsius', 'Fahrenheit', 'Kelvin']
  }
};

export default function UnitConverterDemo() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('Meters');
  const [toUnit, setToUnit] = useState('Feet');
  const [inputValue, setInputValue] = useState('10');

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    const units = CONVERSION_TYPES[newCat].units;
    setFromUnit(units[0]);
    setToUnit(units[1]);
  };

  const calculateResult = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return '—';

    if (category === 'temperature') {
      if (fromUnit === toUnit) return val.toFixed(2);
      let celsius = val;
      if (fromUnit === 'Fahrenheit') celsius = (val - 32) * (5 / 9);
      if (fromUnit === 'Kelvin') celsius = val - 273.15;

      if (toUnit === 'Celsius') return celsius.toFixed(2);
      if (toUnit === 'Fahrenheit') return (celsius * (9 / 5) + 32).toFixed(2);
      if (toUnit === 'Kelvin') return (celsius + 273.15).toFixed(2);
    } else {
      const config = CONVERSION_TYPES[category];
      const baseValue = val * config.toBase[fromUnit];
      const converted = baseValue / config.toBase[toUnit];
      return converted >= 10000 || (converted < 0.001 && converted > 0)
        ? converted.toExponential(4)
        : converted.toFixed(4).replace(/\.?0+$/, '');
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {Object.keys(CONVERSION_TYPES).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: category === cat ? '1px solid #38bdf8' : '1px solid #334155',
              background: category === cat ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.6)',
              color: category === cat ? '#38bdf8' : '#94a3b8',
              transition: 'all 0.2s'
            }}
          >
            {CONVERSION_TYPES[cat].name}
          </button>
        ))}
      </div>

      <div style={{
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              style={{
                width: '100%',
                marginTop: '0.25rem',
                padding: '0.6rem',
                borderRadius: '0.5rem',
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155'
              }}
            >
              {CONVERSION_TYPES[category].units.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <button
            onClick={swapUnits}
            title="Swap Units"
            style={{
              marginTop: '1.25rem',
              background: '#334155',
              border: 'none',
              color: '#38bdf8',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ArrowLeftRight size={16} />
          </button>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              style={{
                width: '100%',
                marginTop: '0.25rem',
                padding: '0.6rem',
                borderRadius: '0.5rem',
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155'
              }}
            >
              {CONVERSION_TYPES[category].units.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Enter Amount</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type value..."
            style={{
              width: '100%',
              marginTop: '0.25rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              background: '#0f172a',
              color: '#38bdf8',
              fontSize: '1.2rem',
              fontWeight: 600,
              border: '1px solid #38bdf8'
            }}
          />
        </div>

        <div style={{
          marginTop: '0.5rem',
          padding: '1rem',
          borderRadius: '0.75rem',
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(99, 102, 241, 0.1))',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Converted Result:</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span>{calculateResult()}</span>
              <span style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: 500 }}>{toUnit}</span>
            </div>
          </div>
          <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '0.5rem', borderRadius: '50%' }}>
            <Sparkles size={20} color="#38bdf8" />
          </div>
        </div>
      </div>
    </div>
  );
}
