import { experienceRepository } from "../repositories/experience.repository.js";
import { ApiError } from "../utils/ApiError.js";

export const experienceService = {
  async getAllExperience() {
    return experienceRepository.findAll();
  },

  async getExperienceById(id) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid experience ID");

    const exp = await experienceRepository.findById(numId);
    if (!exp) throw ApiError.notFound("Experience record not found");
    return exp;
  },

  async createExperience(data) {
    if (!data.title || !data.company || !(data.startDate || data.start_date)) {
      throw ApiError.badRequest("Title, company, and start date are required");
    }
    return experienceRepository.create(data);
  },

  async updateExperience(id, data) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid experience ID");

    const existing = await experienceRepository.findById(numId);
    if (!existing) throw ApiError.notFound("Experience record not found");

    return experienceRepository.update(numId, data);
  },

  async deleteExperience(id) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid experience ID");

    const deleted = await experienceRepository.delete(numId);
    if (!deleted) throw ApiError.notFound("Experience record not found");
    return { success: true, message: "Experience record deleted successfully" };
  },
};
