import { contactService } from "../services/contact.service.js";

export const contactController = {
  async submitMessage(req, res, next) {
    try {
      const created = await contactService.submitMessage(req.body);
      res.status(201).json({
        success: true,
        message: "Your message has been sent successfully!",
        data: created,
      });
    } catch (err) {
      next(err);
    }
  },

  async getMessages(req, res, next) {
    try {
      const messages = await contactService.getAllMessages();
      res.json(messages);
    } catch (err) {
      next(err);
    }
  },

  async getMessage(req, res, next) {
    try {
      const message = await contactService.getMessageById(req.params.id);
      res.json(message);
    } catch (err) {
      next(err);
    }
  },

  async markAsRead(req, res, next) {
    try {
      const isRead = req.body.isRead !== undefined ? req.body.isRead : true;
      const updated = await contactService.markAsRead(req.params.id, isRead);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async deleteMessage(req, res, next) {
    try {
      const result = await contactService.deleteMessage(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
