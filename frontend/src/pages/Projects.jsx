import { useState } from "react";
import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { useAuth } from "../context/AuthContext";
import projectsApi from "../api/projectsApi";
import ProjectGrid from "../components/projects/ProjectGrid";
import ProjectFilter from "../components/projects/ProjectFilter";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import PageTransition from "../components/PageTransition";

const initialForm = {
  title: "",
  description: "",
  imageUrl: "",
  liveUrl: "",
  repoUrl: "",
  tags: "",
  featured: false,
};

export default function Projects() {
  const { projects, loading, error, refreshProjects } = useProjects({ published: true });
  const [filter, setFilter] = useState("all");
  const { user, login } = useAuth();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  // Auth inside modal if not yet logged in
  const [adminEmail, setAdminEmail] = useState("smachewalene13@gmail.com");
  const [adminPassword, setAdminPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const allTags = ["all", ...new Set(projects.flatMap((p) => p.tags ?? []))];

  const visible =
    filter === "all"
      ? projects
      : projects.filter((p) => p.tags?.includes(filter));

  const handleOpenModal = () => {
    setForm(initialForm);
    setFormError("");
    setAuthError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormError("");
    setAuthError("");
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      await login(adminEmail, adminPassword);
    } catch (err) {
      setAuthError(err.message || "Invalid administrator credentials");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSaving(true);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        imageUrl: form.imageUrl.trim() || null,
        liveUrl: form.liveUrl.trim() || null,
        repoUrl: form.repoUrl.trim() || null,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
          : [],
        featured: Boolean(form.featured),
        published: true,
      };

      await projectApi.createProject(payload);
      await refreshProjects();
      handleCloseModal();
      setSuccessToast(`Project "${form.title}" published successfully to your portfolio!`);
      setTimeout(() => setSuccessToast(""), 6000);
    } catch (err) {
      setFormError(err.message || "Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageTransition>
      <div className="relative overflow-hidden min-h-[calc(100vh-80px)]">
        {/* Subtle Ambient background glows */}
        <div className="absolute top-24 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-2/3 right-10 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16">
          {/* Header with Title and Add New Project Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-violet-300 bg-violet-500/15 border-2 border-violet-400/80 px-4 py-1.5 rounded-full inline-block mb-3 shadow-md shadow-violet-500/20">
                Work Catalog
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                Featured Projects
              </h1>
              <p className="text-gray-200 text-sm sm:text-base font-normal">
                Explore recent full-stack applications, developer tools, and client projects.
              </p>
            </div>

            <button
              onClick={handleOpenModal}
              className="shrink-0 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-violet-600/30 transition-all hover:scale-105 cursor-pointer self-start sm:self-auto"
            >
              Add New Project
            </button>
          </div>

          {/* Success Alert Banner with High Contrast */}
          {successToast && (
            <div className="mb-10 p-5 rounded-2xl bg-emerald-500/15 border-2 border-emerald-400 text-emerald-200 text-sm font-bold shadow-lg shadow-emerald-500/20">
              {successToast}
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <ProjectFilter
              tags={allTags}
              activeFilter={filter}
              onSelectFilter={setFilter}
            />
          )}

          {loading && <Loader label="Loading projects catalog..." />}
          {error && <ErrorMessage message={error} />}

          {!loading && !error && visible.length === 0 && (
            <p className="text-gray-300 py-12 text-center text-base font-medium">
              No projects match the selected filter.
            </p>
          )}

          {!loading && !error && visible.length > 0 && (
            <ProjectGrid projects={visible} />
          )}

          {/* Add Project Modal with High Visibility */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
              <div className="relative w-full max-w-xl rounded-3xl border-2 border-white/20 bg-[#13141f] p-6 sm:p-8 shadow-2xl shadow-black/95 my-8 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

                {!user ? (
                  /* Admin Login Prompt */
                  <div className="pt-2">
                    <h2 className="text-2xl font-extrabold text-white mb-2">
                      Admin Sign In
                    </h2>
                    <p className="text-xs text-gray-300 font-medium mb-6">
                      Please sign in with your administrator account to create and publish new projects.
                    </p>

                    {authError && (
                      <div className="mb-5">
                        <ErrorMessage message={authError} />
                      </div>
                    )}

                    <form onSubmit={handleAuthSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                          Admin Email
                        </label>
                        <input
                          type="email"
                          required
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1d1f33] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                          Admin Password
                        </label>
                        <input
                          type="password"
                          required
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1d1f33] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all shadow-inner"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="px-5 py-2.5 rounded-xl border-2 border-white/20 bg-[#181928] hover:border-white text-gray-200 hover:text-white font-bold text-xs transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={authLoading}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all cursor-pointer disabled:opacity-50"
                        >
                          {authLoading ? "Signing In..." : "Sign In & Continue"}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  /* Project Creation Form */
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-extrabold text-white">
                        Add New Project
                      </h2>
                      <span className="text-xs text-violet-300 font-bold bg-violet-500/20 px-3 py-1 rounded-full border border-violet-400/50">
                        Signed in as Admin
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 font-medium mb-6">
                      Enter the project specifications below to publish it directly to your live portfolio.
                    </p>

                    {formError && (
                      <div className="mb-5">
                        <ErrorMessage message={formError} />
                      </div>
                    )}

                    <form onSubmit={handleProjectSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.title}
                          onChange={(e) => setForm({ ...form, title: e.target.value })}
                          placeholder="e.g. Distributed Task Queue"
                          className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1d1f33] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all shadow-inner"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                          Description *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={form.description}
                          onChange={(e) => setForm({ ...form, description: e.target.value })}
                          placeholder="Describe the application, architecture, and problem solved..."
                          className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1d1f33] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all resize-none shadow-inner"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                            Image URL (Optional)
                          </label>
                          <input
                            type="text"
                            value={form.imageUrl}
                            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                            placeholder="e.g. /hero.jpg or https://..."
                            className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1d1f33] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all shadow-inner"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                            Tech Tags (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={form.tags}
                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                            placeholder="React, Node.js, PostgreSQL"
                            className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1d1f33] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all shadow-inner"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                            Live Demo URL
                          </label>
                          <input
                            type="url"
                            value={form.liveUrl}
                            onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                            placeholder="https://example.com"
                            className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1d1f33] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all shadow-inner"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
                            GitHub Repo URL
                          </label>
                          <input
                            type="url"
                            value={form.repoUrl}
                            onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                            placeholder="https://github.com/..."
                            className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1d1f33] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all shadow-inner"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 pt-1">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={form.featured}
                          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                          className="w-4 h-4 rounded border-white/20 bg-[#181928] text-violet-600 focus:ring-violet-500 cursor-pointer"
                        />
                        <label htmlFor="featured" className="text-sm font-bold text-gray-200 cursor-pointer">
                          Feature this project on homepage
                        </label>
                      </div>

                      <div className="flex items-center justify-between pt-5 border-t border-white/10">
                        <Link
                          to="/admin"
                          className="text-xs font-bold text-violet-300 hover:text-white transition-colors"
                        >
                          Open Admin Dashboard
                        </Link>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={handleCloseModal}
                            className="px-5 py-2.5 rounded-xl border-2 border-white/20 bg-[#181928] hover:border-white text-gray-200 hover:text-white font-bold text-xs transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-violet-600/30 transition-all cursor-pointer disabled:opacity-50"
                          >
                            {saving ? "Saving Project..." : "Save Project"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}