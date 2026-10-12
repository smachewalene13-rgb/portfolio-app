import prisma from "../prisma.js";

// GET /api/projects
export async function listProjects(req, res, next) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

// GET /api/projects/:id
export async function getProject(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid project id" });
    }

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
}

// POST /api/projects
export async function createProject(req, res, next) {
  try {
    const {
      title,
      description,
      imageUrl,
      liveUrl,
      repoUrl,
      tags,
      featured,
    } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl: imageUrl ?? null,
        liveUrl: liveUrl ?? null,
        repoUrl: repoUrl ?? null,
        tags: tags ?? [],
        featured: featured ?? false,
      },
    });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

// PUT /api/projects/:id
export async function updateProject(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid project id" });
    }

    const project = await prisma.project.update({
      where: { id },
      data: req.body,
    });
    res.json(project);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Project not found" });
    }
    next(err);
  }
}

// DELETE /api/projects/:id
export async function deleteProject(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid project id" });
    }

    await prisma.project.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Project not found" });
    }
    next(err);
  }
}