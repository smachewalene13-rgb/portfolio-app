import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/90 border-b-2 border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg sm:text-xl font-extrabold tracking-tight text-white hover:text-violet-300 transition-colors"
        >
          Simachew Alene
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `text-sm font-bold transition-all px-3 py-1.5 rounded-lg ${
                      isActive
                        ? "text-violet-300 bg-violet-500/15 border border-violet-500/30"
                        : "text-gray-300 hover:text-white hover:bg-white/[0.04]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 pl-4 border-l-2 border-white/15">
            {user ? (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `text-xs px-3.5 py-2 rounded-xl border-2 font-bold transition-all ${
                      isActive
                        ? "border-violet-400 bg-violet-600/20 text-violet-300"
                        : "border-white/20 bg-[#181928] text-gray-200 hover:text-white"
                    }`
                  }
                >
                  Admin
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs px-3 py-2 rounded-xl text-gray-300 hover:text-red-300 hover:bg-red-500/20 font-bold transition-all cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/contact"
                className="inline-flex items-center text-xs font-bold px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/30 transition-all hover:scale-105 cursor-pointer"
              >
                Hire Me
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Three-Lines Hamburger Button */}
        <div className="flex items-center gap-3 md:hidden">
          {!user && (
            <Link
              to="/contact"
              className="inline-flex items-center text-xs font-bold px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30"
            >
              Hire Me
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex flex-col justify-center items-center w-10 h-10 rounded-xl border-2 border-white/20 bg-[#181928] hover:border-violet-400 text-white transition-all cursor-pointer focus:outline-none"
          >
            <span
              className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-1.5 bg-violet-400" : "-translate-y-1"
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                isOpen ? "opacity-0" : "opacity-100 my-0.5"
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1.5 bg-violet-400" : "translate-y-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden relative border-b-2 border-white/15 bg-[#10111a]/95 backdrop-blur-2xl px-6 py-6 shadow-2xl shadow-black/95 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />

            <div className="space-y-2">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                      isActive
                        ? "bg-violet-600/25 text-violet-200 border-2 border-violet-400 shadow-md"
                        : "text-gray-200 hover:text-white hover:bg-white/[0.06] border-2 border-transparent"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {user ? (
                <div className="pt-4 border-t-2 border-white/10 space-y-2">
                  <NavLink
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-bold text-gray-200 hover:text-white"
                  >
                    Admin Dashboard
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-red-300 hover:bg-red-500/20"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t-2 border-white/10">
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-violet-600/30"
                  >
                    Hire Me
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}