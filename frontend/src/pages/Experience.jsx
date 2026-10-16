import { useEffect, useState } from "react";
import experienceApi from "../api/experienceApi";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import SectionTitle from "../components/common/SectionTitle";
import PageTransition from "../components/PageTransition";

export default function Experience() {
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      experienceApi.getExperience().catch(() => []),
      experienceApi.getEducation().catch(() => []),
    ])
      .then(([expData, eduData]) => {
        if (Array.isArray(expData)) setExperience(expData);
        if (Array.isArray(eduData)) setEducation(eduData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        <div>
          <SectionTitle
            title="Experience & Journey"
            subtitle="My professional work history and educational milestones."
          />

          {loading && <Loader label="Loading career history..." />}
          {error && <ErrorMessage message={error} />}

          {!loading && !error && experience.length === 0 && (
            <p className="text-gray-500">No experience records available.</p>
          )}

          {!loading && !error && experience.length > 0 && (
            <div className="space-y-8 border-l border-white/10 pl-6 ml-2">
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-violet-500 border-2 border-gray-950" />
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
          )}
        </div>

        {/* Education */}
        {!loading && education.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
              Academic Background
            </h3>
            <div className="space-y-8 border-l border-white/10 pl-6 ml-2">
              {education.map((edu) => (
                <div key={edu.id} className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-violet-500 border-2 border-gray-950" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h4 className="text-lg font-semibold text-white">
                      {edu.qualification} in {edu.field_of_study}
                    </h4>
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
          </div>
        )}
      </div>
    </PageTransition>
  );
}
