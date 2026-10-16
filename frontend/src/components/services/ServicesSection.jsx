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
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Metrics Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm mb-16 shadow-xl shadow-black/20">
        {METRICS.map((metric, i) => (
          <div key={i} className="text-center p-3">
            <div className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300 mb-1">
              {metric.value}
            </div>
            <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20 inline-block mb-3">
          Services & Solutions
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          What I Can Build For You
        </h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          From concept to deployment, I help startups, businesses, and engineering teams build scalable digital products that deliver real business impact.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.title} {...service} index={index} />
        ))}
      </div>
    </section>
  );
}
