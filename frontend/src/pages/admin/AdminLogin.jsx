import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PageTransition from "../../components/PageTransition";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";

export default function AdminLogin() {
  const [email, setEmail] = useState("smachewalene13@gmail.com");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-md mx-auto px-6 py-24">
        <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Admin Sign In</h1>
            <p className="text-sm text-gray-400">
              Sign in to manage your portfolio content.
            </p>
          </div>

          {error && (
            <div className="mb-6">
              <ErrorMessage message={error} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="smachewalene13@gmail.com"
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none transition-colors text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 focus:border-violet-500 focus:outline-none transition-colors text-white text-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full"
            >
              {submitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
