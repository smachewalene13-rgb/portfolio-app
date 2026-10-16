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
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Bio & Intro */}
        <section>
          <h1 className="text-4xl font-bold mb-6">About Me</h1>

          <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
            <p>
              Hi, I'm{" "}
              <span className="text-violet-400 font-medium">
                {profile?.name || "Simachew Alene"}
              </span>{" "}
              — a {profile?.title?.toLowerCase() || "full-stack developer"} passionate about building delightful, high-performance web applications.
            </p>
            <p>
              {profile?.about_details ||
                profile?.bio ||
                "I specialize in React, Node.js, and PostgreSQL, and I care deeply about clean code, accessibility, and modern architectures."}
            </p>
            {profile?.location && (
              <p className="text-sm text-gray-400 flex items-center gap-2 pt-2">
                <span>Based in {profile.location}</span>
                {profile.resume_url && (
                  <>
                    <span>•</span>
                    <a
                      href={profile.resume_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-violet-400 hover:text-violet-300 underline underline-offset-4"
                    >
                      Download Resume
                    </a>
                  </>
                )}
              </p>
            )}
          </div>
        </section>

        {/* Experience Section */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">
              Work Experience
            </h2>
            <div className="space-y-8 border-l border-white/10 pl-6 ml-2">
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-violet-500 border-2 border-gray-950"></span>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white">
                      {exp.title}{" "}
                      <span className="text-violet-400 font-normal">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                      {exp.start_date} – {exp.current ? "Present" : exp.end_date}
                    </span>
                  </div>
                  {exp.location && (
                    <p className="text-xs text-gray-500 mb-3">{exp.location}</p>
                  )}
                  {exp.description && (
                    <p className="text-sm text-gray-300 leading-relaxed mb-3">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements?.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-400">
                      {exp.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">
              Education
            </h2>
            <div className="space-y-8 border-l border-white/10 pl-6 ml-2">
              {education.map((edu) => (
                <div key={edu.id} className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-violet-500 border-2 border-gray-950"></span>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-white">
                      {edu.qualification} in {edu.field_of_study}
                    </h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                      {edu.start_date} – {edu.end_date || "Present"}
                    </span>
                  </div>
                  <p className="text-xs text-violet-400 mb-2">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {Object.keys(grouped).length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">
              Technical Skills
            </h2>
            <div className="space-y-10">
              {Object.entries(grouped).map(([category, list]) => (
                <div key={category}>
                  <h3 className="text-xs uppercase tracking-wider text-violet-400 font-medium mb-4">
                    {category}
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                        className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium text-sm">{skill.name}</span>
                          <span className="text-xs text-violet-400">
                            {skill.level}/5
                          </span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(skill.level / 5) * 100}%` }}
                            transition={{
                              duration: 0.8,
                              ease: "easeOut",
                              delay: 0.2,
                            }}
                            className="h-full bg-violet-500 rounded-full"
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
    </PageTransition>
  );
}