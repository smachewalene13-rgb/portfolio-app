import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f] text-gray-100 relative">
      {/* Fixed Cyber Tech Background Image (Homepage) */}
      {isHome && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-45 transform-gpu transition-opacity duration-700"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2000&q=80')`,
            }}
          />
          {/* Subtle vignette overlay preserving crisp readability */}
          <div className="fixed-bg-overlay absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/80 via-[#0a0a0f]/60 to-[#0a0a0f]/85 transition-colors duration-500" />
        </div>
      )}

      <Navbar />
      <main className="flex-1 pt-16 relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
