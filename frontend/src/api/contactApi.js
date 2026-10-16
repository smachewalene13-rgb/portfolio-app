import { request } from "./client";

export const contactApi = {
  sendMessage: (data) =>
    request("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getMessages: () => request("/admin/messages"),
  markAsRead: (id, isRead = true) =>
    request(`/admin/messages/${id}/read`, {
      method: "PATCH",
      body: JSON.stringify({ isRead }),
    }),
  deleteMessage: (id) =>
    request(`/admin/messages/${id}`, {
      method: "DELETE",
    }),
};

export default contactApi;
