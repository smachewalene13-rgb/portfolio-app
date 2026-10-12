import prisma from "../prisma.js";

// GET /api/skills
export async function listSkills(req, res, next) {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: "asc" }, { level: "desc" }],
    });
    res.json(skills);
  } catch (err) {
    next(err);
  }
}

// GET /api/skills/:id
export async function getSkill(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid skill id" });
    }

    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }
    res.json(skill);
  } catch (err) {
    next(err);
  }
}

// POST /api/skills
export async function createSkill(req, res, next) {
  try {
    const { name, category, level } = req.body;

    if (!name || !category) {
      return res
        .status(400)
        .json({ error: "Name and category are required" });
    }

    if (level != null && (level < 1 || level > 5)) {
      return res.status(400).json({ error: "Level must be between 1 and 5" });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        level: level ?? 1,
      },
    });
    res.status(201).json(skill);
  } catch (err) {
    // P2002 = unique constraint violation
    if (err.code === "P2002") {
      return res
        .status(409)
        .json({ error: `Skill "${req.body.name}" already exists` });
    }
    next(err);
  }
}

// PUT /api/skills/:id
export async function updateSkill(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid skill id" });
    }

    const skill = await prisma.skill.update({
      where: { id },
      data: req.body,
    });
    res.json(skill);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Skill not found" });
    }
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Skill name already exists" });
    }
    next(err);
  }
}

// DELETE /api/skills/:id
export async function deleteSkill(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid skill id" });
    }

    await prisma.skill.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Skill not found" });
    }
    next(err);
  }
}