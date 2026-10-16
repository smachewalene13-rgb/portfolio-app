import { useState } from "react";
import useProjects from "../hooks/useProjects";
import ProjectGrid from "../components/projects/ProjectGrid";
import ProjectFilter from "../components/projects/ProjectFilter";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import SectionTitle from "../components/common/SectionTitle";
import PageTransition from "../components/PageTransition";

export default function Projects() {
  const { projects, loading, error } = useProjects({ published: true });
  const [filter, setFilter] = useState("all");

  const allTags = ["all", ...new Set(projects.flatMap((p) => p.tags ?? []))];

  const visible =
    filter === "all"
      ? projects
      : projects.filter((p) => p.tags?.includes(filter));

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <SectionTitle
          title="Featured Projects"
          subtitle="Explore recent full-stack applications, developer tools, and client projects."
        />

        {!loading && !error && projects.length > 0 && (
          <ProjectFilter
            tags={allTags}
            activeFilter={filter}
            onSelectFilter={setFilter}
          />
        )}

        {loading && <Loader label="Loading projects catalog..." />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && visible.length === 0 && (
          <p className="text-gray-500 py-8">No projects match the selected filter.</p>
        )}

        {!loading && !error && visible.length > 0 && (
          <ProjectGrid projects={visible} />
        )}
      </div>
    </PageTransition>
  );
}