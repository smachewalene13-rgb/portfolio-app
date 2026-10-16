import profileApi from "./profileApi";
import projectsApi from "./projectsApi";
import skillsApi from "./skillsApi";
import experienceApi from "./experienceApi";
import contactApi from "./contactApi";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
export const TOKEN_KEY = "portfolio_token";

export async function request(path, options = {}) {
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

// Unified api object for backwards compatibility and ease of use
export const api = {
  ...profileApi,
  ...projectsApi,
  ...skillsApi,
  ...experienceApi,
  ...contactApi,
};

export default api;