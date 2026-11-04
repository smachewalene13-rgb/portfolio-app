import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../api/client";
import Loader from "../Loader";

const emptyForm = { name: "", category: "Frontend", level: 3 };
const CATEGORIES = ["Frontend", "Backend", "Tools", "Other"];

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getSkills();
      setSkills(Array.isArray(data) ? data : []);
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

  const startEdit = (skill) => {
    setEditing(skill.id);
    setForm({ name: skill.name, category: skill.category, level: skill.level });
  };

  const cancel = () => {
    setEditing(null);
    setForm(emptyForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "level" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing === "new") {
        await api.createSkill(form);
      } else {
        await api.updateSkill(editing, form);
      }
      setEditing(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      await api.deleteSkill(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loader label="Loading skills..." />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Technical Skills</h2>
          <p className="text-sm text-gray-300 font-medium">
            Manage proficiency levels and categories displayed on your About page.
          </p>
        </div>
        {editing === null && (
          <button
            type="button"
            onClick={startCreate}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-violet-600/30 transition-all hover:scale-105 cursor-pointer self-start sm:self-auto"
          >
            + Add Skill
          </button>
        )}
      </div>

      {error && (
        <p className="mb-6 p-4 rounded-2xl bg-red-500/15 border-2 border-red-400 text-red-200 text-sm font-bold shadow-md">
          {error}
        </p>
      )}

      {editing !== null && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="mb-10 p-6 sm:p-8 rounded-2xl border-2 border-violet-400 bg-[#181928] space-y-5 shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-xl font-extrabold text-white">
              {editing === "new" ? "Add New Skill" : "Edit Skill"}
            </h3>
            <span className="text-xs text-violet-300 font-bold bg-violet-500/20 px-3 py-1 rounded-full border border-violet-400/50">
              {editing === "new" ? "New Entry" : `ID: ${editing}`}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                Skill Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. TypeScript"
                className="w-full px-4 py-3 rounded-xl bg-[#13141f] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1a1c2d] focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#13141f] border-2 border-white/20 text-white text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:outline-none transition-all"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#13141f]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                Proficiency Level ({form.level}/5)
              </label>
              <div className="pt-2">
                <input
                  type="range"
                  name="level"
                  min="1"
                  max="5"
                  value={form.level}
                  onChange={handleChange}
                  className="w-full accent-violet-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={saving}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? "Saving..." : editing === "new" ? "Create Skill" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={cancel}
              className="px-6 py-3 rounded-xl border-2 border-white/20 bg-[#13141f] hover:border-white text-gray-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      {skills.length === 0 ? (
        <p className="text-gray-400 py-8 text-center font-medium">No skills yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between gap-3 p-5 rounded-2xl border-2 border-white/20 bg-[#181928] hover:border-violet-400 transition-all shadow-md"
            >
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-white text-sm sm:text-base truncate">
                  {skill.name}
                </div>
                <div className="text-xs text-violet-300 font-bold mt-0.5">
                  {skill.category} · Level {skill.level}/5
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => startEdit(skill)}
                  className="px-3 py-1.5 rounded-xl border-2 border-violet-400 bg-violet-600/20 hover:bg-violet-600 text-violet-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(skill.id)}
                  className="px-3 py-1.5 rounded-xl border-2 border-red-400 bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
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