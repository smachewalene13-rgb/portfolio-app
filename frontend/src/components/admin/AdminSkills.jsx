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
      setSkills(data);
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
      cancel();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this skill?")) return;
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Skills <span className="text-gray-500">({skills.length})</span>
        </h2>
        <button
          onClick={startCreate}
          className="px-4 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium transition-colors"
        >
          + New Skill
        </button>
      </div>

      {error && (
        <p className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </p>
      )}

      {editing !== null && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="mb-8 p-6 rounded-xl border border-violet-500/30 bg-violet-500/[0.03] space-y-4"
        >
          <h3 className="text-lg font-semibold mb-2">
            {editing === "new" ? "New Skill" : "Edit Skill"}
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5 text-gray-400">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-gray-400">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#0a0a0f]">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-gray-400">
                Level ({form.level}/5)
              </label>
              <input
                type="range"
                name="level"
                min="1"
                max="5"
                value={form.level}
                onChange={handleChange}
                className="w-full accent-violet-500"
              />
            </div>
          </div>

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

      {skills.length === 0 ? (
        <p className="text-gray-500">No skills yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between gap-3 p-4 rounded-lg border border-white/10 bg-white/[0.02]"
            >
              <div className="min-w-0 flex-1">
                <div className="font-medium text-sm truncate">{skill.name}</div>
                <div className="text-xs text-gray-500">
                  {skill.category} · {skill.level}/5
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={() => startEdit(skill)}
                  className="px-2.5 py-1 rounded text-xs border border-white/10 hover:bg-white/5 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="px-2.5 py-1 rounded text-xs border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}