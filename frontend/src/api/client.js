const API_URL = "http://localhost:5000/api";
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
  // projects
  getProjects: () => request("/projects"),
  getProject: (id) => request(`/projects/${id}`),
  createProject: (data) =>
    request("/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id, data) =>
    request(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProject: (id) =>
    request(`/projects/${id}`, { method: "DELETE" }),

  // skills
  getSkills: () => request("/skills"),
  createSkill: (data) =>
    request("/skills", { method: "POST", body: JSON.stringify(data) }),
  updateSkill: (id, data) =>
    request(`/skills/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSkill: (id) =>
    request(`/skills/${id}`, { method: "DELETE" }),

  // messages
  getMessages: () => request("/messages"),
  sendMessage: (data) =>
    request("/messages", { method: "POST", body: JSON.stringify(data) }),
  deleteMessage: (id) =>
    request(`/messages/${id}`, { method: "DELETE" }),
};