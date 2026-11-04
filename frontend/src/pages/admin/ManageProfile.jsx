import { useEffect, useState } from "react";
import profileApi from "../../api/profileApi";
import Loader from "../../components/common/Loader";

export default function ManageProfile() {
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    bio: "",
    about_details: "",
    email: "",
    location: "",
    avatar_url: "",
    resume_url: "",
    github_url: "",
    linkedin_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    profileApi
      .getProfile()
      .then((data) => {
        if (data) setProfile(data);
      })
      .catch((err) => {
        setStatus({ type: "error", message: err.message });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: "", message: "" });

    try {
      const updated = await profileApi.updateProfile(profile);
      setProfile(updated);
      setStatus({ type: "success", message: "Profile updated successfully!" });
      setTimeout(() => setStatus({ type: "", message: "" }), 5000);
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader label="Loading profile data..." />;

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-white">Manage Profile</h2>
        <p className="text-sm text-gray-300 font-medium">
          Update your public portfolio info, title, bio summary, and external links.
        </p>
      </div>

      {status.message && (
        <div
          className={`mb-8 p-4 rounded-2xl text-sm font-bold border-2 ${
            status.type === "success"
              ? "bg-emerald-500/15 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-500/20"
              : "bg-red-500/15 border-red-400 text-red-200 shadow-md shadow-red-500/20"
          }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={profile.name || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1a1c2d] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
              Professional Title *
            </label>
            <input
              type="text"
              name="title"
              value={profile.title || ""}
              onChange={handleChange}
              required
              placeholder="e.g. Full-Stack Developer"
              className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1a1c2d] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
              Contact Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1a1c2d] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={profile.location || ""}
              onChange={handleChange}
              placeholder="e.g. Addis Ababa, Ethiopia"
              className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1a1c2d] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
            Hero Bio (Displayed on Homepage)
          </label>
          <textarea
            name="bio"
            value={profile.bio || ""}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1a1c2d] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all resize-none leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
            About Details (Displayed on About page)
          </label>
          <textarea
            name="about_details"
            value={profile.about_details || ""}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:bg-[#1a1c2d] focus:ring-4 focus:ring-violet-500/20 focus:outline-none transition-all resize-none leading-relaxed"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              name="github_url"
              value={profile.github_url || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
              LinkedIn / Social URL
            </label>
            <input
              type="url"
              name="linkedin_url"
              value={profile.linkedin_url || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-200 font-bold mb-2">
              Resume URL
            </label>
            <input
              type="text"
              name="resume_url"
              value={profile.resume_url || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[#181928] border-2 border-white/20 text-white placeholder-gray-400 text-sm font-medium hover:border-white/35 focus:border-violet-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-violet-600/30 transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
