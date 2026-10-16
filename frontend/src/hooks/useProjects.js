import { useState, useEffect } from "react";
import projectsApi from "../api/projectsApi";

export function useProjects(options = {}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (options.featured) queryParams.append("featured", "true");
      if (options.published !== undefined) queryParams.append("published", String(options.published));

      const data = await projectsApi.getProjects(queryParams.toString());
      setProjects(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [options.featured, options.published]);

  return { projects, loading, error, refreshProjects: fetchProjects };
}

export default useProjects;
