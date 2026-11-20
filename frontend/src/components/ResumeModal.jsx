import React from 'react';
import { X, Printer, GraduationCap, Briefcase, Code, Award } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '820px' }}>
        {/* Header bar */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={20} color="#0ea5e9" /> Curriculum Vitae (CV) Preview
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handlePrint}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: '#0ea5e9',
                borderRadius: '0.5rem',
                padding: '0.4rem 0.85rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontWeight: 600
              }}
            >
              <Printer size={15} /> Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'var(--bg-card)',
                border: 'none',
                color: 'var(--text-muted)',
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
        </div>

        {/* Resume Content */}
        <div style={{
          padding: '2rem',
          color: 'var(--text-main)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          fontSize: '0.9rem'
        }}>
          {/* Header section */}
          <div style={{ borderBottom: '2px solid rgba(14, 165, 233, 0.3)', paddingBottom: '1.25rem' }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              ELAVAZHAGI MURUGAN
            </h1>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0ea5e9', marginTop: '0.25rem' }}>
              Aspiring Full-Stack Developer & Computer Science Engineering Student
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>📍 Chennai, Tamil Nadu, India</span>
              <span>✉️ elavazhagimurugan@gmail.com</span>
              <span>🔗 linkedin.com/in/elavazhagi-murugan-0b23153aa</span>
              <span>💻 github.com/easyelavazhagi-byte</span>
            </div>
          </div>

          {/* Career Objective */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
              Career Objective
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.65 }}>
              Motivated 2nd Year B.E. Computer Science and Engineering student at Prince Dr. K. Vasudevan College of Engineering and Technology with practical experience as a Full Stack Intern at Thiranex. Passionate about software development, modern frontend frameworks (React.js, JavaScript, Bootstrap), backend RESTful APIs (Node.js, Express), database systems (SQL / MySQL), and object-oriented programming with Java. Eager to continuously learn, solve real-world problems, and grow into a skilled Full-Stack Developer.
            </p>
          </div>

          {/* Education */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
              Education
            </h3>
            <div style={{ background: 'var(--card-inner)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <h4 style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                  Bachelor of Engineering (B.E.) in Computer Science & Engineering
                </h4>
                <span style={{ fontSize: '0.8rem', color: '#0ea5e9', fontWeight: 600 }}>2025 – 2029 (2nd Year)</span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                Prince Dr. K. Vasudevan College of Engineering and Technology, Chennai
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.4rem' }}>
                Key Subjects: Data Structures & Algorithms, Object-Oriented Programming (Java), Database Management Systems (SQL), Web Development, Operating Systems.
              </p>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
              Internship Experience
            </h3>
            <div style={{ background: 'var(--card-inner)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                <h4 style={{ fontWeight: 700, color: 'var(--text-main)' }}>Full Stack Intern</h4>
                <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>2 Month Internship (Ongoing)</span>
              </div>
              <div style={{ color: '#0ea5e9', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                Thiranex
              </div>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <li>Engaging in full-stack development related tasks, building modern, responsive, and user-friendly web interfaces.</li>
                <li>Working with modern technologies including HTML5, CSS3, JavaScript, React.js, Bootstrap, Node.js, and SQL.</li>
                <li>Gaining hands-on experience in full-stack architecture, API integration, and clean code principles.</li>
              </ul>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
              Technical Skills
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              <div style={{ background: 'var(--card-inner)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: 'var(--text-main)', fontSize: '0.85rem' }}>Frontend Development:</strong>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  HTML5, CSS3, JavaScript (ES6+), React.js, Bootstrap, Responsive Web Design
                </div>
              </div>
              <div style={{ background: 'var(--card-inner)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: 'var(--text-main)', fontSize: '0.85rem' }}>Backend & Database:</strong>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  Node.js, Express.js, RESTful APIs, SQL / MySQL / SQLite Database Management
                </div>
              </div>
              <div style={{ background: 'var(--card-inner)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: 'var(--text-main)', fontSize: '0.85rem' }}>Programming & Tools:</strong>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  Java (Core OOP), Git & GitHub, VS Code, npm, Vite
                </div>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
              Key Projects
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ background: 'var(--card-inner)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>1. Full-Stack Contact Management System: </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>CRUD web app with React, Node.js, Express, and persistent SQL database.</span>
              </div>
              <div style={{ background: 'var(--card-inner)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>2. Live Weather Forecast App: </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Interactive weather dashboard with real-time REST API integration and dynamic forecasts.</span>
              </div>
              <div style={{ background: 'var(--card-inner)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>3. Smart Unit Converter: </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Real-time conversion tool supporting Length, Weight, and Temperature metrics.</span>
              </div>
              <div style={{ background: 'var(--card-inner)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>4. Interactive Quiz App: </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Gamified quiz with countdown timer, state management, and score evaluation.</span>
              </div>
              <div style={{ background: 'var(--card-inner)', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>5. Modern SaaS Landing Page: </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Responsive product landing page built with modern Bootstrap, CSS, and animations.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
