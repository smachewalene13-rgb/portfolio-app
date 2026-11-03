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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="py-10 px-4 text-center space-y-5"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl">
              OK
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Message Sent Successfully
              </h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                Thank you for getting in touch. Your message has been forwarded
                directly to Simachew's inbox. You will receive a response within 24 hours.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
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
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2.5">
                What would you like to discuss?
              </label>
              <div className="flex flex-wrap gap-2">
                {QUICK_TOPICS.map((topic) => {
                  const isActive = selectedTopic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => handleSelectTopic(topic)}
                      className={`text-xs px-3.5 py-2 rounded-lg font-medium border transition-all cursor-pointer ${
                        isActive
                          ? "bg-violet-500/20 border-violet-500 text-violet-200 shadow-sm shadow-violet-500/20"
                          : "border-white/10 bg-white/[0.02] text-gray-400 hover:border-violet-500/40 hover:text-white hover:bg-white/[0.04]"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                  Full Name <span className="text-violet-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 text-sm focus:border-violet-500 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                  Email Address <span className="text-violet-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. alex@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 text-sm focus:border-violet-500 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Choose a topic above or type a subject..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 text-sm focus:border-violet-500 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold mb-2">
                Message <span className="text-violet-400">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Share project scope, role requirements, timeline, or any questions..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 text-sm focus:border-violet-500 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
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
