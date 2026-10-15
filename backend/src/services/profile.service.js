import { profileRepository } from "../repositories/profile.repository.js";
import { ApiError } from "../utils/ApiError.js";

export const profileService = {
  async getProfile() {
    const profile = await profileRepository.getProfile();
    if (!profile) {
      throw ApiError.notFound("Profile has not been initialized");
    }
    return profile;
  },

  async updateProfile(data) {
    if (!data || Object.keys(data).length === 0) {
      throw ApiError.badRequest("No profile data provided for update");
    }
    return profileRepository.updateProfile(data);
  },
};
