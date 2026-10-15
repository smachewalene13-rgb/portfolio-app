# PostgreSQL Database Design

## Database Name: `portfolio_db`

The database schema consists of 7 primary tables designed for relational integrity, performance, and clear domain separation.

### Schema Entity Relationship Diagram

```
admin_users
  ├── id (SERIAL, PK)
  ├── email (VARCHAR, UNIQUE)
  ├── password_hash (VARCHAR)
  └── name (VARCHAR)

profile
  ├── id (SERIAL, PK)
  ├── name (VARCHAR)
  ├── title (VARCHAR)
  ├── bio (TEXT)
  ├── about_details (TEXT)
  ├── email (VARCHAR)
  ├── location (VARCHAR)
  ├── avatar_url (TEXT)
  ├── resume_url (TEXT)
  ├── github_url (TEXT)
  └── linkedin_url (TEXT)

projects
  ├── id (SERIAL, PK)
  ├── title (VARCHAR)
  ├── description (TEXT)
  ├── image_url (TEXT)
  ├── live_url (TEXT)
  ├── repo_url (TEXT)
  ├── tags (TEXT[])
  ├── featured (BOOLEAN)
  └── published (BOOLEAN)

skills
  ├── id (SERIAL, PK)
  ├── name (VARCHAR, UNIQUE)
  ├── category (VARCHAR)
  └── level (INT, 1-5)

experience
  ├── id (SERIAL, PK)
  ├── title (VARCHAR)
  ├── company (VARCHAR)
  ├── location (VARCHAR)
  ├── start_date (VARCHAR)
  ├── end_date (VARCHAR)
  ├── current (BOOLEAN)
  ├── description (TEXT)
  └── achievements (TEXT[])

education
  ├── id (SERIAL, PK)
  ├── institution (VARCHAR)
  ├── qualification (VARCHAR)
  ├── field_of_study (VARCHAR)
  ├── start_date (VARCHAR)
  └── end_date (VARCHAR)

contact_messages
  ├── id (SERIAL, PK)
  ├── name (VARCHAR)
  ├── email (VARCHAR)
  ├── subject (VARCHAR)
  ├── message (TEXT)
  ├── is_read (BOOLEAN)
  └── created_at (TIMESTAMP)
```

### Performance Indexes
- `idx_projects_featured` on `projects(featured)`
- `idx_projects_published` on `projects(published)`
- `idx_skills_category` on `skills(category)`
- `idx_contact_messages_is_read` on `contact_messages(is_read)`
