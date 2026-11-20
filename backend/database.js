const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'portfolio.db');
const db = new DatabaseSync(dbPath);

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    tags TEXT NOT NULL,
    features TEXT NOT NULL,
    demo_type TEXT DEFAULT 'modal',
    live_demo TEXT,
    github_url TEXT,
    featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_read INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    level INTEGER NOT NULL,
    icon TEXT
  );
`);

// Seed projects if table is empty
const countStmt = db.prepare('SELECT COUNT(*) as count FROM projects');
const projectCount = countStmt.get().count;

if (projectCount === 0) {
  const insertProject = db.prepare(`
    INSERT INTO projects (title, category, description, long_description, tags, features, demo_type, live_demo, github_url, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const initialProjects = [
    {
      title: 'Smart Unit Converter',
      category: 'Utilities',
      description: 'A versatile, real-time conversion web tool supporting Length, Weight, Temperature, and Digital Storage units with instant bidirectional updates.',
      long_description: 'Designed for precision and ease of use, this converter handles multi-directional conversions with instant formula validation, rounding controls, and history tracking. Built using vanilla JavaScript and modern CSS.',
      tags: JSON.stringify(['HTML5', 'CSS3', 'JavaScript', 'Responsive UI']),
      features: JSON.stringify([
        'Real-time instant bidirectional calculation',
        'Multiple unit categories: Length, Weight, Temperature & Data',
        'Calculation breakdown with visual formula reference',
        'Mobile-friendly responsive touch interface'
      ]),
      demo_type: 'unit-converter',
      live_demo: '#demo-unit-converter',
      github_url: 'https://github.com/elavazhagi/unit-converter',
      featured: 1
    },
    {
      title: 'Modern Product Landing Page',
      category: 'Frontend',
      description: 'A responsive, high-converting SaaS product showcase page with smooth scrolling, animated hero section, feature cards, and interactive pricing.',
      long_description: 'An aesthetically pleasing landing page featuring glassmorphic navigation, modern typography, testimonial sliders, FAQ accordions, and animated call-to-actions crafted for high user engagement.',
      tags: JSON.stringify(['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Animations']),
      features: JSON.stringify([
        'Modern glassmorphism navigation & hero section',
        'Mobile-first responsive design across all viewports',
        'Interactive pricing toggle & feature cards',
        'Engaging hover animations & CSS transitions'
      ]),
      demo_type: 'landing-page',
      live_demo: '#demo-landing-page',
      github_url: 'https://github.com/elavazhagi/modern-landing-page',
      featured: 1
    },
    {
      title: 'Live Weather Forecast App',
      category: 'Web App',
      description: 'An interactive weather tracking application providing real-time weather metrics, 5-day forecasts, search auto-complete, and dynamic atmospheric themes.',
      long_description: 'Leveraging modern asynchronous JavaScript and weather REST APIs, this app presents temperature, humidity, wind velocity, pressure, and weather condition badges with dynamic daytime and nighttime theme shifts.',
      tags: JSON.stringify(['JavaScript', 'REST API', 'CSS3', 'Async/Await', 'Weather']),
      features: JSON.stringify([
        'Live weather metrics: Temperature, Humidity, Wind & Pressure',
        'Interactive city search with dynamic weather icon updates',
        '5-day visual forecast breakdown with high/low temperatures',
        'Dynamic weather themes based on real-time climate conditions'
      ]),
      demo_type: 'weather-app',
      live_demo: '#demo-weather-app',
      github_url: 'https://github.com/elavazhagi/weather-forecast-app',
      featured: 1
    },
    {
      title: 'Interactive Quiz Application',
      category: 'EdTech',
      description: 'A dynamic, gamified quiz platform featuring timed questions, immediate score validation, category selection, and comprehensive scorecards.',
      long_description: 'Built to demonstrate state management, interval timers, and interactive DOM feedback. Includes multiple choice questions, timer countdowns, correct answer breakdowns, and performance analytics.',
      tags: JSON.stringify(['React.js', 'JavaScript', 'CSS3', 'State Management']),
      features: JSON.stringify([
        'Per-question countdown timer with auto-advance',
        'Instant color-coded feedback on selected options',
        'Interactive performance scorecard and percentage badge',
        'Question review mode showing correct answers and explanations'
      ]),
      demo_type: 'quiz-app',
      live_demo: '#demo-quiz-app',
      github_url: 'https://github.com/elavazhagi/interactive-quiz-app',
      featured: 1
    },
    {
      title: 'Full-Stack Contact Management System',
      category: 'Full Stack',
      description: 'A comprehensive CRUD web application to create, view, edit, search, and delete contacts with persistent database storage and clean REST endpoints.',
      long_description: 'Showcases end-to-end full-stack integration: responsive frontend interface connected to Express.js REST APIs and database storage. Features instant search filtering, category tags, and input validation.',
      tags: JSON.stringify(['React.js', 'Node.js', 'Express.js', 'SQLite', 'REST API']),
      features: JSON.stringify([
        'Complete CRUD operations (Create, Read, Update, Delete)',
        'Instant live search by name, email, or category tag',
        'Backend REST API endpoints with robust error handling',
        'Persistent SQLite database storage with relational schema'
      ]),
      demo_type: 'contact-system',
      live_demo: '#demo-contact-system',
      github_url: 'https://github.com/elavazhagi/contact-management-system',
      featured: 1
    }
  ];

  for (const p of initialProjects) {
    insertProject.run(
      p.title,
      p.category,
      p.description,
      p.long_description,
      p.tags,
      p.features,
      p.demo_type,
      p.live_demo,
      p.github_url,
      p.featured
    );
  }
  console.log('Seeded 5 projects into database.');
}

