import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectCard({ project, index = 0 }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageUrl = project.imageUrl || project.image_url;
  const liveUrl = project.liveUrl || project.live_url;
  const repoUrl = project.repoUrl || project.repo_url;

  // Extract the first full sentence ending with dot (.)
  const getFirstSentence = (text) => {
    if (!text) return "";
    const match = text.match(/^.*?\./);
    return match ? match[0] : text;
  };

  const firstSentence = getFirstSentence(project.description);

  return (
    <>
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

        {/* Project Image: Clicking opens the detailed description modal */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          title={`Click to view full description for ${project.title}`}
          className="mb-5 aspect-video w-full rounded-xl overflow-hidden bg-[#181928] border-2 border-white/15 flex items-center justify-center relative group-hover:border-violet-400/80 transition-all cursor-pointer block shadow-inner text-left focus:outline-none focus:border-violet-400"
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

          {/* Hover Overlay indicating click to view details */}
          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3.5 py-1.5 rounded-xl bg-violet-600/90 text-white text-xs font-extrabold shadow-lg backdrop-blur-xs tracking-wide">
              View Full Details
            </span>
          </div>
        </button>

        <h3 className="text-xl font-extrabold text-white mb-2.5 group-hover:text-violet-300 transition-colors">
          {project.title}
        </h3>

        {/* First sentence ending with dot (.) */}
        <p className="text-sm text-gray-200 leading-relaxed mb-5 flex-1 font-normal">
          {firstSentence}
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
            {/* Live Demo button: redirects directly to the live project page */}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                title={`Open ${project.title} Live Demo`}
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
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-bold text-gray-300 hover:text-violet-300 transition-colors cursor-pointer"
          >
            Details
          </button>
        </div>
      </motion.article>

      {/* High-Visibility Detailed Description Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-slate-600 bg-slate-900/95 p-6 sm:p-8 shadow-2xl shadow-black/90 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 border-2 border-slate-600 text-slate-300 hover:text-white hover:border-violet-400 flex items-center justify-center transition-all cursor-pointer text-sm font-bold"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Modal Image */}
              {imageUrl && (
                <div className="aspect-video w-full rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 mb-6 shadow-inner">
                  <img
                    src={imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Tags */}
              {project.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-lg bg-slate-800 text-violet-300 border border-violet-500/30 font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Project Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {project.title}
              </h2>

              {/* Full Detailed Description */}
              <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed font-normal mb-8 border-t border-slate-800 pt-4">
                <p className="whitespace-pre-line">{project.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <div className="flex flex-wrap items-center gap-3">
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
                    >
                      Live Demo
                    </a>
                  )}
                  {repoUrl && (
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 rounded-xl bg-slate-800 border-2 border-slate-600 hover:border-white text-white font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      GitHub Source
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
