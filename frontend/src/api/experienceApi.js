import { request } from "./client";

export const experienceApi = {
  getExperience: () => request("/experience"),
  getExperienceById: (id) => request(`/experience/${id}`),
  createExperience: (data) =>
    request("/experience", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateExperience: (id, data) =>
    request(`/experience/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteExperience: (id) =>
    request(`/experience/${id}`, {
      method: "DELETE",
    }),
  getEducation: () => request("/education"),
  createEducation: (data) =>
    request("/education", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export default experienceApi;
