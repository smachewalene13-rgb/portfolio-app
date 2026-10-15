-- Portfolio Application PostgreSQL Schema
-- Tables: admin_users, profile, projects, skills, experience, education, contact_messages

CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    title VARCHAR(200) NOT NULL,
    bio TEXT NOT NULL,
    about_details TEXT,
    email VARCHAR(255),
    location VARCHAR(150),
    avatar_url TEXT,
    resume_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    live_url TEXT,
    repo_url TEXT,
    tags TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    level INT DEFAULT 1 CHECK (level >= 1 AND level <= 5),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS experience (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    company VARCHAR(200) NOT NULL,
    location VARCHAR(150),
    start_date VARCHAR(50) NOT NULL,
    end_date VARCHAR(50),
    current BOOLEAN DEFAULT FALSE,
    description TEXT,
    achievements TEXT[] DEFAULT '{}',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    institution VARCHAR(200) NOT NULL,
    qualification VARCHAR(200) NOT NULL,
    field_of_study VARCHAR(200),
    start_date VARCHAR(50) NOT NULL,
    end_date VARCHAR(50),
    description TEXT,
    achievements TEXT[] DEFAULT '{}',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);
