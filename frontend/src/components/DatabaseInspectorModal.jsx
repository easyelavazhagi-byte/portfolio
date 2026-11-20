import React, { useState, useEffect } from 'react';
import { Database, Server, RefreshCw, Trash2, CheckCircle2, AlertCircle, PlusCircle, X } from 'lucide-react';

export default function DatabaseInspectorModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch real database records from Express API
  const fetchDbData = async () => {
    setLoading(true);
    setStatusMessage('');
    try {
      const [projRes, msgRes, statsRes] = await Promise.all([
        fetch('/api/projects').catch(() => null),
        fetch('/api/messages').catch(() => null),
        fetch('/api/stats').catch(() => null)
      ]);

      if (projRes && projRes.ok) {
        const pData = await projRes.json();
        setProjects(pData);
      }
      if (msgRes && msgRes.ok) {
        const mData = await msgRes.json();
        setMessages(mData);
      }
      if (statsRes && statsRes.ok) {
        const sData = await statsRes.json();
        setStats(sData);
      }
    } catch (err) {
      console.error('Error fetching DB records:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDbData();
    }
  }, [isOpen]);

  const handleDeleteMessage = async (id) => {
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStatusMessage('Message deleted successfully from database.');
        fetchDbData();
      }
    } catch (err) {
      console.error('Delete message error:', err);
    }
  };

  const handleInsertSampleMessage = async () => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Evaluator Reviewer',
          email: 'reviewer@thiranex.com',
          subject: 'Database Persistence Test',
          message: 'Testing live full-stack SQLite database insertion from portfolio inspector.'
        })
      });
      if (res.ok) {
        setStatusMessage('Test record inserted into database!');
        fetchDbData();
      }
    } catch (err) {
      console.error('Insert error:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.95)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              background: 'rgba(56, 189, 248, 0.15)',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              color: '#38bdf8'
            }}>
              <Database size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Full-Stack Database Inspector
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  ● SQLite Connected
                </span>
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                Live inspection of backend SQLite database tables & REST API endpoints
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#1e293b',
              border: 'none',
              color: '#94a3b8',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Status banner */}
          <div style={{
            background: '#090d16',
            borderRadius: '0.75rem',
            padding: '1rem',
            border: '1px solid #1e293b',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Backend Server</span>
              <div style={{ fontWeight: 600, color: '#38bdf8', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Server size={14} /> Node.js + Express (Port 5000)
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Database Engine</span>
              <div style={{ fontWeight: 600, color: '#10b981', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Database size={14} /> SQLite (`node:sqlite`)
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Database Records</span>
              <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.9rem' }}>
                {projects.length} Projects • {messages.length} Messages
              </div>
            </div>
          </div>

          {/* Action and Tab Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setActiveTab('projects')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeTab === 'projects' ? '1px solid #38bdf8' : '1px solid #334155',
                  background: activeTab === 'projects' ? 'rgba(56, 189, 248, 0.2)' : '#0f172a',
                  color: activeTab === 'projects' ? '#38bdf8' : '#94a3b8'
                }}
              >
                Projects Table ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeTab === 'messages' ? '1px solid #38bdf8' : '1px solid #334155',
                  background: activeTab === 'messages' ? 'rgba(56, 189, 248, 0.2)' : '#0f172a',
                  color: activeTab === 'messages' ? '#38bdf8' : '#94a3b8'
                }}
              >
                Messages Table ({messages.length})
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleInsertSampleMessage}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '0.5rem',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  color: '#10b981',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <PlusCircle size={14} /> Insert Sample Message
              </button>
              <button
                onClick={fetchDbData}
                disabled={loading}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '0.5rem',
                  background: '#1e293b',
                  border: '1px solid #334155',
                  color: '#cbd5e1',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
              </button>
            </div>
          </div>

          {statusMessage && (
            <div style={{
              padding: '0.6rem 1rem',
              borderRadius: '0.5rem',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10b981',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle2 size={16} /> {statusMessage}
            </div>
          )}

          {/* Table View */}
          <div style={{
            background: '#090d16',
            borderRadius: '0.75rem',
            border: '1px solid #1e293b',
            overflowX: 'auto',
            maxHeight: '380px'
          }}>
            {activeTab === 'projects' ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#0f172a', borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>ID</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Title</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Tech Stack</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Database Type</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #1e293b' }}>
                      <td style={{ padding: '0.75rem 1rem', color: '#38bdf8', fontWeight: 600 }}>#{p.id}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#f8fafc', fontWeight: 600 }}>{p.title}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={{
                          padding: '0.15rem 0.5rem',
                          borderRadius: '9999px',
                          background: 'rgba(139, 92, 246, 0.15)',
                          color: '#a855f7',
                          fontSize: '0.75rem'
                        }}>
                          {p.category}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                        {Array.isArray(p.tags) ? p.tags.join(', ') : p.tags}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: '#10b981', fontSize: '0.8rem' }}>
                        SQLite Record
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#0f172a', borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>ID</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Sender</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Email</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Subject & Message</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Received At</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '1.5rem', textAlign: 'center', color: '#94a3b8' }}>
                        No messages in database yet. Submit the contact form or click "Insert Sample Message" above!
                      </td>
                    </tr>
                  ) : (
                    messages.map((m) => (
                      <tr key={m.id} style={{ borderBottom: '1px solid #1e293b' }}>
                        <td style={{ padding: '0.75rem 1rem', color: '#38bdf8', fontWeight: 600 }}>#{m.id}</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#f8fafc', fontWeight: 600 }}>{m.name}</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#94a3b8' }}>{m.email}</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#cbd5e1', maxWidth: '280px' }}>
                          <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{m.subject}</div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {m.message}
                          </div>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', color: '#64748b', fontSize: '0.75rem' }}>
                          {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <button
                            onClick={() => handleDeleteMessage(m.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              padding: '0.3rem',
                              borderRadius: '0.25rem'
                            }}
                            title="Delete message from DB"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
