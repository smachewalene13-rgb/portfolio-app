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
      className="group relative flex flex-col rounded-2xl border-2 border-white/20 bg-[#13141f] p-6 transition-all duration-300 hover:border-violet-400 hover:-translate-y-1.5 shadow-xl shadow-black/60 overflow-hidden"
    >
      {/* Top Accent Gradient on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity" />

      {project.featured && (
        <span className="absolute top-3 right-4 z-10 text-[10px] uppercase font-bold tracking-wider bg-violet-600 text-white px-3 py-1 rounded-full shadow-lg shadow-violet-600/40 border border-violet-400/50">
          Featured
        </span>
      )}

      {/* Project Image / Visual Preview with Direct Live Link */}
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          title={`Open ${project.title} Live Demo`}
          className="mb-5 aspect-video w-full rounded-xl overflow-hidden bg-[#181928] border-2 border-white/15 flex items-center justify-center relative group-hover:border-violet-400/80 transition-all cursor-pointer block shadow-inner"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-center px-4">
              <span className="text-[11px] uppercase tracking-widest font-bold text-violet-400">
                {project.tags?.[0] || "Full-Stack Project"}
              </span>
              <div className="text-sm md:text-base font-extrabold text-white mt-1 line-clamp-1">
                {project.title}
              </div>
            </div>
          )}
        </a>
      ) : (
        <div className="mb-5 aspect-video w-full rounded-xl overflow-hidden bg-[#181928] border-2 border-white/15 flex items-center justify-center p-4 relative group-hover:border-violet-400 transition-colors shadow-inner">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-center px-4">
              <span className="text-[11px] uppercase tracking-widest font-bold text-violet-400">
                {project.tags?.[0] || "Full-Stack Project"}
              </span>
              <div className="text-sm md:text-base font-extrabold text-white mt-1 line-clamp-1">
                {project.title}
              </div>
            </div>
          )}
        </div>
      )}

      <h3 className="text-xl font-extrabold text-white mb-2.5 group-hover:text-violet-300 transition-colors">
        {project.title}
      </h3>

      <p className="text-sm text-gray-200 leading-relaxed mb-5 flex-1 font-normal">
        {project.description}
      </p>

      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-lg bg-[#181928] text-violet-300 border border-violet-500/30 font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-sm mt-auto">
        <div className="flex items-center gap-2.5">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md shadow-violet-600/30 transition-all cursor-pointer"
            >
              Live Demo
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#181928] border border-white/20 hover:border-white text-gray-200 hover:text-white font-bold text-xs transition-all"
            >
              Source
            </a>
          )}
        </div>
        <Link
          to={`/projects/${project.id}`}
          className="text-xs font-semibold text-gray-400 hover:text-violet-300 transition-colors"
        >
          Details
        </Link>
      </div>
    </motion.article>
  );
}
