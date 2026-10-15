import { educationRepository } from "../repositories/education.repository.js";
import { ApiError } from "../utils/ApiError.js";

export const educationService = {
  async getAllEducation() {
    return educationRepository.findAll();
  },

  async getEducationById(id) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid education ID");

    const edu = await educationRepository.findById(numId);
    if (!edu) throw ApiError.notFound("Education record not found");
    return edu;
  },

  async createEducation(data) {
    if (!data.institution || !data.qualification || !(data.startDate || data.start_date)) {
      throw ApiError.badRequest("Institution, qualification, and start date are required");
    }
    return educationRepository.create(data);
  },

  async updateEducation(id, data) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid education ID");

    const existing = await educationRepository.findById(numId);
    if (!existing) throw ApiError.notFound("Education record not found");

    return educationRepository.update(numId, data);
  },

  async deleteEducation(id) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid education ID");

    const deleted = await educationRepository.delete(numId);
    if (!deleted) throw ApiError.notFound("Education record not found");
    return { success: true, message: "Education record deleted successfully" };
  },
};
