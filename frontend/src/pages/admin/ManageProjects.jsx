import { useEffect, useState } from "react";
import projectsApi from "../../api/projectsApi";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";

const emptyForm = {
  title: "",
  description: "",
  imageUrl: "",
  liveUrl: "",
  repoUrl: "",
  tags: "",
  featured: false,
  published: true,
};

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await projectsApi.getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const startCreate = () => {
    setEditing("new");
    setForm(emptyForm);
  };

  const startEdit = (p) => {
    setEditing(p.id);
    setForm({
      title: p.title,
      description: p.description,
      imageUrl: p.imageUrl ?? p.image_url ?? "",
      liveUrl: p.liveUrl ?? p.live_url ?? "",
      repoUrl: p.repoUrl ?? p.repo_url ?? "",
      tags: (p.tags ?? []).join(", "),
      featured: p.featured ?? false,
      published: p.published ?? true,
    });
  };

  const cancel = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        imageUrl: form.imageUrl || null,
        liveUrl: form.liveUrl || null,
        repoUrl: form.repoUrl || null,
      };

      if (editing === "new") {
        await projectsApi.createProject(payload);
      } else {
        await projectsApi.updateProject(editing, payload);
      }

      setEditing(null);
      await loadProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await projectsApi.deleteProject(id);
      await loadProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loader label="Loading projects..." />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Manage Projects</h2>
          <p className="text-sm text-gray-400">Add, edit, or remove showcase projects.</p>
        </div>
        {editing === null && (
          <Button onClick={startCreate}>+ Add Project</Button>
        )}
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {editing !== null && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 p-6 rounded-xl border border-white/10 bg-white/[0.02] space-y-4"
        >
          <h3 className="text-lg font-medium mb-4">
            {editing === "new" ? "Create New Project" : "Edit Project"}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-medium text-gray-400 mb-1">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-medium text-gray-400 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                placeholder="React, Node.js, PostgreSQL"
                value={form.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none resize-none"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase font-medium text-gray-400 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                placeholder="/hero.jpg"
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-medium text-gray-400 mb-1">
                Live Demo URL
              </label>
              <input
                type="url"
                name="liveUrl"
                placeholder="https://example.com"
                value={form.liveUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-medium text-gray-400 mb-1">
                GitHub Repo URL
              </label>
              <input
                type="url"
                name="repoUrl"
                placeholder="https://github.com/..."
                value={form.repoUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="rounded border-white/20 text-violet-500 focus:ring-violet-500"
              />
              Featured Project
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="rounded border-white/20 text-violet-500 focus:ring-violet-500"
              />
              Published
            </label>
          </div>

          <div className="flex gap-3 pt-3">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : editing === "new" ? "Create Project" : "Update Project"}
            </Button>
            <Button variant="outline" onClick={cancel}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          projects.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-white">{p.title}</h4>
                  {p.featured && (
                    <span className="text-[10px] uppercase tracking-wider bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/30">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 truncate max-w-xl">
                  {p.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" className="py-1 px-3 text-xs" onClick={() => startEdit(p)}>
                  Edit
                </Button>
                <Button variant="danger" className="py-1 px-3 text-xs" onClick={() => handleDelete(p.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
