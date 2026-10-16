export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3 text-gray-400">
      <div className="w-8 h-8 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}
