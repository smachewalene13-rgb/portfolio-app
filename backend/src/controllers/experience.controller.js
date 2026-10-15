import { experienceService } from "../services/experience.service.js";

export const experienceController = {
  async getExperience(req, res, next) {
    try {
      const exp = await experienceService.getAllExperience();
      res.json(exp);
    } catch (err) {
      next(err);
    }
  },

  async getExperienceById(req, res, next) {
    try {
      const exp = await experienceService.getExperienceById(req.params.id);
      res.json(exp);
    } catch (err) {
      next(err);
    }
  },

  async createExperience(req, res, next) {
    try {
      const created = await experienceService.createExperience(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },

  async updateExperience(req, res, next) {
    try {
      const updated = await experienceService.updateExperience(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async deleteExperience(req, res, next) {
    try {
      const result = await experienceService.deleteExperience(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
