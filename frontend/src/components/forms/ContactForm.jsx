import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import contactApi from "../../api/contactApi";
import ErrorMessage from "../common/ErrorMessage";

const QUICK_TOPICS = [
  "Full-Time Engineering",
  "Freelance Project",
  "Architecture & Consulting",
  "General Inquiry",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [selectedTopic, setSelectedTopic] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectTopic = (topic) => {
    if (selectedTopic === topic) {
      setSelectedTopic("");
      setForm((prev) => ({ ...prev, subject: "" }));
    } else {
      setSelectedTopic(topic);
      setForm((prev) => ({ ...prev, subject: topic }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      await contactApi.sendMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject?.trim() || "Portfolio Contact Form",
        message: form.message.trim(),
      });
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setSelectedTopic("");
    } catch (err) {
      setStatus("error");
      setError(
        err.message || "Failed to deliver message. Please reach out via email directly."
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setError("");
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="py-10 px-6 text-center space-y-5 rounded-2xl bg-[#181928] border-2 border-emerald-500/40"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-300 font-extrabold text-2xl shadow-lg shadow-emerald-500/20">
              OK
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white mb-2">
                Message Sent Successfully
              </h3>
              <p className="text-sm text-gray-200 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out! Your message has been forwarded directly to Simachew's inbox. You will receive a response within 24 hours.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Quick Topic Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-violet-300 font-extrabold mb-3">
                What would you like to discuss?
              </label>
              <div className="flex flex-wrap gap-2.5">
                {QUICK_TOPICS.map((topic) => {
                  const isActive = selectedTopic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => handleSelectTopic(topic)}
                      className={`text-xs px-4 py-2.5 rounded-xl font-bold border-2 transition-all cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 border-violet-300 text-white shadow-lg shadow-violet-600/40 scale-105"
                          : "bg-slate-800/90 border-slate-600 text-slate-100 hover:border-violet-400 hover:text-white hover:bg-violet-600/20 shadow-sm"
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-2"
              >
                <ErrorMessage message={error} />
              </motion.div>
            )}

            {/* Two-column responsive inputs: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-200 font-extrabold mb-2">
                  Full Name <span className="text-violet-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border-2 border-slate-600 text-white placeholder-slate-400 text-sm font-medium hover:border-slate-400 focus:border-violet-400 focus:bg-slate-800/90 focus:ring-4 focus:ring-violet-500/25 focus:outline-none transition-all shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-200 font-extrabold mb-2">
                  Email Address <span className="text-violet-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. alex@company.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border-2 border-slate-600 text-white placeholder-slate-400 text-sm font-medium hover:border-slate-400 focus:border-violet-400 focus:bg-slate-800/90 focus:ring-4 focus:ring-violet-500/25 focus:outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-200 font-extrabold mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Choose a topic above or type a custom subject..."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border-2 border-slate-600 text-white placeholder-slate-400 text-sm font-medium hover:border-slate-400 focus:border-violet-400 focus:bg-slate-800/90 focus:ring-4 focus:ring-violet-500/25 focus:outline-none transition-all shadow-inner"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-200 font-extrabold mb-2">
                Message <span className="text-violet-400">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Share project scope, role requirements, timeline, or any questions..."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border-2 border-slate-600 text-white placeholder-slate-400 text-sm font-medium hover:border-slate-400 focus:border-violet-400 focus:bg-slate-800/90 focus:ring-4 focus:ring-violet-500/25 focus:outline-none transition-all resize-none leading-relaxed shadow-inner"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-violet-600/40 border border-violet-400/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer hover:scale-[1.02]"
              >
                {status === "sending" ? "Delivering Message..." : "Send Message"}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
