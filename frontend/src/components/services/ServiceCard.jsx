import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
      className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:border-violet-500/50 hover:bg-white/[0.04] hover:-translate-y-1.5 shadow-lg shadow-black/20"
    >
      {/* Header / Subtitle */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
          {subtitle}
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-violet-300 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed mb-6">
        {description}
      </p>

      {/* Deliverables Checklist */}
      <div className="space-y-2.5 mb-6 flex-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
          What You Get
        </div>
        {deliverables.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 leading-snug">
            <span className="text-violet-400 font-semibold shrink-0">-</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Tech Badges */}
      <div className="flex flex-wrap gap-1.5 pt-5 border-t border-white/5 mb-5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/[0.04] text-gray-400 border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Link */}
      <Link
        to="/contact"
        className="inline-flex items-center justify-center w-full py-2.5 rounded-lg border border-violet-500/30 bg-violet-500/5 hover:bg-violet-500 hover:text-white text-xs font-semibold text-violet-300 transition-all text-center group-hover:shadow-md group-hover:shadow-violet-500/20"
      >
        Inquire About This Service
      </Link>
    </motion.div>
  );
}
