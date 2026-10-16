export default function SectionTitle({ title, subtitle, className = "" }) {
  return (
    <div className={`mb-10 ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
        {title}
      </h2>
      {subtitle && <p className="text-gray-400 text-sm md:text-base">{subtitle}</p>}
    </div>
  );
}
