import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../api/client";
import ProjectCard from "../components/projects/ProjectCard";
import Loader from "../components/common/Loader";
import ServicesSection from "../components/services/ServicesSection";
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
  const [profile, setProfile] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getProfile().catch(() => null),
      api.getProjects().catch(() => []),
    ])
      .then(([profData, projects]) => {
        if (profData) setProfile(profData);
        if (Array.isArray(projects)) {
          setFeatured(projects.filter((p) => p.featured).slice(0, 3));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      {/* Hero Section */}
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6 pt-24 pb-16"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Headline & Actions */}
          <div>
            <motion.div
              variants={item}
              className="text-xl sm:text-2xl font-bold tracking-wide uppercase text-violet-400 mb-4"
            >
              {profile?.title || "Full-Stack Developer"}
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6"
            >
              Building modern web experiences with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">
                React
              </span>{" "}
              &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
                Node.js
              </span>
              .
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg"
            >
              {profile?.bio ||
                "I design and develop fast, accessible, and beautiful applications that solve real problems."}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 transition-all"
                >
                  View My Work
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3.5 rounded-xl border border-white/10 hover:border-violet-500/50 hover:bg-white/5 text-gray-200 hover:text-white font-semibold text-sm transition-all"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Portrait Image */}
          <motion.div variants={item} className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl">
              <img
                src="/hero.jpg"
                alt="Simachew Alene - Full-Stack Developer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-violet-500/10 blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section ("What I Can Build For You") */}
      <ServicesSection />

      {/* Featured Projects Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20 inline-block mb-3">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Projects</h2>
            <p className="text-gray-400 text-sm">A curated selection of my recent engineering work</p>
          </div>
          <Link
            to="/projects"
            className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors hidden md:inline-flex items-center gap-1"
          >
            View all projects
          </Link>
        </div>

        {loading ? (
          <Loader label="Loading featured projects..." />
        ) : featured.length === 0 ? (
          <p className="text-gray-500 py-8">No featured projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Bottom Call To Action Banner */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-r from-violet-950/40 via-purple-900/20 to-slate-900/60 p-8 md:p-14 text-center shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Have an exciting project or role in mind?
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
              I am currently open to full-time software engineering roles, high-impact freelance projects, and architecture consulting. Let's discuss how we can collaborate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 transition-all hover:scale-105"
              >
                Start a Conversation
              </Link>
              <Link
                to="/projects"
                className="px-8 py-3.5 rounded-xl border border-white/10 hover:border-violet-500/40 hover:bg-white/5 text-gray-300 hover:text-white font-semibold text-sm transition-all"
              >
                Browse All Projects
              </Link>
            </div>
          </div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>
    </PageTransition>
  );
}