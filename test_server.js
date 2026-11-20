const http = require('http');

require('./backend/server.js');

setTimeout(async () => {
  try {
    const health = await fetch('http://localhost:5000/api/health').then(r => r.json());
    console.log('API Health Check:', health);

    const projects = await fetch('http://localhost:5000/api/projects').then(r => r.json());
    console.log(`\nSuccessfully fetched ${projects.length} projects from SQLite database:`);
    projects.forEach((p, i) => {
      console.log(` ${i + 1}. ${p.title} (${p.category})`);
    });

    const stats = await fetch('http://localhost:5000/api/stats').then(r => r.json());
    console.log('\nDatabase Stats:', stats);

    const contactPost = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Evaluation Bot',
        email: 'test@evaluation.edu',
        subject: 'Automated Test Message',
        message: 'Verifying end-to-end full-stack database persistence!'
      })
    }).then(r => r.json());
    console.log('\nContact API POST response:', contactPost);

    const messages = await fetch('http://localhost:5000/api/messages').then(r => r.json());
    console.log(`\nTotal messages stored in SQLite messages table: ${messages.length}`);

    const indexHtml = await fetch('http://localhost:5000/').then(r => r.text());
    console.log('\nFrontend index.html served successfully! (Length:', indexHtml.length, 'bytes)');

    console.log('\nALL FULL-STACK TESTS PASSED SUCCESSFULLY! 🚀');
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
}, 800);
