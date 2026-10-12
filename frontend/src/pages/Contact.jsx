import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api/client";
import PageTransition from "../components/PageTransition";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    content: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await api.sendMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", content: "" });
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
        <p className="text-gray-400 mb-10">
          Have a project or just want to say hi? Fill out the form below.
        </p>

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm"
          >
            Thanks! Your message was sent. I'll get back to you soon.
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <Field
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <Field
            label="Subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
          />
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Message <span className="text-violet-400">*</span>
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors resize-none"
            />
          </div>
          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-lg bg-violet-500 hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </div>
    </PageTransition>
  );
}

function Field({ label, name, value, onChange, type = "text", required }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-300">
        {label} {required && <span className="text-violet-400">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
      />
    </div>
  );
}