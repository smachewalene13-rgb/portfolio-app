import { useState } from "react";
import { Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
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
    setAuthLoading(true);
    setAuthError("");
    try {
      await login(adminEmail, adminPassword);
    } catch (err) {
      setAuthError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setFormError("Project title is required");
      return;
    }
    if (!form.description.trim()) {
      setFormError("Project description is required");
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        imageUrl: form.imageUrl.trim() || null,
        liveUrl: form.liveUrl.trim() || null,
        repoUrl: form.repoUrl.trim() || null,
        tags: form.tags
          ? form.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        featured: form.featured,
        published: true,
      };

      await projectsApi.createProject(payload);
      await refreshProjects();
      setIsModalOpen(false);
      setSuccessToast(`Project "${form.title}" was added successfully!`);
      setTimeout(() => setSuccessToast(""), 4000);
    } catch (err) {
      setFormError(err.message || "Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header with Title and Add New Project Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              Featured Projects
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Explore recent full-stack applications, developer tools, and client projects.
            </p>
          </div>

          <button
            onClick={handleOpenModal}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 transition-all hover:scale-105 cursor-pointer self-start sm:self-auto"
          >
            Add New Project
          </button>
        </div>

        {/* Success Alert Banner */}
        {successToast && (
          <div className="mb-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm font-medium">
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
          <p className="text-gray-500 py-8">No projects match the selected filter.</p>
        )}

        {!loading && !error && visible.length > 0 && (
          <ProjectGrid projects={visible} />
        )}

        {/* Add Project Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#0e0e17] p-6 sm:p-8 shadow-2xl my-8">
              {!user ? (
                /* Admin Login Prompt */
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    Admin Sign In
                  </h2>
                  <p className="text-xs text-gray-400 mb-6">
                    Please sign in with your administrator account to create and publish new projects.
                  </p>

                  {authError && (
                    <div className="mb-5">
                      <ErrorMessage message={authError} />
                    </div>
                  )}

                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                        Admin Email
                      </label>
                      <input
                        type="email"
                        required
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                        Admin Password
                      </label>
                      <input
                        type="password"
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm text-gray-300 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={authLoading}
                        className="px-5 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-semibold text-sm transition-all cursor-pointer disabled:opacity-50"
                      >
                        {authLoading ? "Signing In..." : "Sign In & Continue"}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Project Creation Form */
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-white">
                      Add New Project
                    </h2>
                    <span className="text-xs text-violet-400 font-medium bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-500/20">
                      Signed in as Admin
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-6">
                    Enter the project specifications below to publish it to your portfolio.
                  </p>

                  {formError && (
                    <div className="mb-5">
                      <ErrorMessage message={formError} />
                    </div>
                  )}

                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="e.g. Distributed Task Queue"
                        className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                        Description *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Describe the application, architecture, and problem solved..."
                        className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none resize-none"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                          Image URL (Optional)
                        </label>
                        <input
                          type="text"
                          value={form.imageUrl}
                          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                          placeholder="e.g. /hero.jpg or https://..."
                          className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                          Tech Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={form.tags}
                          onChange={(e) => setForm({ ...form, tags: e.target.value })}
                          placeholder="React, Node.js, PostgreSQL"
                          className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                          Live Demo URL
                        </label>
                        <input
                          type="url"
                          value={form.liveUrl}
                          onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                          placeholder="https://example.com"
                          className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-1.5">
                          GitHub Repo URL
                        </label>
                        <input
                          type="url"
                          value={form.repoUrl}
                          onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
                          placeholder="https://github.com/..."
                          className="w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm focus:border-violet-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                        className="rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500 cursor-pointer"
                      />
                      <label htmlFor="featured" className="text-sm text-gray-300 cursor-pointer">
                        Feature this project on homepage
                      </label>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <Link
                        to="/admin"
                        className="text-xs text-gray-400 hover:text-violet-300 transition-colors"
                      >
                        Open Full Admin Dashboard
                      </Link>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm text-gray-300 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className="px-5 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-semibold text-sm shadow-md shadow-violet-500/20 transition-all cursor-pointer disabled:opacity-50"
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
    </PageTransition>
  );
}