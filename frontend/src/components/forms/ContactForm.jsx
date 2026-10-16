import { useState } from "react";
import { motion } from "framer-motion";
import contactApi from "../../api/contactApi";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";

const QUICK_SUBJECTS = [
  "Hiring / Full-Time Role",
  "New Project / Freelance",
  "Consulting / Code Review",
  "Quick Chat / Hello",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectQuickSubject = (subj) => {
    setForm((prev) => ({ ...prev, subject: subj }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      await contactApi.sendMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <div>
      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-start gap-3"
        >
          <div>
            <div className="font-semibold text-white">Message sent successfully!</div>
            <p className="text-xs text-emerald-400/90 mt-0.5">
              Thank you for reaching out. An instant alert has been sent to Simachew's inbox, and you'll hear back promptly.
            </p>
          </div>
        </motion.div>
      )}

      {status === "error" && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Quick Subject Chips */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">
            What can I help you with?
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_SUBJECTS.map((subj) => (
              <button
                key={subj}
                type="button"
                onClick={() => handleSelectQuickSubject(subj)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  form.subject === subj
                    ? "bg-violet-500/20 border-violet-500 text-violet-300 shadow-sm"
                    : "border-white/10 text-gray-400 hover:border-violet-500/40 hover:text-white bg-white/[0.02]"
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Your Name <span className="text-violet-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. Sarah Connor"
              className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Email Address <span className="text-violet-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="e.g. sarah@company.com"
              className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors text-white text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Select a tag above or type custom subject..."
            className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Message <span className="text-violet-400">*</span>
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Tell me a bit about what you need or what position you are hiring for..."
            className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors resize-none text-white text-sm leading-relaxed"
          />
        </div>

        <Button
          type="submit"
          disabled={status === "sending"}
          className="w-full sm:w-auto px-8"
        >
          {status === "sending" ? "Sending Alert..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
