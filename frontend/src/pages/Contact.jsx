import { useState } from "react";
import ContactForm from "../components/forms/ContactForm";
import PageTransition from "../components/PageTransition";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const email = "smachewalene13@gmail.com";
  const phone = "0940039167";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <PageTransition>
      <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        {/* Subtle Ambient background glows */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-2/3 right-10 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Direct Info & Availability */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              {/* Header block */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border-2 border-emerald-400 text-emerald-300 text-xs font-bold mb-6 shadow-md shadow-emerald-500/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for full-time roles & projects
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
                  Let's build something{" "}
                  <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                    exceptional
                  </span>{" "}
                  together.
                </h1>

                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-normal">
                  Whether you are hiring a full-stack engineer, building an ambitious product from scratch, or seeking technical architecture guidance, I am ready to collaborate.
                </p>
              </div>

              {/* Direct Info Cards with High Contrast & Clear Borders */}
              <div className="space-y-4">
                {/* Email Card with 1-click copy */}
                <div className="p-5 rounded-2xl border-2 border-slate-600 bg-slate-900/95 hover:border-violet-400 transition-all shadow-xl">
                  <div className="text-xs uppercase tracking-wider text-violet-300 font-extrabold mb-2">
                    Direct Email
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <a
                      href={`mailto:${email}`}
                      className="text-sm sm:text-base font-extrabold text-white hover:text-violet-300 transition-colors break-all"
                    >
                      {email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      type="button"
                      className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        copiedEmail
                          ? "bg-emerald-500/30 text-emerald-200 border-2 border-emerald-400 shadow-md shadow-emerald-500/20"
                          : "border-2 border-violet-500/60 bg-violet-600/30 text-violet-200 hover:bg-violet-600 hover:text-white hover:border-violet-400"
                      }`}
                    >
                      {copiedEmail ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Phone Contact Card with 1-click copy & Direct Call */}
                <div className="p-5 rounded-2xl border-2 border-slate-600 bg-slate-900/95 hover:border-violet-400 transition-all shadow-xl">
                  <div className="text-xs uppercase tracking-wider text-violet-300 font-extrabold mb-2">
                    Phone Contact
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <a
                      href={`tel:${phone}`}
                      className="text-sm sm:text-base font-extrabold text-white hover:text-violet-300 transition-colors tracking-wide"
                    >
                      {phone}
                    </a>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${phone}`}
                        className="shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-2 border-emerald-500/60 bg-emerald-600/20 text-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-400"
                      >
                        Call
                      </a>
                      <button
                        onClick={handleCopyPhone}
                        type="button"
                        className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          copiedPhone
                            ? "bg-emerald-500/30 text-emerald-200 border-2 border-emerald-400 shadow-md shadow-emerald-500/20"
                            : "border-2 border-violet-500/60 bg-violet-600/30 text-violet-200 hover:bg-violet-600 hover:text-white hover:border-violet-400"
                        }`}
                      >
                        {copiedPhone ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Location & Timezone Card */}
                <div className="p-5 rounded-2xl border-2 border-slate-600 bg-slate-900/95 shadow-xl">
                  <div className="text-xs uppercase tracking-wider text-violet-300 font-extrabold mb-2">
                    Location & Network
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-white">
                    Injibara, Ethiopia (UTC+3)
                  </div>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-medium">
                    Open to remote roles globally. Flexible overlap with US, UK, and European business hours.
                  </p>
                </div>

                {/* Response Guarantee Card */}
                <div className="p-5 rounded-2xl border-2 border-violet-500/60 bg-gradient-to-br from-violet-950/80 to-slate-900/95 shadow-xl">
                  <div className="text-xs uppercase tracking-wider text-violet-300 font-extrabold mb-1">
                    Response Guarantee
                  </div>
                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    Messages are delivered directly to my personal device. I typically respond within 24 hours.
                  </div>
                </div>
              </div>

              {/* Direct Channels */}
              <div>
                <div className="text-xs uppercase tracking-wider text-violet-300 font-extrabold mb-3">
                  Connect Directly
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl border-2 border-slate-600 hover:border-white bg-slate-800/90 text-xs font-extrabold text-white transition-all shadow-md hover:scale-105"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://t.me/Simexsami"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl border-2 border-sky-400 bg-sky-500/25 hover:bg-sky-500/40 text-xs font-extrabold text-sky-100 transition-all shadow-md shadow-sky-500/20 hover:scale-105"
                  >
                    Telegram (@Simexsami)
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      "Hi Simachew, I found your portfolio and wanted to connect!"
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl border-2 border-emerald-400 bg-emerald-500/25 hover:bg-emerald-500/40 text-xs font-extrabold text-emerald-100 transition-all shadow-md shadow-emerald-500/20 hover:scale-105"
                  >
                    WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: High-Visibility Sleek Form Card */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl border-2 border-slate-600 bg-slate-900/95 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/80 overflow-hidden">
                {/* Decorative Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

                <div className="mb-6 sm:mb-8 pt-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    Send a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium">
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