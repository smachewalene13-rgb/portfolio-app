import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#0a0a0f]/85 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-white hover:text-violet-300 transition-colors"
        >
          Simachew Alene
        </Link>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-5 sm:gap-6">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? "text-violet-400 font-semibold"
                        : "text-gray-400 hover:text-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 pl-3 border-l border-white/10">
            {user ? (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                      isActive
                        ? "border-violet-500 bg-violet-500/10 text-violet-400"
                        : "border-white/10 text-gray-300 hover:text-white hover:border-violet-500/40"
                    }`
                  }
                >
                  Admin
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-xs px-2.5 py-1.5 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center text-xs font-semibold px-4 py-1.5 rounded-full bg-violet-500 hover:bg-violet-600 text-white shadow-md shadow-violet-500/20 transition-all hover:scale-105"
              >
                Hire Me
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
