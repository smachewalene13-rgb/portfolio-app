import { useState } from "react";
import PageTransition from "../../components/PageTransition";
import ManageProjects from "./ManageProjects";
import ManageProfile from "./ManageProfile";
import ManageMessages from "./ManageMessages";
import AdminSkills from "../../components/admin/AdminSkills";

const TABS = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "profile", label: "Profile" },
  { id: "messages", label: "Messages" },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState("projects");

  return (
    <PageTransition>
      <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        {/* Subtle Ambient background glows */}
        <div className="absolute top-24 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-2/3 right-10 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Header */}
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-300 bg-violet-500/15 border-2 border-violet-400/80 px-4 py-1.5 rounded-full inline-block mb-3 shadow-md shadow-violet-500/20">
              Control Panel
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-white tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-gray-200 text-sm sm:text-base font-normal">
              Manage your portfolio content, projects catalog, skills, profile, and client messages in real-time.
            </p>
          </div>

          {/* High-Visibility Tab Navigation Pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {TABS.map((t) => {
              const isActive = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 ${
                    isActive
                      ? "bg-violet-600 border-violet-400 text-white shadow-lg shadow-violet-600/30 scale-105"
                      : "bg-[#181928] border-white/20 text-gray-200 hover:border-violet-400 hover:text-white hover:bg-violet-600/10"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* High-Visibility Dashboard Content Container */}
          <div className="relative rounded-3xl border-2 border-white/20 bg-[#13141f] p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/90 overflow-hidden">
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

            <div className="pt-2">
              {tab === "projects" && <ManageProjects />}
              {tab === "skills" && <AdminSkills />}
              {tab === "profile" && <ManageProfile />}
              {tab === "messages" && <ManageMessages />}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
