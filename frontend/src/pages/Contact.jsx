import { useState } from "react";
import { motion } from "framer-motion";
import ContactForm from "../components/forms/ContactForm";
import PageTransition from "../components/PageTransition";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "smachewalene13@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Connect & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              {/* Availability Badge */}
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-6">
                Available for opportunities & projects
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Let's build something <span className="text-violet-400">great</span> together.
              </h1>
              <p className="text-gray-400 text-base leading-relaxed">
                Whether you have an ambitious product idea, need architecture guidance, or want to discuss full-stack engineering roles, I'd love to connect.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {/* Email Card with 1-click copy */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-violet-500/30 transition-colors">
                <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">
                  Direct Email
                </div>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${email}`}
                    className="text-sm md:text-base font-medium text-white hover:text-violet-300 transition-colors truncate"
                  >
                    {email}
                  </a>
                  <button
                    onClick={handleCopy}
                    type="button"
                    className="shrink-0 px-3 py-1.5 rounded-lg border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 text-xs font-medium text-gray-300 hover:text-white transition-all cursor-pointer"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Location & Timezone Card */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-1">
                  Location & Availability
                </div>
                <div className="text-sm font-medium text-white">
                  Addis Ababa, Ethiopia (UTC+3)
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Open to remote roles worldwide & flexible with US / European timezones.
                </div>
              </div>

              {/* Response Time Guarantee */}
              <div className="p-3.5 rounded-xl border border-violet-500/20 bg-violet-500/5 text-xs text-violet-300">
                <span>
                  <strong>Fast Response:</strong> Messages trigger an instant alert. I typically reply within 24 hours.
                </span>
              </div>
            </div>

            {/* Social / Messaging Direct Links */}
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3">
                Connect Directly
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg border border-white/10 hover:border-violet-500/50 hover:bg-white/5 text-xs font-medium text-gray-300 hover:text-white transition-all"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg border border-white/10 hover:border-violet-500/50 hover:bg-white/5 text-xs font-medium text-gray-300 hover:text-white transition-all"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent("Hi Simachew, I found your portfolio and wanted to connect!")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-xs font-medium text-emerald-400 transition-all"
                >
                  WhatsApp Quick Chat
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Box */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-2">
                Send a Message
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Fill in your details below and your message will be routed directly to my inbox.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}