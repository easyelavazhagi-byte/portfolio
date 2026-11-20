import React, { useState } from 'react';
import { Check, Shield, Zap, Star, ArrowRight } from 'lucide-react';

export default function LandingPageDemo() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeTab, setActiveTab] = useState('features');

  return (
    <div style={{
      background: '#090d16',
      borderRadius: '0.75rem',
      overflow: 'hidden',
      border: '1px solid #1e293b',
      fontSize: '0.9rem'
    }}>
      {/* Mock Browser Header */}
      <div style={{
        background: '#0f172a',
        padding: '0.6rem 1rem',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
        </div>
        <div style={{
          background: '#1e293b',
          padding: '0.2rem 1.5rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          color: '#94a3b8'
        }}>
          https://modern-saas-landing.dev
        </div>
        <div style={{ width: '30px' }}></div>
      </div>

      {/* Mini Landing Page Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            background: 'rgba(56, 189, 248, 0.1)',
            color: '#38bdf8',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '9999px',
            padding: '0.2rem 0.75rem',
            fontSize: '0.75rem',
            fontWeight: 600
          }}>
            🚀 Launching Version 2.0
          </span>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.2 }}>
            Next-Gen Platform for Creative Developers
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', maxWidth: '420px' }}>
            Empower your team with lightning-fast cloud workflows, intuitive UI dashboards, and automated analytics.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{
              background: '#0ea5e9',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              Start Free Trial <ArrowRight size={14} />
            </button>
            <button style={{
              background: '#1e293b',
              color: '#cbd5e1',
              border: '1px solid #334155',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}>
              Live Demo
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #1e293b' }}>
            <Zap size={20} color="#38bdf8" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.9rem' }}>Ultra Fast Speed</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>Optimized asset delivery under 100ms globally.</p>
          </div>
          <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #1e293b' }}>
            <Shield size={20} color="#a855f7" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.9rem' }}>Enterprise Security</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>End-to-end encryption with zero-trust safety.</p>
          </div>
          <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #1e293b' }}>
            <Star size={20} color="#f59e0b" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.9rem' }}>99.9% Uptime</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>Resilient architecture with automatic backups.</p>
          </div>
        </div>

        {/* Pricing Toggle Mini */}
        <div style={{
          background: '#0f172a',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid #1e293b',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: billingCycle === 'monthly' ? '#38bdf8' : '#94a3b8' }}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              style={{
                width: '40px',
                height: '22px',
                borderRadius: '9999px',
                background: '#1e293b',
                border: '1px solid #38bdf8',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '2px',
                left: billingCycle === 'monthly' ? '3px' : '20px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#38bdf8',
                transition: 'left 0.2s'
              }}></div>
            </button>
            <span style={{ fontSize: '0.8rem', color: billingCycle === 'annual' ? '#38bdf8' : '#94a3b8' }}>
              Annual <span style={{ color: '#10b981', fontSize: '0.7rem' }}>(Save 20%)</span>
            </span>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
            {billingCycle === 'monthly' ? '$19 / month' : '$15 / month (billed annually)'}
          </div>
        </div>
      </div>
    </div>
  );
}
