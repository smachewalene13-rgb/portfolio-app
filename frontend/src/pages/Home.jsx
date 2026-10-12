import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../api/client";
import ProjectCard from "../components/ProjectCard";
import Loader from "../components/Loader";
import PageTransition from "../components/PageTransition";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getProjects()
      .then((projects) =>
        setFeatured(projects.filter((p) => p.featured).slice(0, 3))
      )
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <motion.section
  variants={container}
  initial="hidden"
  animate="show"
  className="max-w-6xl mx-auto px-6 pt-24 pb-16"
>
  <div className="grid md:grid-cols-2 gap-12 items-center">
    {/* Left: text */}
    <div>
      <motion.p
        variants={item}
        className="text-violet-400 text-sm font-medium mb-4 tracking-wider uppercase"
      >
        Full-Stack Developer
      </motion.p>

      <motion.h1
        variants={item}
        className="text-5xl md:text-6xl font-bold leading-tight mb-6"
      >
        Building modern web experiences with{" "}
        <span className="text-violet-400">React</span> &{" "}
        <span className="text-violet-400">Node.js</span>.
      </motion.h1>

      <motion.p
        variants={item}
        className="text-lg text-gray-400 leading-relaxed mb-8"
      >
        I design and develop fast, accessible, and beautiful applications
        that solve real problems.
      </motion.p>

      <motion.div variants={item} className="flex flex-wrap gap-4">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/projects"
            className="inline-block px-6 py-3 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors"
          >
            View My Work
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 rounded-lg border border-white/10 hover:border-violet-500/50 hover:bg-white/5 font-medium transition-colors"
          >
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>
    </div>

    {/* Right: image */}
    <motion.div variants={item} className="relative">
      <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]">
        <img
          src="/hero.jpg"
          alt="Developer at work"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-transparent pointer-events-none" />
      </div>
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-violet-500/10 blur-3xl" />
    </motion.div>
  </div>
</motion.section>

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
            <p className="text-gray-400">A selection of my recent work</p>
          </div>
          <Link
            to="/projects"
            className="text-sm text-violet-400 hover:text-violet-300 transition-colors hidden md:block"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : featured.length === 0 ? (
          <p className="text-gray-500">No featured projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  );
}