# System Requirements & Specification

## 1. Project Overview
A modern, dynamic Full-Stack Personal Portfolio Web Application built with React, Node.js, Express, and PostgreSQL.

### Core Objectives
- Showcase personal identity, technical skills, featured projects, work experience, and educational background.
- Provide a secure, rate-limited contact form for visitors and recruiters.
- Offer a password-protected administrative dashboard for managing projects, skills, profile information, and incoming messages.
- Decouple data presentation from storage using clean layered architecture (`Routes -> Controllers -> Services -> Repositories -> Database`).

## 2. Functional Requirements
- **Visitor Experience**:
  - Browse hero section with developer image, headline, bio, and quick actions.
  - Filter and inspect portfolio projects with live demo links and repository links.
  - Review technical skills visualized with proficiency indicators.
  - Explore career history (Experience) and academic credentials (Education).
  - Submit messages with automated email validation and rate-limiting.
- **Admin Management**:
  - JWT-secured login authentication with hashed passwords (bcrypt).
  - Full CRUD operations on projects (title, description, tags, URLs, featured toggle).
  - Full CRUD operations on skills (name, category, level 1-5).
  - Direct profile editing (headline, bio, location, resume URL, social links).
  - Contact inbox for viewing, marking read, and deleting visitor inquiries.

## 3. Non-Functional Requirements
- **Security**:
  - HTTP security headers with Helmet.
  - Strict CORS origin policies.
  - IP-based rate limiting on sensitive routes (auth & contact form).
  - Parameterized SQL queries preventing SQL injection.
- **Performance**:
  - Sub-second frontend load time powered by Vite.
  - Connection pooling with `pg.Pool` for PostgreSQL.
  - Indexed queries for featured/published items.
