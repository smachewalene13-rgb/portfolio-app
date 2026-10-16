import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/database.js";
import { userRepository } from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";

const JWT_SECRET = process.env.JWT_SECRET || "change-this-to-a-long-random-string-in-production-abc123xyz789";

export const authService = {
  async login(email, password) {
    if (!email || !password) {
      throw ApiError.badRequest("Email and password are required");
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = await userRepository.findByEmail(cleanEmail);

    // Self-healing migration: if user is logging in with smachewalene13@gmail.com
    // but the DB still has admin@example.com, migrate on-the-fly!
    if (!user) {
      if (cleanEmail === "smachewalene13@gmail.com") {
        const legacyAdmin = await userRepository.findByEmail("admin@example.com");
        if (legacyAdmin && (await bcrypt.compare(password, legacyAdmin.password_hash))) {
          await pool.query(
            "UPDATE admin_users SET email = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
            [cleanEmail, legacyAdmin.id]
          );
          await pool.query(
            "UPDATE profile SET email = $1 WHERE id = (SELECT id FROM profile LIMIT 1)",
            [cleanEmail]
          );
          user = await userRepository.findByEmail(cleanEmail);
        }
      }

      // If database has 0 admin users, auto-seed the admin user
      if (!user) {
        const countRes = await pool.query("SELECT COUNT(*) FROM admin_users");
        if (parseInt(countRes.rows[0].count, 10) === 0 && password === "admin1234") {
          const hash = await bcrypt.hash("admin1234", 10);
          user = await userRepository.create({
            email: cleanEmail,
            passwordHash: hash,
            name: "Simachew Alene",
          });
        }
      }
    }

    if (!user) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  },

  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await userRepository.findById(decoded.id);
      if (!user) throw ApiError.unauthorized("User no longer exists");
      return user;
    } catch (err) {
      throw ApiError.unauthorized("Invalid or expired token");
    }
  },
};
