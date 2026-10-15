import { skillsService } from "../services/skills.service.js";

export const skillsController = {
  async getSkills(req, res, next) {
    try {
      const skills = await skillsService.getAllSkills();
      res.json(skills);
    } catch (err) {
      next(err);
    }
  },

  async getSkill(req, res, next) {
    try {
      const skill = await skillsService.getSkillById(req.params.id);
      res.json(skill);
    } catch (err) {
      next(err);
    }
  },

  async createSkill(req, res, next) {
    try {
      const created = await skillsService.createSkill(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },

  async updateSkill(req, res, next) {
    try {
      const updated = await skillsService.updateSkill(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async deleteSkill(req, res, next) {
    try {
      const result = await skillsService.deleteSkill(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
