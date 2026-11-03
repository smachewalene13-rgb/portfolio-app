export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Simachew Alene. Built with React & Node.js.
        </p>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-violet-400 transition-colors">
            GitHub
          </a>
          <a href="https://t.me/Simexsami" target="_blank" rel="noreferrer" className="hover:text-violet-400 transition-colors">
            Telegram
          </a>
          <a href="mailto:smachewalene13@gmail.com" className="hover:text-violet-400 transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}