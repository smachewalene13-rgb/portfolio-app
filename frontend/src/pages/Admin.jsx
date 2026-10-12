import { useState } from "react";
import PageTransition from "../components/PageTransition";
import AdminProjects from "../components/admin/AdminProjects";
import AdminSkills from "../components/admin/AdminSkills";
import AdminMessages from "../components/admin/AdminMessages";

const TABS = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "messages", label: "Messages" },
];

export default function Admin() {
  const [tab, setTab] = useState("projects");

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your portfolio content.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 border-b border-white/10">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                tab === t.id
                  ? "border-violet-500 text-violet-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === "projects" && <AdminProjects />}
        {tab === "skills" && <AdminSkills />}
        {tab === "messages" && <AdminMessages />}
      </div>
    </PageTransition>
  );
}