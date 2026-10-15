import { skillsRepository } from "../repositories/skills.repository.js";
import { ApiError } from "../utils/ApiError.js";

export const skillsService = {
  async getAllSkills() {
    return skillsRepository.findAll();
  },

  async getSkillById(id) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid skill ID");

    const skill = await skillsRepository.findById(numId);
    if (!skill) throw ApiError.notFound("Skill not found");
    return skill;
  },

  async createSkill(data) {
    if (!data.name || !data.category) {
      throw ApiError.badRequest("Skill name and category are required");
    }
    const level = data.level ? Math.max(1, Math.min(5, parseInt(data.level, 10))) : 1;
    return skillsRepository.create({
      name: data.name.trim(),
      category: data.category.trim(),
      level,
      display_order: data.display_order || data.displayOrder || 0,
    });
  },

  async updateSkill(id, data) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid skill ID");

    const existing = await skillsRepository.findById(numId);
    if (!existing) throw ApiError.notFound("Skill not found");

    if (data.level !== undefined) {
      data.level = Math.max(1, Math.min(5, parseInt(data.level, 10)));
    }

    return skillsRepository.update(numId, data);
  },

  async deleteSkill(id) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid skill ID");

    const deleted = await skillsRepository.delete(numId);
    if (!deleted) throw ApiError.notFound("Skill not found");
    return { success: true, message: "Skill deleted successfully" };
  },
};
