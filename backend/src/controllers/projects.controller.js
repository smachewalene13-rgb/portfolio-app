import { projectsService } from "../services/projects.service.js";

export const projectsController = {
  async getProjects(req, res, next) {
    try {
      const { featured, published } = req.query;
      const projects = await projectsService.getAllProjects({
        featuredOnly: featured === "true",
        publishedOnly: published === "true" || (req.user ? false : true),
      });
      res.json(projects);
    } catch (err) {
      next(err);
    }
  },

  async getProject(req, res, next) {
    try {
      const project = await projectsService.getProjectById(req.params.id);
      res.json(project);
    } catch (err) {
      next(err);
    }
  },

  async createProject(req, res, next) {
    try {
      const created = await projectsService.createProject(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },

  async updateProject(req, res, next) {
    try {
      const updated = await projectsService.updateProject(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async deleteProject(req, res, next) {
    try {
      const result = await projectsService.deleteProject(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
