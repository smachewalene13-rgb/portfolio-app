const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const TOKEN_KEY = "portfolio_token";

async function request(path, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // profile
  getProfile: () => request("/profile"),
  updateProfile: (data) =>
    request("/profile", { method: "PUT", body: JSON.stringify(data) }),

  // projects
  getProjects: (params = "") => request(`/projects${params ? `?${params}` : ""}`),
  getProject: (id) => request(`/projects/${id}`),
  createProject: (data) =>
    request("/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id, data) =>
    request(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProject: (id) =>
    request(`/projects/${id}`, { method: "DELETE" }),

  // skills
  getSkills: () => request("/skills"),
  getSkill: (id) => request(`/skills/${id}`),
  createSkill: (data) =>
    request("/skills", { method: "POST", body: JSON.stringify(data) }),
  updateSkill: (id, data) =>
    request(`/skills/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSkill: (id) =>
    request(`/skills/${id}`, { method: "DELETE" }),

  // experience
  getExperience: () => request("/experience"),
  createExperience: (data) =>
    request("/experience", { method: "POST", body: JSON.stringify(data) }),
  updateExperience: (id, data) =>
    request(`/experience/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteExperience: (id) =>
    request(`/experience/${id}`, { method: "DELETE" }),

  // education
  getEducation: () => request("/education"),
  createEducation: (data) =>
    request("/education", { method: "POST", body: JSON.stringify(data) }),
  updateEducation: (id, data) =>
    request(`/education/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteEducation: (id) =>
    request(`/education/${id}`, { method: "DELETE" }),

  // messages / contact
  getMessages: () => request("/admin/messages"),
  sendMessage: (data) =>
    request("/contact", { method: "POST", body: JSON.stringify(data) }),
  markMessageRead: (id, isRead = true) =>
    request(`/admin/messages/${id}/read`, {
      method: "PATCH",
      body: JSON.stringify({ isRead }),
    }),
  deleteMessage: (id) =>
    request(`/admin/messages/${id}`, { method: "DELETE" }),
};