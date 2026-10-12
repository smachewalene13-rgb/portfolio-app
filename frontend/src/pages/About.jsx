import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api/client";
import Loader from "../components/Loader";
import PageTransition from "../components/PageTransition";

export default function About() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getSkills()
      .then(setSkills)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Group skills by category
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>
            Hi, I'm{" "}
            <span className="text-violet-400 font-medium">Simachew Alene</span> — a
            full-stack developer passionate about building delightful web
            applications. I specialize in React, Node.js, and PostgreSQL, and I
            care deeply about clean code, accessibility, and performance.
          </p>
          <p>
            When I'm not coding, you can find me reading, hiking, or exploring
            new technologies.
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Skills</h2>

        {loading && <Loader label="Loading skills..." />}
        {error && <p className="text-red-400">Error: {error}</p>}

        {!loading && !error && skills.length === 0 && (
          <p className="text-gray-500">No skills added yet.</p>
        )}

        {!loading && !error && skills.length > 0 && (
          <div className="space-y-10">
            {Object.entries(grouped).map(([category, list]) => (
              <div key={category}>
                <h3 className="text-sm uppercase tracking-wider text-violet-400 font-medium mb-4">
                  {category}
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {list.map((skill, i) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.05,
                        ease: "easeOut",
                      }}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-xs text-violet-400">
                          {skill.level}/5
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(skill.level / 5) * 100}%` }}
                          transition={{
                            duration: 0.9,
                            ease: "easeOut",
                            delay: 0.3,
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
        )}
      </div>
    </PageTransition>
  );
}