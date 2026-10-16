import { motion } from "framer-motion";

export default function SkillCard({ skill, index = 0 }) {
  const levelPercentage = (skill.level / 5) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: "easeOut",
      }}
      className="rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:border-violet-500/30 transition-colors"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-sm text-gray-200">{skill.name}</span>
        <span className="text-xs text-violet-400 font-mono">
          {skill.level}/5
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${levelPercentage}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
          }}
          className="h-full bg-violet-500 rounded-full shadow-sm shadow-violet-500/50"
        />
      </div>
    </motion.div>
  );
}
