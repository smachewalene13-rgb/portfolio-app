import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../api/client";
import Loader from "../Loader";

const emptyForm = {
  title: "",
  description: "",
  imageUrl: "",
  liveUrl: "",
  repoUrl: "",
  tags: "",
  featured: false,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null); // null = not editing, "new" = creating
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startCreate = () => {
    setEditing("new");
    setForm(emptyForm);
  };

  const startEdit = (project) => {
    setEditing(project.id);
    setForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl ?? "",
      liveUrl: project.liveUrl ?? "",
      repoUrl: project.repoUrl ?? "",
      tags: (project.tags ?? []).join(", "),
      featured: project.featured,
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
        await api.createProject(payload);
      } else {
        await api.updateProject(editing, payload);
      }

      cancel();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await api.deleteProject(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loader label="Loading projects..." />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Projects <span className="text-gray-500">({projects.length})</span>
        </h2>
        <button
          onClick={startCreate}
          className="px-4 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium transition-colors"
        >
          + New Project
        </button>
      </div>

      {error && (
        <p className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </p>
      )}

      {/* Form */}
      {editing !== null && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="mb-8 p-6 rounded-xl border border-violet-500/30 bg-violet-500/[0.03] space-y-4"
        >
          <h3 className="text-lg font-semibold mb-2">
            {editing === "new" ? "New Project" : "Edit Project"}
          </h3>

          <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
          <Textarea label="Description" name="description" value={form.description} onChange={handleChange} required rows={3} />

          <div className="grid md:grid-cols-3 gap-4">
            <Input label="Image URL" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
            <Input label="Live URL" name="liveUrl" value={form.liveUrl} onChange={handleChange} />
            <Input label="Repo URL" name="repoUrl" value={form.repoUrl} onChange={handleChange} />
          </div>

          <Input
            label="Tags (comma-separated)"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="React, Node.js, PostgreSQL"
          />

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="w-4 h-4 accent-violet-500"
            />
            Featured on homepage
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 disabled:opacity-50 text-white text-sm font-medium transition-colors"
            >
              {saving ? "Saving..." : editing === "new" ? "Create" : "Update"}
            </button>
            <button
              type="button"
              onClick={cancel}
              className="px-5 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      {/* List */}
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects yet.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-start justify-between gap-4 p-4 rounded-lg border border-white/10 bg-white/[0.02]"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium truncate">{project.title}</h3>
                  {project.featured && (
                    <span className="text-[10px] uppercase tracking-wider bg-violet-500 text-white px-1.5 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
                {project.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(project)}
                  className="px-3 py-1.5 rounded-lg text-xs border border-white/10 hover:bg-white/5 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-1.5 rounded-lg text-xs border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", required, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5 text-gray-400">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 text-sm transition-colors"
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange, rows = 3, required }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5 text-gray-400">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 text-sm transition-colors resize-none"
      />
    </div>
  );
}