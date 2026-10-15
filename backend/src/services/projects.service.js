import { projectsRepository } from "../repositories/projects.repository.js";
import { ApiError } from "../utils/ApiError.js";

export const projectsService = {
  async getAllProjects(filters) {
    return projectsRepository.findAll(filters);
  },

  async getProjectById(id) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid project ID");

    const project = await projectsRepository.findById(numId);
    if (!project) throw ApiError.notFound("Project not found");
    return project;
  },

  async createProject(data) {
    if (!data.title || !data.description) {
      throw ApiError.badRequest("Title and description are required for a project");
    }
    return projectsRepository.create(data);
  },

  async updateProject(id, data) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid project ID");

    const existing = await projectsRepository.findById(numId);
    if (!existing) throw ApiError.notFound("Project not found");

    return projectsRepository.update(numId, data);
  },

  async deleteProject(id) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid project ID");

    const deleted = await projectsRepository.delete(numId);
    if (!deleted) throw ApiError.notFound("Project not found");
    return { success: true, message: "Project deleted successfully" };
  },
};
