import { educationService } from "../services/education.service.js";

export const educationController = {
  async getEducation(req, res, next) {
    try {
      const edu = await educationService.getAllEducation();
      res.json(edu);
    } catch (err) {
      next(err);
    }
  },

  async getEducationById(req, res, next) {
    try {
      const edu = await educationService.getEducationById(req.params.id);
      res.json(edu);
    } catch (err) {
      next(err);
    }
  },

  async createEducation(req, res, next) {
    try {
      const created = await educationService.createEducation(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },

  async updateEducation(req, res, next) {
    try {
      const updated = await educationService.updateEducation(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async deleteEducation(req, res, next) {
    try {
      const result = await educationService.deleteEducation(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
