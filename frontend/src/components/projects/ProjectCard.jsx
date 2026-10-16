import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index = 0 }) {
  const imageUrl = project.imageUrl || project.image_url;
  const liveUrl = project.liveUrl || project.live_url;
  const repoUrl = project.repoUrl || project.repo_url;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-violet-500/50 hover:bg-white/[0.04] hover:-translate-y-1"
    >
      {project.featured && (
        <span className="absolute -top-2.5 right-4 text-[10px] uppercase font-semibold tracking-wider bg-violet-500 text-white px-2.5 py-0.5 rounded-full shadow-md shadow-violet-500/30">
          Featured
        </span>
      )}

      <div className="mb-4 aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-violet-950/40 via-slate-900/60 to-purple-950/30 border border-white/10 flex items-center justify-center p-4 relative group-hover:border-violet-500/40 transition-colors">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-center px-4">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-violet-400">
              {project.tags?.[0] || "Full-Stack Project"}
            </span>
            <div className="text-sm md:text-base font-bold text-white mt-1 line-clamp-1">
              {project.title}
            </div>
          </div>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2 group-hover:text-violet-400 transition-colors">
        {project.title}
      </h3>

      <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-violet-500/10 text-violet-300 border border-violet-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/5 text-sm mt-auto">
        <div className="flex gap-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
            >
              Live Demo
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Source
            </a>
          )}
        </div>
        <Link
          to={`/projects/${project.id}`}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          Details
        </Link>
      </div>
    </motion.article>
  );
}
