import { useEffect, useState } from "react";
import profileApi from "../../api/profileApi";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";

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
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader label="Loading profile..." />;

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Manage Profile</h2>
        <p className="text-sm text-gray-400">
          Update your public profile, hero summary, and social links.
        </p>
      </div>

      {status.message && (
        <div
          className={`mb-6 p-4 rounded-lg text-sm ${
            status.type === "success"
              ? "bg-green-500/10 border border-green-500/30 text-green-400"
              : "bg-red-500/10 border border-red-500/30 text-red-400"
          }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profile.name || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Professional Title
            </label>
            <input
              type="text"
              name="title"
              value={profile.title || ""}
              onChange={handleChange}
              required
              placeholder="e.g. Full-Stack Developer"
              className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none text-white text-sm"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Contact Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={profile.location || ""}
              onChange={handleChange}
              placeholder="e.g. Addis Ababa, Ethiopia"
              className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none text-white text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Hero Bio (displayed on Homepage)
          </label>
          <textarea
            name="bio"
            value={profile.bio || ""}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none resize-none text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            About Details (displayed on About page)
          </label>
          <textarea
            name="about_details"
            value={profile.about_details || ""}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none resize-none text-white text-sm"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              GitHub URL
            </label>
            <input
              type="url"
              name="github_url"
              value={profile.github_url || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedin_url"
              value={profile.linkedin_url || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Resume URL
            </label>
            <input
              type="text"
              name="resume_url"
              value={profile.resume_url || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none text-white text-sm"
            />
          </div>
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? "Saving Changes..." : "Save Profile"}
        </Button>
      </form>
    </div>
  );
}
