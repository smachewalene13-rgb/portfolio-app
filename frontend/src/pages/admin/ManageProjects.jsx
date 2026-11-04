import { useEffect, useState } from "react";
import projectsApi from "../../api/projectsApi";
import Loader from "../../components/common/Loader";
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

  if (loading) return <Loader label="Loading projects catalog..." />;

  return (
    <div>
      {/* Header with Title and Add Project Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Manage Projects</h2>
          <p className="text-sm text-gray-300 font-medium">
            Add, update, or remove showcase applications from your portfolio.
          </p>
        </div>
        {editing === null && (
          <button
            type="button"
            onClick={startCreate}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-violet-600/30 transition-all hover:scale-105 cursor-pointer self-start sm:self-auto"
          >
            + Add Project
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Project Form for Create or Edit with High Visibility */}
      {editing !== null && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 p-6 sm:p-8 rounded-2xl border-2 border-violet-500/60 bg-[#181928] space-y-5 shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-xl font-extrabold text-white">
              {editing === "new" ? "Create New Project" : "Edit Project Details"}
            </h3>
            <span className="text-xs text-violet-300 font-bold bg-violet-500/20 px-3 py-1 rounded-full border border-violet-400/50">
              {editing === "new" ? "New Entry" : `ID: ${editing}`}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Health Tracking Platform"
                className="w-full px-4 py-3 rounded-xl bg-[#13141f] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1a1c2d] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                placeholder="React, Node.js, PostgreSQL"
                value={form.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#13141f] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1a1c2d] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
              Description *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the application, architecture, and problem solved..."
              className="w-full px-4 py-3 rounded-xl bg-[#13141f] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1a1c2d] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all resize-none"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                placeholder="/hero.jpg or https://..."
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#13141f] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                Live Demo URL
              </label>
              <input
                type="url"
                name="liveUrl"
                placeholder="https://example.vercel.app/"
                value={form.liveUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#13141f] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                GitHub Repo URL
              </label>
              <input
                type="url"
                name="repoUrl"
                placeholder="https://github.com/..."
                value={form.repoUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#13141f] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            <label className="flex items-center gap-2.5 text-sm font-bold text-gray-200 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-white/20 bg-[#13141f] text-violet-600 focus:ring-violet-500 cursor-pointer"
              />
              Featured Project (Shows on Homepage)
            </label>

            <label className="flex items-center gap-2.5 text-sm font-bold text-gray-200 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="w-4 h-4 rounded border-white/20 bg-[#13141f] text-violet-600 focus:ring-violet-500 cursor-pointer"
              />
              Published (Visible on Portfolio)
            </label>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={saving}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? "Saving..." : editing === "new" ? "Create Project" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={cancel}
              className="px-6 py-3 rounded-xl border-2 border-white/20 bg-[#13141f] hover:border-white text-gray-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Projects List Rows with High Contrast */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <p className="text-gray-400 py-8 text-center font-medium">No projects found.</p>
        ) : (
          projects.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl border-2 border-white/20 bg-[#181928] hover:border-violet-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-black/40"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <h4 className="font-extrabold text-white text-base sm:text-lg">{p.title}</h4>
                  {p.featured && (
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-violet-600/30 text-violet-200 px-3 py-0.5 rounded-full border border-violet-400/60 shadow-sm">
                      Featured
                    </span>
                  )}
                  {p.published === false && (
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-300 px-3 py-0.5 rounded-full border border-amber-400/40">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 leading-relaxed font-normal">
                  {p.description}
                </p>
                {p.live_url || p.liveUrl ? (
                  <a
                    href={p.live_url || p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-violet-300 hover:text-violet-200 hover:underline font-bold mt-2 inline-block break-all"
                  >
                    {p.live_url || p.liveUrl}
                  </a>
                ) : null}
              </div>

              <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto pt-2 sm:pt-0">
                <button
                  type="button"
                  onClick={() => startEdit(p)}
                  className="px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600 text-violet-200 hover:text-white border-2 border-violet-500/40 hover:border-violet-400 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white border-2 border-red-500/40 hover:border-red-400 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
