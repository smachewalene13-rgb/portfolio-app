import { profileService } from "../services/profile.service.js";

export const profileController = {
  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfile();
      res.json(profile);
    } catch (err) {
      next(err);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const updated = await profileService.updateProfile(req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },
};
