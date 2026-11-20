const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Elavazhagi Portfolio API',
    database: 'SQLite (node:sqlite)',
    timestamp: new Date().toISOString()
  });
});

// API: Get summary stats
app.get('/api/stats', (req, res) => {
  try {
    const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get().count;
    const messageCount = db.prepare('SELECT COUNT(*) as count FROM messages').get().count;
    const skillCount = db.prepare('SELECT COUNT(*) as count FROM skills').get().count;
    res.json({
      projects: projectCount,
      messages: messageCount,
      skills: skillCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get all projects (with optional category filter)
app.get('/api/projects', (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM projects ORDER BY featured DESC, id ASC';
    let rows;

    if (category && category !== 'All') {
      rows = db.prepare('SELECT * FROM projects WHERE category = ? ORDER BY featured DESC, id ASC').all(category);
    } else {
      rows = db.prepare(query).all();
    }

    // Format tags and features from JSON strings
    const formatted = rows.map((p) => {
      let tags = [];
      let features = [];
      try {
        tags = JSON.parse(p.tags);
      } catch (e) {
        tags = p.tags ? p.tags.split(',') : [];
      }
      try {
        features = JSON.parse(p.features);
      } catch (e) {
        features = p.features ? [p.features] : [];
      }
      return {
        ...p,
        tags,
        features
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get single project by ID
app.get('/api/projects/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: 'Project not found' });
    }
    let tags = [];
    let features = [];
    try { tags = JSON.parse(row.tags); } catch (e) { tags = []; }
    try { features = JSON.parse(row.features); } catch (e) { features = []; }

    res.json({ ...row, tags, features });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Add a new project (Admin / Demo purpose)
app.post('/api/projects', (req, res) => {
  try {
    const { title, category, description, long_description, tags, features, demo_type, live_demo, github_url } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    const tagsJson = Array.isArray(tags) ? JSON.stringify(tags) : JSON.stringify([tags || 'Frontend']);
    const featuresJson = Array.isArray(features) ? JSON.stringify(features) : JSON.stringify([features || 'Responsive UI']);

    const stmt = db.prepare(`
      INSERT INTO projects (title, category, description, long_description, tags, features, demo_type, live_demo, github_url, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      title,
      category || 'Frontend',
      description,
      long_description || description,
      tagsJson,
      featuresJson,
      demo_type || 'modal',
      live_demo || '#',
      github_url || 'https://github.com/elavazhagi',
      0
    );

    res.status(201).json({
      success: true,
      message: 'Project added successfully to database!',
      id: result.lastInsertRowid
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Delete a project
app.delete('/api/projects/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
    const result = stmt.run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Project not found.' });
    }
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get skills
app.get('/api/skills', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM skills ORDER BY category, level DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Submit contact form (stores into SQLite database)
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const stmt = db.prepare(`
      INSERT INTO messages (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(name, email, subject || 'General Inquiry', message);

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! Your submission has been saved to the database. Elavazhagi will contact you soon.',
      id: result.lastInsertRowid
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Get all messages (for demonstration / admin view)
app.get('/api/messages', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM messages ORDER BY id DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API: Delete a message
app.delete('/api/messages/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM messages WHERE id = ?');
    const result = stmt.run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Message not found.' });
    }
    res.json({ success: true, message: 'Message removed from database.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend build if present
const distPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
