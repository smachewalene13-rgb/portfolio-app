# Full-Stack Portfolio Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database instance (local or hosted like Neon Tech)

## Quick Start

### 1. Database Setup & Seeding
From the `backend` folder:
```powershell
cd backend
npm install
npm run migrate
npm run seed
```

Default administrator credentials:
- **Email**: `smachewalene13@gmail.com`
- **Password**: `admin1234`

### 2. Backend Server
```powershell
npm run dev
```
The Express server runs at `http://localhost:5000`.

### 3. Frontend Client
In a separate terminal:
```powershell
cd frontend
npm install
npm run dev
```
The React Vite app runs at `http://localhost:5173`.

### 4. Admin Dashboard
Navigate to `http://localhost:5173/login`, log in with your credentials, and access `http://localhost:5173/admin` to manage your portfolio content in real-time.
