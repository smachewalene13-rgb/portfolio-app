import { request } from "./client";

export const projectsApi = {
  getProjects: (params = "") => request(`/projects${params ? `?${params}` : ""}`),
  getProject: (id) => request(`/projects/${id}`),
  createProject: (data) =>
    request("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateProject: (id, data) =>
    request(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteProject: (id) =>
    request(`/projects/${id}`, {
      method: "DELETE",
    }),
};

export default projectsApi;
