export default function ProjectFilter({ tags, activeFilter, onSelectFilter }) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelectFilter(tag)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
            activeFilter === tag
              ? "bg-violet-500 border-violet-500 text-white shadow-lg shadow-violet-500/25"
              : "border-white/10 text-gray-400 hover:border-violet-500/50 hover:text-white bg-white/[0.02]"
          }`}
        >
          {tag === "all" ? "All Projects" : tag}
        </button>
      ))}
    </div>
  );
}
