import { request } from "./client";

export const skillsApi = {
  getSkills: () => request("/skills"),
  getSkill: (id) => request(`/skills/${id}`),
  createSkill: (data) =>
    request("/skills", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateSkill: (id, data) =>
    request(`/skills/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteSkill: (id) =>
    request(`/skills/${id}`, {
      method: "DELETE",
    }),
};

export default skillsApi;
