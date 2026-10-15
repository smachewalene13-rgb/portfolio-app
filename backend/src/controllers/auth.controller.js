import { authService } from "../services/auth.service.js";

export const authController = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async me(req, res, next) {
    try {
      res.json({
        user: req.user,
      });
    } catch (err) {
      next(err);
    }
  },

  async logout(req, res, next) {
    try {
      res.json({ success: true, message: "Logged out successfully" });
    } catch (err) {
      next(err);
    }
  },
};
