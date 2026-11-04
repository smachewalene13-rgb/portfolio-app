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
      <div className="relative overflow-hidden">
        {/* Fixed Cyber Tech Background Image */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform-gpu"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2000&q=80')`,
              opacity: 0.2,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/85 via-[#0a0a0f]/80 to-[#0a0a0f]" />
        </div>

        {/* Subtle Ambient background glows */}
        <div className="absolute top-24 left-1/4 -translate-x-1/2 w-[550px] h-[550px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Hero Section */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Headline & Actions */}
            <div>
              {/* Availability Status Badge */}
              <motion.div variants={item}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border-2 border-emerald-400 text-emerald-300 text-xs font-bold mb-6 shadow-md shadow-emerald-500/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for full-time roles & projects
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="text-xl sm:text-2xl font-bold tracking-wide uppercase text-violet-400 mb-3"
              >
                {profile?.title || "Full-Stack Developer"}
              </motion.div>

              <motion.h1
                variants={item}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white mb-6"
              >
                Building modern web experiences with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300">
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
                className="text-base sm:text-lg text-gray-200 leading-relaxed mb-8 max-w-lg font-normal"
              >
                {profile?.bio ||
                  "I design and develop fast, accessible, and beautiful applications that solve real problems."}
              </motion.p>

              <motion.div variants={item} className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-violet-600/30 transition-all cursor-pointer"
                  >
                    View My Work
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-8 py-4 rounded-xl border-2 border-white/20 bg-[#181928] hover:border-violet-400 hover:bg-violet-600/10 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: Portrait Image with High-Visibility Border */}
            <motion.div variants={item} className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-white/25 bg-[#13141f] shadow-2xl shadow-black/80 hover:border-violet-400 transition-all">
                <img
                  src="/hero.jpg"
                  alt="Simachew Alene - Full-Stack Developer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-violet-500/15 blur-3xl pointer-events-none" />
            </motion.div>
          </div>
        </motion.section>

        {/* Services Section ("What I Can Build For You") */}
        <ServicesSection />

        {/* Featured Projects Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-violet-300 bg-violet-500/15 border-2 border-violet-400/80 px-4 py-1.5 rounded-full inline-block mb-3 shadow-md shadow-violet-500/20">
                Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
                Featured Projects
              </h2>
              <p className="text-gray-200 text-sm sm:text-base font-normal">
                A curated selection of my recent full-stack engineering work
              </p>
            </div>
            <Link
              to="/projects"
              className="text-xs font-bold text-violet-300 hover:text-white bg-[#181928] border-2 border-white/20 hover:border-violet-400 px-5 py-2.5 rounded-xl transition-all inline-flex items-center gap-1 self-start sm:self-auto shadow-md"
            >
              View all projects
            </Link>
          </div>

          {loading ? (
            <Loader label="Loading featured projects..." />
          ) : featured.length === 0 ? (
            <p className="text-gray-400 py-8 text-center">No featured projects yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* Bottom Call To Action Banner */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="relative overflow-hidden rounded-3xl border-2 border-white/20 bg-[#13141f] p-8 md:p-14 text-center shadow-2xl shadow-black/90">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
            <div className="max-w-2xl mx-auto relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Have an exciting project or role in mind?
              </h2>
              <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-8 font-normal">
                I am currently open to full-time software engineering roles, high-impact freelance projects, and architecture consulting. Let's discuss how we can collaborate.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-violet-600/30 transition-all hover:scale-105"
                >
                  Start a Conversation
                </Link>
                <Link
                  to="/projects"
                  className="px-8 py-4 rounded-xl border-2 border-white/20 bg-[#181928] hover:border-violet-400 hover:bg-violet-600/10 text-white font-bold text-sm shadow-md transition-all"
                >
                  Browse All Projects
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}