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
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Manage your portfolio content in real-time.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
                tab === t.id
                  ? "border-violet-500 text-violet-400 font-semibold"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div>
          {tab === "projects" && <ManageProjects />}
          {tab === "skills" && <AdminSkills />}
          {tab === "profile" && <ManageProfile />}
          {tab === "messages" && <ManageMessages />}
        </div>
      </div>
    </PageTransition>
  );
}
