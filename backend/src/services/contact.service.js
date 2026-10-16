import { contactRepository } from "../repositories/contact.repository.js";
import emailService from "./email.service.js";
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

    const created = await contactRepository.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : null,
      message: body.trim(),
    });

    // Send instant email notification asynchronously
    emailService
      .sendContactNotification({
        name: created.name,
        email: created.email,
        subject: created.subject,
        message: created.message,
      })
      .catch((err) => console.error("Error in contact email alert:", err));

    return created;
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
