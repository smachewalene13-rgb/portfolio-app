import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";

const JWT_SECRET = process.env.JWT_SECRET || "change-this-to-a-long-random-string-in-production-abc123xyz789";

export const authService = {
  async login(email, password) {
    if (!email || !password) {
      throw ApiError.badRequest("Email and password are required");
    }

    const user = await userRepository.findByEmail(email.toLowerCase().trim());
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
