# Full-Stack Personal Portfolio Web Application

A professional, modern Full-Stack Personal Portfolio built with **React.js (Vite + Tailwind CSS)** on the frontend, **Node.js (Express.js + node-postgres)** on the backend, and **PostgreSQL** for database persistence.

## 🚀 Key Features
- **Hero & Identity Showcase**: Personalized homepage featuring high-resolution developer profile imagery and dynamic bio.
- **Projects Showcase**: Interactive filtering by technology stack, live demo links, and GitHub repository links.
- **Skills Matrix**: Categorized technical skills with proficiency visualization bars.
- **Career & Education Timeline**: Dedicated work experience and academic milestones.
- **Secure Contact Form**: Input-validated, rate-limited visitor inquiry form with instant database storage.
- **Admin Dashboard**: Full CRUD management of projects, skills, profile information, and incoming inquiries secured by JWT authentication.
- **Layered Architecture**: Decoupled clean architecture (`Routes -> Controllers -> Services -> Repositories -> Database Pool`).

## 📁 Project Structure
```
portfolio-app/
├── frontend/             # React + Vite + Tailwind CSS + Framer Motion
├── backend/              # Node.js + Express + pg (node-postgres)
│   ├── src/
│   │   ├── config/       # Database & environment configuration
│   │   ├── database/     # SQL migrations & seed scripts
│   │   ├── routes/       # Versioned API routes (/api/v1)
│   │   ├── controllers/  # Request & response handlers
│   │   ├── services/     # Business logic & validation
│   │   ├── repositories/ # SQL queries & database operations
│   │   ├── middleware/   # Authentication, rate limiting & error handling
│   │   └── utils/        # ApiError & helper utilities
│   └── tests/            # Automated smoke & integration tests
└── docs/                 # Requirements, database design & API documentation
```

## 🛠️ Getting Started

### 1. Database & Backend
```bash
cd backend
npm install
npm run migrate
npm run seed
npm run dev
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Running Automated Tests
```bash
cd backend
node tests/api.test.js
```
