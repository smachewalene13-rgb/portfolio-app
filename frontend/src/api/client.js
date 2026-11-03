import profileApi from "./profileApi";
import projectsApi from "./projectsApi";
import skillsApi from "./skillsApi";
import experienceApi from "./experienceApi";
import contactApi from "./contactApi";

const LIVE_BACKEND_URL = "https://portfolio-backend-mkvd.onrender.com/api/v1";

function getNormalizedApiUrl() {
  const envUrl = (import.meta.env.VITE_API_URL || "").trim();
  if (envUrl && !envUrl.includes("portfolio-app-a8yg")) {
    const clean = envUrl.replace(/\/+$/, "");
    if (!clean.endsWith("/api/v1") && !clean.endsWith("/api")) {
      return `${clean}/api/v1`;
    }
    return clean;
  }
  // In production (e.g. deployed on Vercel/Netlify), automatically connect to your live Render backend
  if (
    typeof window !== "undefined" &&
    !window.location.hostname.includes("localhost") &&
    !window.location.hostname.includes("127.0.0.1")
  ) {
    return LIVE_BACKEND_URL;
  }
  return "http://localhost:5000/api/v1";
}

export const API_URL = getNormalizedApiUrl();
export const TOKEN_KEY = "portfolio_token";

export async function request(path, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);

  let targetUrl = `${API_URL}${path}`;

  let res;
  try {
    res = await fetch(targetUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...options,
    });
  } catch (netErr) {
    throw new Error(
      "Unable to connect to the backend server. If using Render free tier, the server may be waking up (please wait ~30 seconds and refresh)."
    );
  }

  // If response is not ok and not already using LIVE_BACKEND_URL, try LIVE_BACKEND_URL failover
  if (!res.ok && API_URL !== LIVE_BACKEND_URL) {
    try {
      const failoverRes = await fetch(`${LIVE_BACKEND_URL}${path}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...options,
      });
      if (failoverRes.ok) {
        if (failoverRes.status === 204) return null;
        return failoverRes.json();
      }
    } catch {
      // ignore failover error and proceed to normal error reporting
    }
  }

  // If 404 and API_URL ends with /api/v1, try fallback without /v1 or direct path
  if (res.status === 404 && API_URL.includes("/api/v1")) {
    const fallbackBase = API_URL.replace(/\/api\/v1$/, "");
    const fallbackUrl = `${fallbackBase}${path}`;
    try {
      const fallbackRes = await fetch(fallbackUrl, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...options,
      });
      if (fallbackRes.ok) {
        if (fallbackRes.status === 204) return null;
        return fallbackRes.json();
      }
    } catch {
      // ignore fallback error and continue to main error reporting
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const msg =
      errorData.error ||
      errorData.message ||
      (res.status === 404
        ? "API endpoint not found. Please verify the backend URL is deployed and configured correctly."
        : `Server responded with HTTP ${res.status}`);
    throw new Error(msg);
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