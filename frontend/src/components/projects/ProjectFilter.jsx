export default function ProjectFilter({ tags, activeFilter, onSelectFilter }) {
  return (
    <div className="flex flex-wrap gap-2.5 mb-12">
      {tags.map((tag) => {
        const isActive = activeFilter === tag;
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onSelectFilter(tag)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-2 ${
              isActive
                ? "bg-violet-600 border-violet-400 text-white shadow-lg shadow-violet-600/30 scale-105"
                : "bg-[#181928] border-white/20 text-gray-200 hover:border-violet-400 hover:text-white hover:bg-violet-600/10"
            }`}
          >
            {tag === "all" ? "All Projects" : tag}
          </button>
        );
      })}
    </div>
  );
}
