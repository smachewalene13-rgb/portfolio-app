import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import projectsApi from "../api/projectsApi";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import PageTransition from "../components/PageTransition";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    projectsApi
      .getProject(id)
      .then(setProject)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <PageTransition>
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <Loader label="Loading project details..." />
        </div>
      </PageTransition>
    );
  }

  if (error || !project) {
    return (
      <PageTransition>
        <div className="max-w-4xl mx-auto px-6 py-24 space-y-4">
          <ErrorMessage message={error || "Project not found"} />
          <Link
            to="/projects"
            className="inline-block text-violet-400 hover:text-violet-300 text-sm"
          >
            Back to all projects
          </Link>
        </div>
      </PageTransition>
    );
  }

  const imageUrl = project.imageUrl || project.image_url;
  const liveUrl = project.liveUrl || project.live_url;
  const repoUrl = project.repoUrl || project.repo_url;

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors"
        >
          Back to Projects
        </Link>

        {imageUrl && (
          <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 border border-white/10 bg-white/[0.02]">
            <img
              src={imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {project.title}
          </h1>

          <div className="flex gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-medium text-sm transition-colors"
              >
                Live Demo
              </a>
            )}
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg border border-white/10 hover:border-violet-500/50 hover:bg-white/5 text-gray-300 hover:text-white text-sm transition-colors"
              >
                GitHub Repo
              </a>
            )}
          </div>
        </div>

        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-base whitespace-pre-wrap">
          {project.description}
        </div>
      </div>
    </PageTransition>
  );
}