// Seed skills if table is empty
const skillCount = db.prepare('SELECT COUNT(*) as count FROM skills').get().count;
if (skillCount === 0) {
  const insertSkill = db.prepare('INSERT INTO skills (category, name, level, icon) VALUES (?, ?, ?, ?)');
  const defaultSkills = [
    // Frontend
    ['Frontend', 'HTML5', 95, 'Code'],
    ['Frontend', 'CSS3 / Modern Styling', 92, 'Palette'],
    ['Frontend', 'JavaScript (ES6+)', 88, 'FileCode'],
    ['Frontend', 'React.js', 86, 'Atom'],
    ['Frontend', 'Bootstrap', 90, 'Layout'],
    ['Frontend', 'Responsive Design', 94, 'Smartphone'],
    // Backend & Database
    ['Backend & Database', 'Node.js', 80, 'Server'],
    ['Backend & Database', 'Express.js', 82, 'Layers'],
    ['Backend & Database', 'SQLite / SQL', 80, 'Database'],
    ['Backend & Database', 'RESTful APIs', 85, 'Cpu'],
    // Programming & Tools
    ['Programming & Tools', 'Java (Core OOP)', 84, 'Coffee'],
    ['Programming & Tools', 'Git & GitHub', 88, 'GitBranch'],
    ['Programming & Tools', 'VS Code', 92, 'Terminal'],
    ['Programming & Tools', 'Deployment (Vercel/Netlify)', 84, 'Cloud'],
    ['Programming & Tools', 'npm & Vite', 86, 'Sparkles']
  ];

  for (const s of defaultSkills) {
    insertSkill.run(s[0], s[1], s[2], s[3]);
  }
  console.log('Seeded skills into database.');
}

// Seed initial welcome message in messages table
const msgCount = db.prepare('SELECT COUNT(*) as count FROM messages').get().count;
if (msgCount === 0) {
  const insertMsg = db.prepare('INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)');
  insertMsg.run(
    'Thiranex EduTech Evaluator',
    'evaluator@thiranex.com',
    'Internship Portfolio Review',
    'Welcome Elavazhagi! Your full-stack portfolio with SQLite database integration, Express REST APIs, and React frontend is properly configured and ready for evaluation.'
  );
  console.log('Seeded initial message.');
}

module.exports = db;
