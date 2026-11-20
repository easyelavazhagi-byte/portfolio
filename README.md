# Personal Portfolio Website - Full-Stack Architecture
**Author:** Elavazhagi Murugan  
**Career Aspiration:** Full-Stack Developer  
**Academic Background:** 2nd Year B.E. Computer Science and Engineering (2025 – 2029), Prince Dr. K. Vasudevan College of Engineering and Technology  
**Internship:** Full Stack Intern, Thiranex (2 Month Internship)  
**Task Submission:** Task 1 — Full-Stack Personal Student Developer Portfolio  

---

## 🌟 Project Overview
This project is an authentic, professional student developer portfolio website designed for **Elavazhagi Murugan**. It fulfills all requirements specified in the **Thiranex** internship assignment:
- **Frontend:** React 19, HTML5, CSS3, JavaScript (ES6+), Bootstrap, Responsive Glassmorphism UI, Light / Dark mode toggle.
- **Backend:** Node.js & Express.js RESTful API.
- **Database:** Persistent SQL Database (`SQLite` via Node.js native engine, plus MongoDB & MySQL configurations included).
- **Deployment-Ready:** Single-command production build (`npm start`), ready for deployment to Vercel, Netlify, or Render.

---

## 🚀 Key Features

### 1. Home Section & Professional Identity
- **Full Name:** Elavazhagi Murugan
- **Profile Photo:** Official professional photo integrated with an elegant glowing gradient border.
- **Headline:** *"Hi, I'm Elavazhagi Murugan — Aspiring Full-Stack Developer"*
- **Badges:** 2nd Year B.E. CSE Student (2025–2029) • Full Stack Intern @ Thiranex • Available for Full-Stack Opportunities.
- **Actions:** "View My Projects", "Get In Touch", "Download / View Resume", and "DB Inspector".
- **Verified Social Links:**
  - **GitHub:** [https://github.com/easyelavazhagi-byte](https://github.com/easyelavazhagi-byte)
  - **LinkedIn:** [https://www.linkedin.com/in/elavazhagi-murugan-0b23153aa](https://www.linkedin.com/in/elavazhagi-murugan-0b23153aa)
  - **Email:** `elavazhagimurugan@gmail.com`
  - *(Phone number kept private for security)*

### 2. About Me Section
- Personal introduction, degree (B.E. Computer Science and Engineering), and college affiliation.
- Current academic year: 2nd Year (2025 – 2029).
- Technical interests, core values, and career aspiration to become a skilled Full-Stack Developer.

### 3. Internship Experience (Thiranex)
- **Company:** Thiranex
- **Role:** Full Stack Intern
- **Duration:** 2 Month Internship (Ongoing)
- **Key Responsibilities:** Full-stack development tasks, responsive frontend components, backend REST API routing, database integration, and clean code practices.
- **Technologies Used:** HTML5, CSS3, JavaScript, React.js, Bootstrap, Node.js, Express.js, SQL / MySQL.

### 4. Technical Skills
Categorized skill cards with animated progress meters:
- **Frontend Development:** HTML5 (95%), CSS3 (92%), JavaScript ES6+ (88%), React.js (86%), Bootstrap & Responsive Design (90%)
- **Backend & Database:** Node.js (82%), Express.js (84%), SQL / MySQL / SQLite (82%), RESTful APIs (85%)
- **Programming & Tools:** **Java (Core OOP Concepts)** (84%), Git & GitHub (88%), VS Code (92%), Vite & npm (86%)

### 5. 5 Featured Projects with Live Interactive Demos
Every project features tech stack pills, source code links to your GitHub profile, and a **"Try Live Demo"** button that opens a working interactive mini-app in the browser:
1. **Smart Unit Converter:** Real-time bidirectional converter for Length, Weight, and Temperature metrics with instant formula calculation.
2. **Modern SaaS Landing Page:** High-converting product showcase page with responsive layout, animations, and interactive pricing tier switch.
3. **Live Weather Forecast App:** Dynamic weather dashboard with city search, live atmospheric metrics (Temperature, Humidity, Wind), and a 5-day forecast.
4. **Interactive Quiz Application:** Timed frontend development quiz with live countdown timer, scoring, instant question feedback, and celebration confetti.
5. **Full-Stack Contact Management System:** Complete CRUD application allowing users to create, search, filter, and delete contacts with persistent storage.

### 6. Learning Journey Section
- **Currently Learning:** Advanced React patterns, backend middleware pipelines, relational schema modeling, and Java OOP algorithms.
- **Skills to Improve:** Authentication (JWT), testing, CI/CD automation, and cloud deployments.
- **Future Goals:** Graduating in the Class of 2029 with honors, securing a Full-Stack Software Developer role, and contributing to open source.

### 7. Contact Section with Real-Time Database Persistence
- Working contact form with full input validation.
- Submissions call `POST /api/contact` and persist into the database.
- Interactive celebration confetti upon successful submission.
- Direct contact cards for Email, LinkedIn, GitHub, and Location (Chennai, India).

### 8. Additional Enhancements
- 🌓 **Interactive Light / Dark Mode Toggle** in the navigation bar.
- ⬆️ **Floating Back-to-Top Button** with smooth animated scrolling.
- 🗄️ **Live Database Inspector Modal** for evaluators to view real SQL table data.
- 📄 **Interactive Student CV Modal** with a one-click **"Print / Save as PDF"** option.

---

## 📂 Project Directory Structure

```text
elavazhagi-portfolio/
├── backend/
│   ├── database.js            # SQLite database schema, initialization & seed data
│   ├── database_mongo.js      # MongoDB / Mongoose alternative configuration
│   ├── database_mysql.js      # MySQL / mysql2 alternative configuration
│   ├── server.js              # Express REST API server & static file host
│   └── portfolio.db           # Persistent SQLite database file
├── frontend/
│   ├── public/
│   │   └── elavazhagi-photo.jpg # Official profile photo
│   ├── src/
│   │   ├── components/
│   │   │   ├── UnitConverterDemo.jsx      # Live Unit Converter interactive demo
│   │   │   ├── LandingPageDemo.jsx        # Live Landing Page interactive demo
│   │   │   ├── WeatherAppDemo.jsx         # Live Weather App interactive demo
│   │   │   ├── QuizAppDemo.jsx            # Live Quiz App interactive demo
│   │   │   ├── ContactSystemDemo.jsx      # Live Contact Management interactive demo
│   │   │   ├── DatabaseInspectorModal.jsx # Live Database table viewer & REST tester
│   │   │   └── ResumeModal.jsx            # Professional CV modal (Print / Save as PDF)
│   │   ├── App.jsx            # Core portfolio component & section coordinator
│   │   ├── index.css          # Modern dark/light-mode styling & glassmorphism utilities
│   │   └── main.jsx           # React root renderer
│   ├── dist/                  # Production-optimized build bundle
│   ├── index.html             # HTML entry with custom typography
│   ├── package.json           # Frontend dependencies & Vite scripts
│   └── vite.config.js         # Vite configuration with API proxy
├── test_server.js             # Automated end-to-end integration test runner
├── package.json               # Root scripts & backend dependencies
└── README.md                  # Project documentation & evaluator guide
```

---

## ⚡ How to Run Locally

### Step 1: Open Terminal in the project directory
```bash
cd C:\Users\ELAVAZHAGI\.gemini\antigravity\scratch\elavazhagi-portfolio
```

### Step 2: Start the Full-Stack Application
```bash
npm start
```
The server will start on: **`http://localhost:5000`**  
Open this URL in your web browser to experience your live application!

### Alternative Development Mode (Hot Reloading)
- Run backend: `npm run backend` (runs Express on port 5000)
- Run frontend: `npm run dev` (runs Vite dev server on `http://localhost:5173`)

### Run Automated Tests
```bash
npm test
```

---

## 🚢 Deployment Guide

### Option 1: Deploy to Vercel (Recommended)
1. Push this folder to your GitHub: `https://github.com/easyelavazhagi-byte/portfolio`
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Select your repository, set the Root Directory to `frontend`, and click **Deploy**.
4. You will get a live link (e.g. `https://elavazhagi-portfolio.vercel.app`) to submit for your internship!

### Option 2: Deploy to Netlify
1. Log in to [Netlify](https://www.netlify.com/) and click **"Add new site" > "Import an existing project"**.
2. Connect your GitHub repository.
3. Build command: `npm run build`
4. Publish directory: `dist` (inside frontend)
5. Click **Deploy**.

---

## 📬 Contact Information
- **Name:** Elavazhagi Murugan
- **Email:** `elavazhagimurugan@gmail.com`
- **LinkedIn:** [https://www.linkedin.com/in/elavazhagi-murugan-0b23153aa](https://www.linkedin.com/in/elavazhagi-murugan-0b23153aa)
- **GitHub:** [https://github.com/easyelavazhagi-byte](https://github.com/easyelavazhagi-byte)
- **College:** Prince Dr. K. Vasudevan College of Engineering and Technology, Chennai (2025–2029)
