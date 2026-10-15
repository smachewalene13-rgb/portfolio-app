import { contactRepository } from "../repositories/contact.repository.js";
import { ApiError } from "../utils/ApiError.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactService = {
  async getAllMessages() {
    return contactRepository.findAll();
  },

  async getMessageById(id) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid message ID");

    const msg = await contactRepository.findById(numId);
    if (!msg) throw ApiError.notFound("Message not found");
    return msg;
  },

  async submitMessage(data) {
    const { name, email, subject, message, content } = data;
    const body = message || content;

    if (!name || !name.trim()) throw ApiError.badRequest("Name is required");
    if (!email || !EMAIL_REGEX.test(email.trim())) {
      throw ApiError.badRequest("A valid email address is required");
    }
    if (!body || !body.trim()) throw ApiError.badRequest("Message content is required");

    return contactRepository.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : null,
      message: body.trim(),
    });
  },

  async markAsRead(id, isRead = true) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid message ID");

    const existing = await contactRepository.findById(numId);
    if (!existing) throw ApiError.notFound("Message not found");

    return contactRepository.markAsRead(numId, isRead);
  },

  async deleteMessage(id) {
    const numId = parseInt(id, 10);
    if (isNaN(numId)) throw ApiError.badRequest("Invalid message ID");

    const deleted = await contactRepository.delete(numId);
    if (!deleted) throw ApiError.notFound("Message not found");
    return { success: true, message: "Message deleted successfully" };
  },
};
