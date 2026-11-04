import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api/client";
import Loader from "../components/Loader";
import PageTransition from "../components/PageTransition";

export default function About() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      api.getProfile().catch(() => null),
      api.getSkills().catch(() => []),
      api.getExperience().catch(() => []),
      api.getEducation().catch(() => []),
    ])
      .then(([profData, skillsData, expData, eduData]) => {
        if (profData) setProfile(profData);
        if (Array.isArray(skillsData)) setSkills(skillsData);
        if (Array.isArray(expData)) setExperience(expData);
        if (Array.isArray(eduData)) setEducation(eduData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Group skills by category
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  if (loading) {
    return (
      <PageTransition>
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <Loader label="Loading about details..." />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="relative overflow-hidden min-h-[calc(100vh-80px)]">
        {/* Subtle Ambient background glows */}
        <div className="absolute top-24 left-1/4 -translate-x-1/2 w-[550px] h-[550px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-2/3 right-10 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-16">
          {/* Bio & Intro Card with High Visibility */}
          <section className="relative rounded-3xl border-2 border-white/20 bg-[#13141f] p-8 sm:p-12 shadow-2xl shadow-black/90 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border-2 border-emerald-400 text-emerald-300 text-xs font-bold mb-6 shadow-md shadow-emerald-500/20">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for full-time roles & projects
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              About Me
            </h1>

            <div className="space-y-5 text-gray-200 leading-relaxed text-base sm:text-lg font-normal">
              <p>
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300 font-extrabold">
                  {profile?.name || "Simachew Alene"}
                </span>{" "}
                — a {profile?.title?.toLowerCase() || "full-stack developer"} passionate about building delightful, high-performance web applications that solve real-world problems.
              </p>
              <p>
                {profile?.about_details ||
                  profile?.bio ||
                  "I specialize in React, Node.js, Express, and PostgreSQL, focusing on clean layered architectures, resilient database designs, and intuitive, accessible user interfaces."}
              </p>
              {profile?.location && (
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 text-xs sm:text-sm text-gray-300 font-medium">
                  <span className="px-3.5 py-1.5 rounded-lg bg-[#181928] border border-white/15 text-white font-semibold">
                    Location: {profile.location}
                  </span>
                  {profile.resume_url && (
                    <a
                      href={profile.resume_url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all shadow-md shadow-violet-600/30"
                    >
                      Download Resume
                    </a>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Work Experience Section with High Visibility Cards */}
          {experience.length > 0 && (
            <section>
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-violet-300 bg-violet-500/15 border-2 border-violet-400/80 px-4 py-1.5 rounded-full inline-block mb-3 shadow-md shadow-violet-500/20">
                  Career History
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Work Experience
                </h2>
              </div>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="relative rounded-2xl border-2 border-white/20 bg-[#13141f] p-6 sm:p-8 shadow-xl shadow-black/70 hover:border-violet-400 transition-all overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-xl font-extrabold text-white">
                          {exp.title}
                        </h3>
                        <div className="text-sm font-bold text-violet-400 mt-0.5">
                          {exp.company}
                        </div>
                      </div>
                      <span className="px-3.5 py-1.5 rounded-full bg-violet-600/20 border-2 border-violet-400/60 text-xs font-bold text-violet-200 self-start sm:self-auto shadow-sm">
                        {exp.start_date} – {exp.current ? "Present" : exp.end_date}
                      </span>
                    </div>

                    {exp.location && (
                      <p className="text-xs text-gray-400 font-medium mb-3">
                        {exp.location}
                      </p>
                    )}

                    {exp.description && (
                      <p className="text-sm text-gray-200 leading-relaxed mb-4 font-normal">
                        {exp.description}
                      </p>
                    )}

                    {exp.achievements?.length > 0 && (
                      <div className="space-y-2 pt-3 border-t border-white/10">
                        {exp.achievements.map((ach, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                            <span className="text-violet-400 font-bold shrink-0">•</span>
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <section>
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-violet-300 bg-violet-500/15 border-2 border-violet-400/80 px-4 py-1.5 rounded-full inline-block mb-3 shadow-md shadow-violet-500/20">
                  Academic Background
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Education & Credentials
                </h2>
              </div>

              <div className="space-y-6">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="rounded-2xl border-2 border-white/20 bg-[#13141f] p-6 sm:p-8 shadow-xl shadow-black/70 hover:border-violet-400 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <h3 className="text-xl font-extrabold text-white">
                        {edu.qualification} in {edu.field_of_study}
                      </h3>
                      <span className="px-3.5 py-1.5 rounded-full bg-[#181928] border-2 border-white/20 text-xs font-bold text-gray-200 self-start sm:self-auto">
                        {edu.start_date} – {edu.end_date || "Present"}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-violet-400 mb-3">{edu.institution}</p>
                    {edu.description && (
                      <p className="text-sm text-gray-200 leading-relaxed font-normal">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technical Skills Section */}
          {Object.keys(grouped).length > 0 && (
            <section>
              <div className="mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-violet-300 bg-violet-500/15 border-2 border-violet-400/80 px-4 py-1.5 rounded-full inline-block mb-3 shadow-md shadow-violet-500/20">
                  Core Competencies
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Technical Skills
                </h2>
              </div>

              <div className="space-y-10">
                {Object.entries(grouped).map(([category, list]) => (
                  <div key={category}>
                    <h3 className="text-xs uppercase tracking-wider text-violet-300 font-extrabold mb-4 block">
                      {category}
                    </h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                      {list.map((skill, i) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{
                            duration: 0.35,
                            delay: i * 0.04,
                            ease: "easeOut",
                          }}
                          className="rounded-2xl border-2 border-white/20 bg-[#13141f] p-5 shadow-lg hover:border-violet-400 hover:-translate-y-1 transition-all"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-white text-sm">{skill.name}</span>
                            <span className="text-xs font-bold text-violet-300 bg-violet-500/20 px-2.5 py-0.5 rounded-md border border-violet-500/30">
                              {skill.level}/5
                            </span>
                          </div>
                          <div className="h-2 bg-[#181928] rounded-full overflow-hidden border border-white/10">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(skill.level / 5) * 100}%` }}
                              transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                delay: 0.2,
                              }}
                              className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </PageTransition>
  );
}