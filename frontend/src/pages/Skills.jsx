import { useEffect, useState } from "react";
import skillsApi from "../api/skillsApi";
import SkillCard from "../components/skills/SkillCard";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import SectionTitle from "../components/common/SectionTitle";
import PageTransition from "../components/PageTransition";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    skillsApi
      .getSkills()
      .then(setSkills)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <SectionTitle
          title="Skills & Expertise"
          subtitle="A comprehensive overview of my technical abilities and proficiencies."
        />

        {loading && <Loader label="Loading technical skills..." />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && Object.keys(grouped).length === 0 && (
          <p className="text-gray-500">No skills added yet.</p>
        )}

        {!loading && !error && (
          <div className="space-y-12">
            {Object.entries(grouped).map(([category, list]) => (
              <div key={category}>
                <h3 className="text-xs uppercase tracking-wider text-violet-400 font-semibold mb-4">
                  {category}
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {list.map((skill, i) => (
                    <SkillCard key={skill.id} skill={skill} index={i} />
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
