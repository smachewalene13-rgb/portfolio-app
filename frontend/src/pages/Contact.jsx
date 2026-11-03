import { useState } from "react";
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
      <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-2/3 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
            
            {/* Left Column: Direct Info & Availability */}
            <div className="lg:col-span-5 space-y-8">
              {/* Header block */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for full-time roles & projects
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-5">
                  Let's build something{" "}
                  <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                    exceptional
                  </span>{" "}
                  together.
                </h1>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Whether you are hiring a full-stack engineer, building an ambitious product from scratch, or seeking technical guidance, I am ready to collaborate and bring your ideas to reality.
                </p>
              </div>

              {/* Direct Info Cards */}
              <div className="space-y-4">
                {/* Email Card with 1-click copy */}
                <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-violet-500/30 transition-all backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                    Direct Email
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <a
                      href={`mailto:${email}`}
                      className="text-sm sm:text-base font-semibold text-white hover:text-violet-300 transition-colors break-all"
                    >
                      {email}
                    </a>
                    <button
                      onClick={handleCopy}
                      type="button"
                      className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        copied
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "border border-white/10 text-gray-300 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10"
                      }`}
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Location & Timezone Card */}
                <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                    Location & Working Hours
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-white">
                    Addis Ababa, Ethiopia (UTC+3)
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                    Open to remote roles globally. Flexible overlap with US, UK, and European business hours.
                  </p>
                </div>

                {/* Response Guarantee Card */}
                <div className="p-4 sm:p-5 rounded-2xl border border-violet-500/20 bg-violet-500/[0.04] backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-wider text-violet-300 font-semibold mb-1">
                    Response Guarantee
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Messages are routed directly to my personal device. I typically respond within 24 hours.
                  </div>
                </div>
              </div>

              {/* Direct Channels */}
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">
                  Connect Directly
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl border border-white/10 hover:border-violet-500/50 hover:bg-white/5 text-xs font-semibold text-gray-300 hover:text-white transition-all"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl border border-white/10 hover:border-violet-500/50 hover:bg-white/5 text-xs font-semibold text-gray-300 hover:text-white transition-all"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      "Hi Simachew, I found your portfolio and wanted to connect!"
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/5 hover:bg-emerald-500/15 text-xs font-semibold text-emerald-400 transition-all"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Sleek Form Card */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#111118]/80 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Send a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Fill in your details below and your message will be delivered directly to my inbox.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}