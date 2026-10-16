export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
      <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
