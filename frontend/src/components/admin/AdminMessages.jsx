import { useEffect, useState } from "react";
import { api } from "../../api/client";
import Loader from "../Loader";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getMessages();
      setMessages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    try {
      await api.deleteMessage(id);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loader label="Loading messages..." />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Messages <span className="text-gray-500">({messages.length})</span>
        </h2>
      </div>

      {error && (
        <p className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </p>
      )}

      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-4 rounded-lg border border-white/10 bg-white/[0.02]"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="min-w-0">
                  <div className="font-medium">{msg.name}</div>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    {msg.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <time className="text-xs text-gray-500">
                    {new Date(msg.createdAt).toLocaleString()}
                  </time>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="px-2.5 py-1 rounded text-xs border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {msg.subject && (
                <div className="text-sm text-gray-300 font-medium mb-1">
                  Subject: {msg.subject}
                </div>
              )}
              <p className="text-sm text-gray-400 whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}