import { motion } from "framer-motion";

export default function ServiceCard({
  title,
  subtitle,
  description,
  deliverables,
  tags,
  index = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      className="group relative flex flex-col rounded-3xl border-2 border-white/20 bg-[#13141f] p-7 transition-all duration-300 hover:border-violet-400 hover:-translate-y-1.5 shadow-xl shadow-black/60 overflow-hidden"
    >
      {/* Decorative Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Header / Subtitle */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-violet-300 bg-violet-500/15 border border-violet-500/30 px-3 py-1 rounded-full">
          {subtitle}
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-extrabold text-white mb-2.5 group-hover:text-violet-300 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-200 leading-relaxed mb-6 font-normal">
        {description}
      </p>

      {/* Deliverables Checklist */}
      <div className="space-y-3 mb-6 flex-1">
        <div className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
          Key Deliverables
        </div>
        {deliverables.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200 leading-snug">
            <span className="text-violet-400 font-bold shrink-0 text-base leading-none">•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Tech Badges */}
      <div className="flex flex-wrap gap-2 pt-5 border-t border-white/10 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-lg bg-[#181928] text-gray-200 border border-white/15 font-semibold"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
