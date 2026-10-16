import { request } from "./client";

export const profileApi = {
  getProfile: () => request("/profile"),
  updateProfile: (data) =>
    request("/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

export default profileApi;
