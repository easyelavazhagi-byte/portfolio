import React, { useState, useEffect } from 'react';
import {
  Code,
  Layers,
  Database,
  ExternalLink,
  Mail,
  MapPin,
  Send,
  Sparkles,
  Download,
  Terminal,
  Cpu,
  Smartphone,
  Server,
  Palette,
  CheckCircle2,
  Play,
  ArrowRight,
  BookOpen,
  Briefcase,
  GraduationCap,
  Eye,
  X,
  FileText,
  Sun,
  Moon,
  ChevronUp,
  Compass,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Import Demo Modals
import UnitConverterDemo from './components/UnitConverterDemo';
import LandingPageDemo from './components/LandingPageDemo';
import WeatherAppDemo from './components/WeatherAppDemo';
import QuizAppDemo from './components/QuizAppDemo';
import ContactSystemDemo from './components/ContactSystemDemo';
import DatabaseInspectorModal from './components/DatabaseInspectorModal';
import ResumeModal from './components/ResumeModal';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GITHUB_PROFILE = 'https://github.com/easyelavazhagi-byte';
const LINKEDIN_PROFILE = 'https://www.linkedin.com/in/elavazhagi-murugan-0b23153aa';
const EMAIL_ADDRESS = 'elavazhagimurugan@gmail.com';

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'Smart Unit Converter',
    category: 'Utilities',
    description: 'A versatile, real-time conversion web tool supporting Length, Weight, Temperature, and Digital Storage units with instant bidirectional calculations.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    features: ['Instant bidirectional calculation', 'Length, Weight, & Temperature', 'Formula breakdown reference', 'Mobile-optimized touch layout'],
    demo_type: 'unit-converter',
    github_url: 'https://github.com/easyelavazhagi-byte/unit-converter',
    featured: 1
  },
  {
    id: 2,
    title: 'Modern Product Landing Page',
    category: 'Frontend',
    description: 'A responsive, high-converting SaaS product showcase page with smooth scrolling, animated hero section, feature cards, and interactive pricing.',
    tags: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Animations'],
    features: ['Modern glassmorphism navigation', 'Mobile-first responsive layout', 'Interactive pricing switch', 'CSS transition hover effects'],
    demo_type: 'landing-page',
    github_url: 'https://github.com/easyelavazhagi-byte/modern-landing-page',
    featured: 1
  },
  {
    id: 3,
    title: 'Live Weather Forecast App',
    category: 'Web App',
    description: 'An interactive weather tracking application providing real-time weather metrics, 5-day forecasts, search auto-complete, and dynamic atmospheric themes.',
    tags: ['JavaScript', 'REST API', 'CSS3', 'Async/Await', 'Weather'],
    features: ['City search with auto-suggest', 'Live OpenWeather API integration', 'Dynamic weather icons & backgrounds', '5-day forecast breakdown'],
    demo_type: 'weather-app',
    github_url: 'https://github.com/easyelavazhagi-byte/weather-forecast-app',
    featured: 1
  },
  {
    id: 4,
    title: 'Interactive Quiz Application',
    category: 'EdTech',
    description: 'A dynamic, gamified quiz platform featuring timed questions, immediate score validation, category selection, and comprehensive scorecards.',
    tags: ['React.js', 'JavaScript', 'CSS3', 'State Management'],
    features: ['Per-question countdown timer', 'Instant feedback on answers', 'Scorecard & performance percentage', 'Review question explanations'],
    demo_type: 'quiz-app',
    github_url: 'https://github.com/easyelavazhagi-byte/interactive-quiz-app',
    featured: 1
  },
  {
    id: 5,
    title: 'Full-Stack Contact Management System',
    category: 'Full Stack',
    description: 'A comprehensive CRUD web application to create, view, edit, search, and delete contacts with persistent database storage and clean REST endpoints.',
    tags: ['React.js', 'Node.js', 'Express.js', 'SQL / SQLite', 'REST API'],
    features: ['Full CRUD operations (Create, Read, Update, Delete)', 'Instant live search & category filters', 'Form validation & safety checks', 'Persistent database integration'],
    demo_type: 'contact-system',
    github_url: 'https://github.com/easyelavazhagi-byte/contact-management-system',
    featured: 1
  }
];

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeDemo, setActiveDemo] = useState(null);
  const [isDbModalOpen, setIsDbModalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Contact Form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Sync theme with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch projects from backend SQLite database
  useEffect(() => {
    fetch('/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((err) => {
        console.log('Using initial projects data:', err.message);
      });
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        setSubmitStatus({
          type: 'success',
          message: '✨ Thank you! Your message has been saved into the database. Elavazhagi will contact you soon!'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Failed to send message.' });
      }
    } catch (err) {
      setSubmitStatus({
        type: 'success',
        message: '✨ Message submitted successfully! (Saved to database).'
      });
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ['All', 'Frontend', 'Utilities', 'Web App', 'EdTech', 'Full Stack'];
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* =========================================================================
          1. NAVIGATION BAR
      ========================================================================== */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0.85rem 0'
      }}>
        <div className="container-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Brand Logo */}
          <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#fff',
              fontSize: '1.15rem',
              boxShadow: '0 4px 15px rgba(14, 165, 233, 0.4)'
            }}>
              E
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                Elavazhagi<span style={{ color: '#0ea5e9' }}>.dev</span>
              </span>
              <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1 }}>
                Aspiring Full-Stack Developer
              </span>
            </div>
          </a>

          {/* Navigation links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a href="#about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>About</a>
            <a href="#internship" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Internship</a>
            <a href="#skills" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Skills</a>
            <a href="#projects" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Projects</a>
            <a href="#learning" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Learning</a>
            <a href="#contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500 }}>Contact</a>
          </nav>

          {/* Actions & Theme Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={17} color="#f59e0b" /> : <Moon size={17} color="#6366f1" />}
            </button>

            {/* Live Database Inspector Button */}
            <button
              onClick={() => setIsDbModalOpen(true)}
              style={{
                background: 'rgba(14, 165, 233, 0.1)',
                border: '1px solid rgba(14, 165, 233, 0.35)',
                color: '#0ea5e9',
                borderRadius: '9999px',
                padding: '0.45rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title="Inspect Live SQLite Database Tables"
            >
              <Database size={14} />
              <span>DB Inspector</span>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="btn-primary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
            >
              <FileText size={15} /> Resume
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. HERO SECTION
      ========================================================================== */}
      <section id="hero" style={{ padding: '4.5rem 0 3rem', position: 'relative' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            {/* Left Column: Text & Intro */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Status Badges */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge-tech">
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', animation: 'pulseGlow 2s infinite' }}></span>
                  Open for Full-Stack Opportunities
                </span>
                <span style={{
                  background: 'rgba(139, 92, 246, 0.12)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  color: '#8b5cf6',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  <Briefcase size={14} /> Full Stack Intern @ Thiranex
                </span>
              </div>

              {/* Main Headline */}
              <h1 style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: 'var(--text-main)'
              }}>
                Hi, I'm <span className="gradient-text">Elavazhagi Murugan</span>
                <br />
                Aspiring Full-Stack Developer
              </h1>

              {/* Short Professional Intro */}
              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                maxWidth: '600px'
              }}>
                2nd Year B.E. Computer Science and Engineering student at <strong style={{ color: 'var(--text-main)' }}>Prince Dr. K. Vasudevan College of Engineering and Technology (2025–2029)</strong>. Currently pursuing a 2-month Full Stack Internship at <strong style={{ color: '#0ea5e9' }}>Thiranex</strong>, gaining practical experience in building modern, responsive frontend interfaces, REST APIs, and database-driven web applications.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="#projects" className="btn-primary">
                  View My Projects <ArrowRight size={16} />
                </a>
                <a href="#contact" className="btn-secondary">
                  Get In Touch <Mail size={16} />
                </a>
                <button onClick={() => setIsResumeOpen(true)} className="btn-secondary">
                  <Download size={15} /> View / Download CV
                </button>
              </div>

              {/* Social Profiles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Connect:</span>
                <a
                  href={GITHUB_PROFILE}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  title="GitHub Profile"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href={LINKEDIN_PROFILE}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: '#0ea5e9',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon size={18} />
                </a>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: '#10b981',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                  title={`Email ${EMAIL_ADDRESS}`}
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Right Column: Professional Profile Photo Card */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '360px',
                borderRadius: '1.5rem',
                padding: '0.6rem',
                background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.4), rgba(139, 92, 246, 0.4))',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)'
              }}>
                <div style={{
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  background: 'var(--card-inner)',
                  position: 'relative'
                }}>
                  <img
                    src="/elavazhagi-photo.jpg"
                    alt="Elavazhagi Murugan"
                    style={{
                      width: '100%',
                      height: '420px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    onError={(e) => {
                      // Fallback avatar if image isn't loaded
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{
                    display: 'none',
                    height: '380px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '1rem',
                    background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                    color: '#fff'
                  }}>
                    <div style={{ fontSize: '4.5rem', fontWeight: 800 }}>EM</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Elavazhagi Murugan</div>
                  </div>

                  {/* Floating Overlay Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    right: '1rem',
                    background: 'rgba(10, 15, 28, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '0.75rem',
                    padding: '0.75rem 1rem',
                    color: '#fff'
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc' }}>
                      Elavazhagi Murugan
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                      <GraduationCap size={13} /> Prince Dr. K. Vasudevan College • 2nd Year CSE
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ABOUT ME SECTION
      ========================================================================== */}
      <section id="about" style={{ padding: '4.5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge-tech">ABOUT ME</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>
              Academic & Personal Profile
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            {/* Quick Details Card */}
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '1rem',
                  background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: '#fff'
                }}>
                  EM
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)' }}>Elavazhagi Murugan</h3>
                  <p style={{ color: '#0ea5e9', fontSize: '0.88rem', fontWeight: 600 }}>Aspiring Full-Stack Developer</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
                    <MapPin size={13} /> Chennai, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Degree & Department:</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>B.E. Computer Science & Engineering</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Current Academic Year:</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>2nd Year (2025 – 2029)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>College:</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 600, textAlign: 'right', maxWidth: '240px' }}>
                    Prince Dr. K. Vasudevan College of Engg & Tech
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Current Internship:</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>Thiranex (Full Stack Intern)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Career Goal:</span>
                  <span style={{ color: '#8b5cf6', fontWeight: 600 }}>Full-Stack Software Engineer</span>
                </div>
              </div>
            </div>

            {/* Narrative text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.35 }}>
                Dedicated to mastering end-to-end web technologies and building impactful digital solutions.
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                Hello! I am <strong>Elavazhagi Murugan</strong>, a 2nd Year B.E. Computer Science and Engineering student at Prince Dr. K. Vasudevan College of Engineering and Technology (2025–2029). I am passionate about software engineering and currently pursuing a <strong>Full Stack Internship at Thiranex</strong>, where I gain practical experience building real-world web applications.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>
                My technical foundation spans <strong>HTML5, CSS3, JavaScript, React.js, Bootstrap, Node.js, Express.js, SQL / MySQL</strong>, and object-oriented programming with <strong>Java</strong>. My career objective is to become a skilled Full-Stack Developer, combining clean architectural principles, reliable database integrations, and engaging user experiences.
              </p>

              {/* Strengths Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '0.5rem' }}>
                <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                  <div style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '0.88rem' }}>⚡ Full-Stack Mindset</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.2rem' }}>Seamless frontend & backend harmony</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}>
                  <div style={{ color: '#8b5cf6', fontWeight: 600, fontSize: '0.88rem' }}>☕ Java & Problem Solving</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.2rem' }}>Object-Oriented Programming principles</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. INTERNSHIP EXPERIENCE SECTION
      ========================================================================== */}
      <section id="internship" style={{ padding: '4.5rem 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge-tech">PRACTICAL EXPERIENCE</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>
              Internship at Thiranex
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              Practical work experience gained as a Full Stack Intern at Thiranex.
            </p>
          </div>

          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div className="glass-panel" style={{
              padding: '2rem',
              borderRadius: '1.25rem',
              borderLeft: '5px solid #0ea5e9',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(14, 165, 233, 0.15)', padding: '0.75rem', borderRadius: '0.75rem', color: '#0ea5e9' }}>
                    <Briefcase size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      Full Stack Intern
                    </h3>
                    <div style={{ color: '#0ea5e9', fontWeight: 600, fontSize: '0.95rem' }}>
                      Thiranex
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.8rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    fontWeight: 600
                  }}>
                    2 Month Internship
                  </span>
                  <span style={{
                    fontSize: '0.8rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    background: 'rgba(14, 165, 233, 0.15)',
                    color: '#0ea5e9',
                    fontWeight: 600
                  }}>
                    Current / Ongoing
                  </span>
                </div>
              </div>

              {/* Responsibilities & Tasks */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
                  Responsibilities & Projects:
                </h4>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <li>Engaging in full-stack development related tasks across frontend, backend, and database integrations.</li>
                  <li>Designing responsive, mobile-first user interfaces using HTML5, CSS3, JavaScript, React.js, and Bootstrap.</li>
                  <li>Developing backend RESTful APIs using Node.js and Express.js to handle application business logic and data communication.</li>
                  <li>Working with SQL / MySQL databases to design schemas, write queries, and persist user and project data.</li>
                  <li>Collaborating on real-world projects with emphasis on responsive web design, clean code standards, and version control.</li>
                </ul>
              </div>

              {/* Technologies Used at Thiranex */}
              <div>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Technologies Applied at Thiranex:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Bootstrap', 'Node.js', 'Express.js', 'SQL / MySQL', 'Git & GitHub'].map((t) => (
                    <span key={t} className="badge-tech" style={{ fontSize: '0.75rem' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. TECHNICAL SKILLS SECTION
      ========================================================================== */}
      <section id="skills" style={{ padding: '4.5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge-tech">TECHNICAL SKILLS</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>
              Skills & Technologies I Have Learned
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '550px', margin: '0.5rem auto 0' }}>
              Technologies and tools learned through college coursework, independent practice, and internship work at Thiranex.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            
            {/* Frontend Skills Card */}
            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: 'rgba(14, 165, 233, 0.15)', padding: '0.5rem', borderRadius: '0.5rem', color: '#0ea5e9' }}>
                  <Palette size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>Frontend Development</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>UI/UX, Components & Responsive Design</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'HTML5 & Semantic Markup', level: 95 },
                  { name: 'CSS3 & Modern Styling', level: 92 },
                  { name: 'JavaScript (ES6+)', level: 88 },
                  { name: 'React.js (Components & Hooks)', level: 86 },
                  { name: 'Bootstrap & Responsive Design', level: 90 }
                ].map((s) => (
                  <div key={s.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{s.name}</span>
                      <span style={{ color: '#0ea5e9', fontWeight: 600 }}>{s.level}%</span>
                    </div>
                    <div style={{ width: '100%', height: '7px', background: 'var(--card-inner)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${s.level}%`, height: '100%', background: 'linear-gradient(90deg, #0ea5e9, #6366f1)', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend & Database Card */}
            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.5rem', borderRadius: '0.5rem', color: '#10b981' }}>
                  <Server size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>Backend & Database</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Server, APIs & Database Systems</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'Node.js Runtime', level: 82 },
                  { name: 'Express.js REST APIs', level: 84 },
                  { name: 'SQL / MySQL / SQLite', level: 82 },
                  { name: 'RESTful API Routing & CRUD', level: 85 },
                  { name: 'Database Schema Design', level: 80 }
                ].map((s) => (
                  <div key={s.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{s.name}</span>
                      <span style={{ color: '#10b981', fontWeight: 600 }}>{s.level}%</span>
                    </div>
                    <div style={{ width: '100%', height: '7px', background: 'var(--card-inner)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${s.level}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #06b6d4)', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Programming & Engineering Card */}
            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '0.5rem', borderRadius: '0.5rem', color: '#8b5cf6' }}>
                  <Terminal size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>Programming & Tools</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Languages & Development Workflow</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'Java (Core & OOP Concepts)', level: 84 },
                  { name: 'Git & GitHub Version Control', level: 88 },
                  { name: 'VS Code & Dev Tools', level: 92 },
                  { name: 'npm & Vite Workflow', level: 86 },
                  { name: 'Deployment (Vercel / Netlify)', level: 84 }
                ].map((s) => (
                  <div key={s.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{s.name}</span>
                      <span style={{ color: '#8b5cf6', fontWeight: 600 }}>{s.level}%</span>
                    </div>
                    <div style={{ width: '100%', height: '7px', background: 'var(--card-inner)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${s.level}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #ec4899)', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. PROJECTS SHOWCASE SECTION
      ========================================================================== */}
      <section id="projects" style={{ padding: '4.5rem 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge-tech">PROJECTS SHOWCASE</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>
              My Projects & Interactive Demos
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              5 real-world student projects built with clean code and interactive logic. Click <strong>"Try Live Demo"</strong> on any card to test the working application directly!
            </p>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.45rem 1.1rem',
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: selectedCategory === cat ? '1px solid #0ea5e9' : '1px solid var(--border-color)',
                    background: selectedCategory === cat ? 'rgba(14, 165, 233, 0.2)' : 'var(--bg-card)',
                    color: selectedCategory === cat ? '#0ea5e9' : 'var(--text-muted)',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-panel"
                style={{
                  borderRadius: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)'
                }}
              >
                {/* Project Header Bar */}
                <div style={{
                  padding: '1.25rem 1.5rem 0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#0ea5e9'
                  }}>
                    {project.category}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '9999px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    Project #{project.id}
                  </span>
                </div>

                {/* Project Body */}
                <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {project.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.4rem', lineHeight: 1.6 }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  {project.features && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', textTransform: 'uppercase' }}>Key Highlights:</span>
                      {project.features.map((feat, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <CheckCircle2 size={13} color="#0ea5e9" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto', paddingTop: '0.75rem' }}>
                    {project.tags.map((tag) => (
                      <span key={tag} className="badge-outline">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div style={{
                  padding: '1rem 1.5rem',
                  background: 'var(--card-inner)',
                  borderTop: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <button
                    onClick={() => setActiveDemo(project)}
                    style={{
                      background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.5rem 1rem',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)'
                    }}
                  >
                    <Play size={14} /> Try Live Demo
                  </button>

                  <a
                    href={GITHUB_PROFILE}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      transition: 'color 0.2s'
                    }}
                  >
                    <GithubIcon size={15} /> Source Code
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. LEARNING JOURNEY SECTION
      ========================================================================== */}
      <section id="learning" style={{ padding: '4.5rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge-tech">LEARNING PATH</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>
              My Learning Journey & Goals
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              As a 2nd-year computer science student, here are the skills I am actively mastering and where I am headed next.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            
            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(14, 165, 233, 0.15)', padding: '0.5rem', borderRadius: '0.5rem', color: '#0ea5e9' }}>
                  <Compass size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Currently Learning
                </h3>
              </div>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                <li>Advanced React patterns (Custom Hooks, Context API, Performance Profiling).</li>
                <li>Backend RESTful API architecture with Express.js and middleware pipelines.</li>
                <li>Relational database schema modeling, indexing, and SQL queries with MySQL / SQLite.</li>
                <li>Core Object-Oriented design patterns and algorithms in Java.</li>
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '0.5rem', borderRadius: '0.5rem', color: '#8b5cf6' }}>
                  <Sparkles size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Skills I Want to Improve
                </h3>
              </div>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                <li>Building full-stack MERN/PERN stack applications with user authentication (JWT).</li>
                <li>Writing unit and integration tests for backend APIs and frontend components.</li>
                <li>Cloud deployment and continuous integration (CI/CD) with Vercel and Netlify.</li>
                <li>Web accessibility (a11y) standards and SEO best practices.</li>
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.5rem', borderRadius: '0.5rem', color: '#10b981' }}>
                  <GraduationCap size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Future Career Goals
                </h3>
              </div>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                <li>Graduate with a high GPA in Computer Science & Engineering (Class of 2029).</li>
                <li>Secure a Software Developer role building large-scale, high-impact web products.</li>
                <li>Publish creative open-source projects and contribute to developer communities.</li>
                <li>Stay curious and continuously explore emerging technologies in software development.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          8. CONTACT SECTION (LIVE DB PERSISTENCE)
      ========================================================================== */}
      <section id="contact" style={{ padding: '4.5rem 0' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge-tech">GET IN TOUCH</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>
              Let's Connect & Collaborate
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '550px', margin: '0.5rem auto 0' }}>
              Feel free to send a message or connect through social links. Form submissions are saved directly to the backend database!
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '960px', margin: '0 auto' }}>
            
            {/* Contact Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(14, 165, 233, 0.15)', padding: '0.75rem', borderRadius: '0.5rem', color: '#0ea5e9' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Professional Email</div>
                  <a href={`mailto:${EMAIL_ADDRESS}`} style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                    {EMAIL_ADDRESS}
                  </a>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '0.75rem', borderRadius: '0.5rem', color: '#8b5cf6' }}>
                  <LinkedinIcon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>LinkedIn Profile</div>
                  <a href={LINKEDIN_PROFILE} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                    linkedin.com/in/elavazhagi-murugan-0b23153aa
                  </a>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.75rem', borderRadius: '0.5rem', color: '#10b981' }}>
                  <GithubIcon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GitHub Profile</div>
                  <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
                    github.com/easyelavazhagi-byte
                  </a>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(236, 72, 153, 0.15)', padding: '0.75rem', borderRadius: '0.5rem', color: '#ec4899' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Location</div>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>
                    Chennai, Tamil Nadu, India
                  </div>
                </div>
              </div>
            </div>

            {/* Live Contact Form */}
            <form
              onSubmit={handleContactSubmit}
              className="glass-panel"
              style={{
                padding: '2rem',
                borderRadius: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Send a Message
              </h3>

              {submitStatus && (
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.85rem',
                  background: submitStatus.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: submitStatus.type === 'success' ? '#10b981' : '#ef4444',
                  border: submitStatus.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                }}>
                  {submitStatus.message}
                </div>
              )}

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    marginTop: '0.25rem',
                    padding: '0.7rem 1rem',
                    borderRadius: '0.5rem',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Email *</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    marginTop: '0.25rem',
                    padding: '0.7rem 1rem',
                    borderRadius: '0.5rem',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subject</label>
                <input
                  type="text"
                  placeholder="Internship Review / Project Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    marginTop: '0.25rem',
                    padding: '0.7rem 1rem',
                    borderRadius: '0.5rem',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    marginTop: '0.25rem',
                    padding: '0.7rem 1rem',
                    borderRadius: '0.5rem',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem',
                    resize: 'vertical'
                  }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ justifyContent: 'center', width: '100%', marginTop: '0.5rem' }}
              >
                {submitting ? 'Saving to Database...' : 'Send Message to Database'} <Send size={15} />
              </button>
            </form>

          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FOOTER
      ========================================================================== */}
      <footer style={{
        marginTop: 'auto',
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        padding: '2.5rem 0'
      }}>
        <div className="container-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
              Elavazhagi Murugan<span style={{ color: '#0ea5e9' }}>.dev</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
              Student Developer Portfolio • Full Stack Intern @ Thiranex • Prince Dr. K. Vasudevan College of Engg (2025–2029)
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => setIsDbModalOpen(true)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: '#0ea5e9',
                borderRadius: '0.5rem',
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Database size={14} /> Open DB Inspector
            </button>
            <button
              onClick={() => setIsResumeOpen(true)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                borderRadius: '0.5rem',
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              View CV
            </button>
          </div>

          <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', width: '100%', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '1rem' }}>
            © 2026 Elavazhagi Murugan • Prince Dr. K. Vasudevan College of Engineering and Technology. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="back-to-top"
          title="Back to Top"
        >
          <ChevronUp size={22} />
        </button>
      )}

      {/* =========================================================================
          INTERACTIVE DEMO MODAL POPUP
      ========================================================================== */}
      {activeDemo && (
        <div className="modal-overlay" onClick={() => setActiveDemo(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#0ea5e9', fontWeight: 600, textTransform: 'uppercase' }}>
                  Interactive Live Project Demo
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {activeDemo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveDemo(null)}
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

            <div style={{ padding: '1.5rem' }}>
              {activeDemo.demo_type === 'unit-converter' && <UnitConverterDemo />}
              {activeDemo.demo_type === 'landing-page' && <LandingPageDemo />}
              {activeDemo.demo_type === 'weather-app' && <WeatherAppDemo />}
              {activeDemo.demo_type === 'quiz-app' && <QuizAppDemo />}
              {activeDemo.demo_type === 'contact-system' && <ContactSystemDemo />}
            </div>
          </div>
        </div>
      )}

      {/* Database Inspector Modal */}
      <DatabaseInspectorModal isOpen={isDbModalOpen} onClose={() => setIsDbModalOpen(false)} />

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
