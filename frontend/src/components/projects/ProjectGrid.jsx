import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }) {
  if (!projects || projects.length === 0) {
    return <p className="text-gray-500 py-8">No projects available to display.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}
