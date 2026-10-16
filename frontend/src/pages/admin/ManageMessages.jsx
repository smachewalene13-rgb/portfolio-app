import { useEffect, useState } from "react";
import contactApi from "../../api/contactApi";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";
import { formatDateTime } from "../../utils/formatDate";

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await contactApi.getMessages();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await contactApi.deleteMessage(id);
      await loadMessages();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleRead = async (id, currentRead) => {
    try {
      await contactApi.markAsRead(id, !currentRead);
      await loadMessages();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loader label="Loading messages..." />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            Messages <span className="text-gray-500 font-normal">({messages.length})</span>
          </h2>
          <p className="text-sm text-gray-400">Visitor contact inquiries and messages.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {messages.length === 0 ? (
        <p className="text-gray-500">No messages received yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-xl border transition-all ${
                msg.isRead || msg.is_read
                  ? "border-white/5 bg-white/[0.01]"
                  : "border-violet-500/30 bg-violet-500/[0.03]"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{msg.name}</span>
                    {!(msg.isRead || msg.is_read) && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-500 text-white px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-xs text-violet-400 hover:underline"
                  >
                    {msg.email}
                  </a>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <time className="text-xs text-gray-500">
                    {formatDateTime(msg.createdAt || msg.created_at)}
                  </time>
                  <Button
                    variant="outline"
                    className="py-1 px-2.5 text-xs"
                    onClick={() => handleToggleRead(msg.id, msg.isRead || msg.is_read)}
                  >
                    {msg.isRead || msg.is_read ? "Mark Unread" : "Mark Read"}
                  </Button>
                  <Button
                    variant="danger"
                    className="py-1 px-2.5 text-xs"
                    onClick={() => handleDelete(msg.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              {msg.subject && (
                <div className="text-xs font-medium text-gray-300 mb-1">
                  Subject: <span className="text-white">{msg.subject}</span>
                </div>
              )}

              <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed mt-2 bg-black/20 p-3 rounded-lg border border-white/5">
                {msg.message || msg.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
