import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

const SERVICES = [
  {
    title: "Full-Stack Web Applications",
    subtitle: "End-to-End Delivery",
    description:
      "Crafting responsive, high-performance web products from clean component frontends to scalable backend REST APIs.",
    deliverables: [
      "Custom Single Page Applications (SPA) with React & Vite",
      "Responsive, accessible styling with modern Tailwind CSS",
      "Dynamic data fetching, state management & caching",
      "Complete admin management dashboards with JWT auth",
    ],
    tags: ["React", "Node.js", "Express", "Tailwind CSS", "PostgreSQL"],
  },
  {
    title: "RESTful APIs & Backend Services",
    subtitle: "High-Throughput Systems",
    description:
      "Architecting clean, layered backend services with robust authentication, strict validation, and comprehensive error handling.",
    deliverables: [
      "Layered architecture (Routes, Controllers, Services, Repositories)",
      "Secure JWT authentication, password hashing & cookie sessions",
      "Rate limiting, Helmet security headers, and request sanitization",
      "Versioned API contracts (/api/v1) with automated smoke tests",
    ],
    tags: ["Node.js", "Express.js", "JWT", "Bcrypt", "Security"],
  },
  {
    title: "Database Design & Optimization",
    subtitle: "PostgreSQL Architecture",
    description:
      "Designing relational schemas with strict data integrity, automated migration workflows, and optimized query execution.",
    deliverables: [
      "Relational schema modeling, foreign keys, and constraints",
      "B-tree index optimization for fast queries on hot paths",
      "Node-postgres (pg.Pool) connection pooling with SSL",
      "Repeatable automated database migrations & seeding scripts",
    ],
    tags: ["PostgreSQL", "SQL", "Neon Tech", "Indexing", "pg.Pool"],
  },
  {
    title: "Frontend Modernization & Speed",
    subtitle: "UI/UX & Core Web Vitals",
    description:
      "Refactoring outdated interfaces into modern, lightweight applications that score high on performance and delight users.",
    deliverables: [
      "Sub-second asset bundle optimization & lazy loading",
      "Smooth micro-interactions and animations with Framer Motion",
      "Mobile-first responsive design across all devices and viewports",
      "Code cleanups, component modularity & accessibility standards",
    ],
    tags: ["Vite", "Framer Motion", "Lighthouse", "Accessibility"],
  },
];

const METRICS = [
  { value: "3+", label: "Years Experience" },
  { value: "100%", label: "Responsive & Modern" },
  { value: "99.9%", label: "Uptime Focus" },
  { value: "< 1s", label: "Fast Page Loads" },
];

export default function ServicesSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      {/* Metrics Counter Bar with High Visibility */}
      <div className="relative rounded-3xl border-2 border-white/20 bg-[#13141f] p-6 sm:p-8 shadow-2xl shadow-black/80 mb-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {METRICS.map((metric, i) => (
            <div key={i} className="text-center p-3">
              <div className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 mb-1">
                {metric.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-violet-300 font-bold">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-violet-300 bg-violet-500/15 border-2 border-violet-400/80 px-4 py-1.5 rounded-full inline-block mb-4 shadow-md shadow-violet-500/20">
          Services & Solutions
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          What I Can Build For You
        </h2>
        <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-normal">
          From concept to deployment, I help startups, businesses, and engineering teams build scalable digital products that deliver real business impact.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.title} {...service} index={index} />
        ))}
      </div>
    </section>
  );
}
