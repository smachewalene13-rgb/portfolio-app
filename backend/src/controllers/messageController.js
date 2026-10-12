import prisma from "../prisma.js";

// POST /api/messages
export async function createMessage(req, res, next) {
  try {
    const { name, email, subject, content } = req.body;

    if (!name || !email || !content) {
      return res
        .status(400)
        .json({ error: "Name, email, and content are required" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ error: "Please enter a valid email" });
    }

    const message = await prisma.message.create({
      data: {
        name,
        email,
        subject: subject || null,
        content,
      },
    });

    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
}

// GET /api/messages
export async function listMessages(req, res, next) {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/messages/:id
export async function deleteMessage(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid message id" });
    }

    await prisma.message.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Message not found" });
    }
    next(err);
  }
}