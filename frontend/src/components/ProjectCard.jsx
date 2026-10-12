export default function ProjectCard({ project }) {
  return (
    <article className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-violet-500/50 hover:bg-white/[0.04] hover:-translate-y-1">
      {project.featured && (
        <span className="absolute -top-2 right-4 text-[10px] uppercase tracking-wider bg-violet-500 text-white px-2 py-0.5 rounded-full">
          Featured
        </span>
      )}

      <h3 className="text-xl font-semibold mb-2 group-hover:text-violet-400 transition-colors">
        {project.title}
      </h3>

      <p className="text-sm text-gray-400 leading-relaxed mb-4">
        {project.description}
      </p>

      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md bg-violet-500/10 text-violet-300 border border-violet-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-4 text-sm">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            Live Demo →
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Source Code
          </a>
        )}
      </div>
    </article>
  );
}