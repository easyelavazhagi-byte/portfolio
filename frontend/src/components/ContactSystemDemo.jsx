import React, { useState } from 'react';
import { User, Phone, Mail, Tag, Plus, Trash2, Search, UserCheck } from 'lucide-react';

const INITIAL_CONTACTS = [
  { id: 1, name: 'Dr. K. Vasudevan College Dept', email: 'cse@princeengg.edu.in', phone: '+91 44 2278 0303', category: 'College' },
  { id: 2, name: 'Thiranex EduTech Team', email: 'mentors@thiranex.com', phone: '+91 98 7654 3210', category: 'Internship' },
  { id: 3, name: 'Elavazhagi (Portfolio Owner)', email: 'elavazhagi@example.com', phone: '+91 91234 56789', category: 'Personal' }
];

export default function ContactSystemDemo() {
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCat, setNewCat] = useState('College');

  const filtered = contacts.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                          c.email.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newContact = {
      id: Date.now(),
      name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim() || '+91 90000 00000',
      category: newCat
    };

    setContacts([newContact, ...contacts]);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Search and Action Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.55rem 0.75rem 0.55rem 2.2rem',
              borderRadius: '0.5rem',
              background: '#0f172a',
              border: '1px solid #334155',
              color: '#fff',
              fontSize: '0.85rem'
            }}
          />
          <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: '0.55rem 0.75rem',
            borderRadius: '0.5rem',
            background: '#1e293b',
            border: '1px solid #334155',
            color: '#fff',
            fontSize: '0.85rem'
          }}
        >
          <option value="All">All Categories</option>
          <option value="College">College</option>
          <option value="Internship">Internship</option>
          <option value="Personal">Personal</option>
        </select>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            padding: '0.55rem 1rem',
            borderRadius: '0.5rem',
            background: '#0ea5e9',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Plus size={16} /> {showAddForm ? 'Cancel' : 'Add Contact'}
        </button>
      </div>

      {/* Add Contact Collapsible Form */}
      {showAddForm && (
        <form onSubmit={handleAddContact} style={{
          background: '#0f172a',
          padding: '1rem',
          borderRadius: '0.75rem',
          border: '1px solid #38bdf8',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0.6rem',
          alignItems: 'end'
        }}>
          <div>
            <label style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{ width: '100%', padding: '0.45rem', borderRadius: '0.35rem', background: '#1e293b', border: '1px solid #334155', color: '#fff', fontSize: '0.8rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Email Address *</label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              style={{ width: '100%', padding: '0.45rem', borderRadius: '0.35rem', background: '#1e293b', border: '1px solid #334155', color: '#fff', fontSize: '0.8rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Phone</label>
            <input
              type="text"
              placeholder="+91..."
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              style={{ width: '100%', padding: '0.45rem', borderRadius: '0.35rem', background: '#1e293b', border: '1px solid #334155', color: '#fff', fontSize: '0.8rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Category</label>
            <select
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              style={{ width: '100%', padding: '0.45rem', borderRadius: '0.35rem', background: '#1e293b', border: '1px solid #334155', color: '#fff', fontSize: '0.8rem' }}
            >
              <option value="College">College</option>
              <option value="Internship">Internship</option>
              <option value="Personal">Personal</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              padding: '0.5rem',
              borderRadius: '0.35rem',
              background: '#10b981',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            Save to Directory
          </button>
        </form>
      )}

      {/* Contacts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '280px', overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
            No contacts found matching your search.
          </div>
        ) : (
          filtered.map((c) => (
            <div
              key={c.id}
              style={{
                background: '#0f172a',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid #1e293b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(56, 189, 248, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38bdf8',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}>
                  {c.name.charAt(0)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 600, color: '#f1f5f9', fontSize: '0.9rem' }}>{c.name}</span>
                    <span style={{
                      fontSize: '0.65rem',
                      padding: '0.1rem 0.45rem',
                      borderRadius: '9999px',
                      background: 'rgba(99, 102, 241, 0.15)',
                      color: '#818cf8',
                      border: '1px solid rgba(99, 102, 241, 0.3)'
                    }}>
                      {c.category}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Mail size={12} /> {c.email}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Phone size={12} /> {c.phone}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDelete(c.id)}
                title="Delete Contact"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  padding: '0.4rem',
                  borderRadius: '0.35rem'
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
