import React, { useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Compass, Search } from 'lucide-react';

const CITIES = {
  Chennai: { tempC: 31, condition: 'Partly Sunny', humidity: 72, wind: 14, icon: Sun, color: '#f59e0b', forecast: [32, 31, 30, 31, 32] },
  Bengaluru: { tempC: 24, condition: 'Mild & Breezy', humidity: 58, wind: 18, icon: Cloud, color: '#38bdf8', forecast: [25, 24, 23, 24, 25] },
  Mumbai: { tempC: 29, condition: 'Humid & Clear', humidity: 79, wind: 12, icon: Sun, color: '#f59e0b', forecast: [30, 29, 29, 30, 31] },
  Delhi: { tempC: 22, condition: 'Cool Breeze', humidity: 45, wind: 10, icon: Cloud, color: '#94a3b8', forecast: [23, 22, 21, 22, 23] },
  London: { tempC: 14, condition: 'Light Rain', humidity: 85, wind: 22, icon: CloudRain, color: '#818cf8', forecast: [15, 14, 13, 14, 15] }
};

export default function WeatherAppDemo() {
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [unit, setUnit] = useState('C');
  const [searchQuery, setSearchQuery] = useState('');

  const cityData = CITIES[selectedCity] || CITIES['Chennai'];
  const IconComponent = cityData.icon;

  const displayTemp = (celsius) => {
    if (unit === 'F') {
      return Math.round((celsius * 9) / 5 + 32) + '°F';
    }
    return Math.round(celsius) + '°C';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const found = Object.keys(CITIES).find(
      (c) => c.toLowerCase() === searchQuery.trim().toLowerCase()
    );
    if (found) {
      setSelectedCity(found);
      setSearchQuery('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* City search bar */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            placeholder="Search city (e.g. Chennai, Bengaluru, Mumbai, London)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.25rem',
              borderRadius: '0.5rem',
              background: '#0f172a',
              border: '1px solid #334155',
              color: '#fff',
              fontSize: '0.85rem'
            }}
          />
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
        <button
          type="button"
          onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
          style={{
            padding: '0.6rem 1rem',
            background: '#1e293b',
            border: '1px solid #38bdf8',
            color: '#38bdf8',
            borderRadius: '0.5rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          °{unit}
        </button>
      </form>

      {/* Quick Select Chips */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {Object.keys(CITIES).map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCity(c)}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 500,
              cursor: 'pointer',
              border: selectedCity === c ? '1px solid #38bdf8' : '1px solid #334155',
              background: selectedCity === c ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.6)',
              color: selectedCity === c ? '#38bdf8' : '#cbd5e1'
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Weather Card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.8))',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc' }}>{selectedCity}</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{cityData.condition}</p>
          </div>
          <IconComponent size={44} color={cityData.color} />
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <span style={{ fontSize: '3rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>
            {displayTemp(cityData.tempC)}
          </span>
          <span style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 600 }}>• Live Metrics</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Droplets size={18} color="#38bdf8" />
            <div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Humidity</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc' }}>{cityData.humidity}%</div>
            </div>
          </div>
          <div style={{ background: '#0f172a', padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Wind size={18} color="#a855f7" />
            <div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Wind Speed</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc' }}>{cityData.wind} km/h</div>
            </div>
          </div>
        </div>

        {/* 5-Day Outlook */}
        <div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            5-Day Forecast
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem', textAlign: 'center' }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, idx) => (
              <div key={day} style={{ background: '#0f172a', padding: '0.5rem 0.25rem', borderRadius: '0.4rem', border: '1px solid #1e293b' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{day}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', marginTop: '0.2rem' }}>
                  {displayTemp(cityData.forecast[idx])}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
