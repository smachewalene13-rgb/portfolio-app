import bcrypt from "bcryptjs";
import pool from "../../config/database.js";

export async function runSeeds() {
  console.log("🌱 Seeding database...");
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Admin User
    const adminEmail = "smachewalene13@gmail.com";
    const userRes = await client.query("SELECT id FROM admin_users WHERE email = $1", [adminEmail]);
    if (userRes.rows.length === 0) {
      const passwordHash = await bcrypt.hash("admin1234", 10);
      await client.query(
        "INSERT INTO admin_users (email, password_hash, name) VALUES ($1, $2, $3)",
        [adminEmail, passwordHash, "Simachew Alene"]
      );
      console.log("  ✓ Admin user created (smachewalene13@gmail.com / admin1234)");
    } else {
      console.log("  ℹ Admin user already exists");
    }

    // 2. Profile
    const profileRes = await client.query("SELECT id FROM profile LIMIT 1");
    if (profileRes.rows.length === 0) {
      await client.query(`
        INSERT INTO profile (
          name, title, bio, about_details, email, location, avatar_url, resume_url, github_url, linkedin_url
        ) VALUES (
          'Simachew Alene',
          'Full-Stack Developer',
          'Building modern web experiences with React & Node.js. I design and develop fast, accessible, and beautiful applications that solve real problems.',
          'Hi, I am Simachew Alene — a full-stack developer passionate about building delightful web applications. I specialize in React, Node.js, and PostgreSQL, and I care deeply about clean code, accessibility, and performance.',
          'smachewalene13@gmail.com',
          'Addis Ababa, Ethiopia',
          '/hero.jpg',
          '/resume.pdf',
          'https://github.com',
          'https://linkedin.com'
        )
      `);
      console.log("  ✓ Default profile created");
    }

    // 3. Skills
    const skillsCount = await client.query("SELECT COUNT(*) FROM skills");
    if (parseInt(skillsCount.rows[0].count, 10) === 0) {
      const defaultSkills = [
        // Frontend
        { name: "React.js", category: "Frontend", level: 5, display_order: 1 },
        { name: "JavaScript (ES6+)", category: "Frontend", level: 5, display_order: 2 },
        { name: "Tailwind CSS", category: "Frontend", level: 4, display_order: 3 },
        { name: "HTML5 & CSS3", category: "Frontend", level: 5, display_order: 4 },
        { name: "TypeScript", category: "Frontend", level: 4, display_order: 5 },
        // Backend
        { name: "Node.js", category: "Backend", level: 5, display_order: 1 },
        { name: "Express.js", category: "Backend", level: 5, display_order: 2 },
        { name: "REST APIs", category: "Backend", level: 5, display_order: 3 },
        { name: "JWT Auth", category: "Backend", level: 4, display_order: 4 },
        // Database
        { name: "PostgreSQL", category: "Database", level: 4, display_order: 1 },
        { name: "SQL", category: "Database", level: 4, display_order: 2 },
        { name: "Prisma ORM", category: "Database", level: 4, display_order: 3 },
        // Tools & DevOps
        { name: "Git & GitHub", category: "Tools & DevOps", level: 5, display_order: 1 },
        { name: "Docker", category: "Tools & DevOps", level: 3, display_order: 2 },
        { name: "Vite", category: "Tools & DevOps", level: 5, display_order: 3 },
      ];

      for (const s of defaultSkills) {
        await client.query(
          "INSERT INTO skills (name, category, level, display_order) VALUES ($1, $2, $3, $4) ON CONFLICT (name) DO NOTHING",
          [s.name, s.category, s.level, s.display_order]
        );
      }
      console.log("  ✓ Default skills created");
    }

    // 4. Projects
    const projectsCount = await client.query("SELECT COUNT(*) FROM projects");
    if (parseInt(projectsCount.rows[0].count, 10) === 0) {
      const defaultProjects = [
        {
          title: "Road Accident Tracking System",
          description:
            "A road safety information management application designed to record, manage, and analyze road traffic accident data.",
          image_url:
            "https://images.openai.com/static-rsc-4/ktt-gA2CUcBVXyfMr1WS5OxxTYmSQl10QQ86Pxs8NNYvhN2JvTjlNmEEYtbzwq_2wBtCgIKP4-lnnQ3jb_60gVn_1DVi7bE-EKhF-XXAOuG70GOQ7Tm83qIGYBA9m6etvpXAg5vK4CkHtUgwgSajcOzbAKJOxMkM67hbwWQafoZkB4tIGHSDlUxRjyLro3mj?purpose=fullsize",
          live_url: "https://road-acident-tracking-frontend.vercel.app/",
          repo_url: "https://github.com/smachewalene13-rgb/road-acident-tracking",
          tags: ["python", "js", "html", "sql lite database"],
          featured: true,
          published: true,
          display_order: 1,
        },
        {
          title: "Hospital Management System",
          description:
            "A web-based healthcare management application designed to streamline hospital operations by organizing patient information, appointment scheduling, staff management, and administrative workflows.",
          image_url:
            "https://images.openai.com/static-rsc-4/ADnLtYa7e8qBegTBcmZtX_AvZOrnaVi-yfZ985-8H9ccNhC0MT7aMd3e7kAwislwnmLdR_8HsGhRusX8fYDfYGpvwFq9Imw0G3mJKUgv34AKuh2icklObvJ-3fh1fCkZXpRH3CuC4DhUjzSe5eR6ORPwN8jPA0RPc-xxKX0G3MASxJWjLL9swGQBqbmvqkKh?purpose=fullsize",
          live_url: "https://hospital-management-system-frontend-six-sandy.vercel.app/",
          repo_url: "https://github.com/smachewalene13-rgb/hospital managment system",
          tags: ["python", "js", "html", "sql lite database"],
          featured: true,
          published: true,
          display_order: 2,
        },
        {
          title: "Sami Cafe",
          description:
            "A modern cafe and restaurant web application designed to showcase menu offerings, streamline online ordering, and facilitate customer reservations.",
          image_url:
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
          live_url: "https://sami-cafe-restaurant.vercel.app/",
          repo_url: "https://github.com/smachewalene13-rgb/sami-cafe-restaurant",
          tags: ["react", "node.js", "tailwind css", "javascript"],
          featured: true,
          published: true,
          display_order: 3,
        },
        {
          title: "Hotel Booking System",
          description:
            "A web-based hotel reservation platform designed for exploring room accommodations, managing bookings, and processing guest stays seamlessly.",
          image_url:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
          live_url: "https://hotel-booking-nf3sk9c0k-sami-b153.vercel.app/",
          repo_url: "https://github.com/smachewalene13-rgb",
          tags: ["react", "node.js", "tailwind css", "postgresql"],
          featured: true,
          published: true,
          display_order: 4,
        },
      ];

      for (const p of defaultProjects) {
        await client.query(
          `INSERT INTO projects (title, description, image_url, live_url, repo_url, tags, featured, published, display_order)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [p.title, p.description, p.image_url, p.live_url, p.repo_url, p.tags, p.featured, p.published, p.display_order]
        );
      }
      console.log("  ✓ Default projects created");
    }

    // 5. Experience
    const expCount = await client.query("SELECT COUNT(*) FROM experience");
    if (parseInt(expCount.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO experience (title, company, location, start_date, end_date, current, description, achievements, display_order)
        VALUES 
        ('Full-Stack Software Engineer', 'Tech Solutions', 'Remote', '2024', 'Present', TRUE, 
         'Architecting and implementing scalable web applications using React, Node.js, and PostgreSQL.',
         ARRAY['Built scalable REST APIs serving thousands of daily active users.', 'Improved frontend load speed by 35% with Vite and asset optimization.'], 1),
        ('Frontend Developer', 'Digital Studio', 'Hybrid', '2022', '2024', FALSE,
         'Developed interactive UI components and responsive web applications for enterprise clients.',
         ARRAY['Engineered 10+ high-traffic web applications with modern React.', 'Standardized reusable component library reducing turnaround time.'], 2)
      `);
      console.log("  ✓ Default experience created");
    }

    // 6. Education
    const eduCount = await client.query("SELECT COUNT(*) FROM education");
    if (parseInt(eduCount.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO education (institution, qualification, field_of_study, start_date, end_date, description, display_order)
        VALUES 
        ('University', 'Bachelor of Science', 'Computer Science & Software Engineering', '2019', '2023',
         'Graduated with honors. Focused on algorithms, database management systems, and web architectures.', 1)
      `);
      console.log("  ✓ Default education created");
    }

    await client.query("COMMIT");
    console.log("✅ Database seeding complete!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ Seeding failed:", error);
    throw error;
  } finally {
    client.release();
  }
}

import { fileURLToPath } from "url";
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runSeeds()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
