export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0f]/50 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <div>
          © {year} Sami.dev (Simachew Alene). Built with React, Node.js & PostgreSQL.
        </div>
        <div className="flex gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-violet-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://t.me/Simexsami"
            target="_blank"
            rel="noreferrer"
            className="hover:text-violet-400 transition-colors"
          >
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
}
