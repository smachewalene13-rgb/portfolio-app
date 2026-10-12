import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#0a0a0f]/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-end">
        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-violet-400"
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          <li>
            {user ? (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? "text-violet-400"
                        : "text-gray-400 hover:text-white"
                    }`
                  }
                >
                  Admin
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-violet-400"
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}