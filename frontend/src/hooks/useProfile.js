import { useState, useEffect } from "react";
import profileApi from "../api/profileApi";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await profileApi.getProfile();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (data) => {
    const updated = await profileApi.updateProfile(data);
    setProfile(updated);
    return updated;
  };

  return { profile, loading, error, refreshProfile: fetchProfile, updateProfile };
}

export default useProfile;
