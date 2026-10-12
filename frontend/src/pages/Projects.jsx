import { useEffect, useState } from "react";
import { api } from "../api/client";
import ProjectCard from "../components/ProjectCard";
import Loader from "../components/Loader";
import PageTransition from "../components/PageTransition";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api
      .getProjects()
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const allTags = ["all", ...new Set(projects.flatMap((p) => p.tags ?? []))];

  const visible =
    filter === "all"
      ? projects
      : projects.filter((p) => p.tags?.includes(filter));

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">Projects</h1>
        <p className="text-gray-400 mb-8">Things I've built and shipped.</p>

        {!loading && !error && (
          <div className="flex flex-wrap gap-2 mb-10">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors border ${
                  filter === tag
                    ? "bg-violet-500 border-violet-500 text-white"
                    : "border-white/10 text-gray-400 hover:border-violet-500/50 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {loading && <Loader />}
        {error && <p className="text-red-400">Error: {error}</p>}

        {!loading && !error && visible.length === 0 && (
          <p className="text-gray-500">No projects match this filter.</p>
        )}

        {!loading && !error && visible.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}