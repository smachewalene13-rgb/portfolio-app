import { useEffect, useState } from "react";
import contactApi from "../../api/contactApi";
import Loader from "../../components/common/Loader";
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

  if (loading) return <Loader label="Loading client messages..." />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            Client Inquiries{" "}
            <span className="text-violet-400 font-extrabold">({messages.length})</span>
          </h2>
          <p className="text-sm text-gray-300 font-medium">
            Visitor contact inquiries submitted through your portfolio.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage message={error} />
        </div>
      )}

      {messages.length === 0 ? (
        <p className="text-gray-400 py-8 text-center font-medium">No messages received yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => {
            const isUnread = !(msg.isRead || msg.is_read);
            return (
              <div
                key={msg.id}
                className={`p-6 rounded-2xl border-2 transition-all shadow-lg ${
                  isUnread
                    ? "border-violet-400 bg-[#1c1d30] shadow-violet-900/30"
                    : "border-white/20 bg-[#181928]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="font-extrabold text-white text-base sm:text-lg">
                        {msg.name}
                      </span>
                      {isUnread && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-violet-600 text-white px-3 py-0.5 rounded-full shadow-md shadow-violet-600/40 border border-violet-400">
                          New
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs sm:text-sm text-violet-300 hover:text-white hover:underline font-bold mt-0.5 inline-block"
                    >
                      {msg.email}
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <time className="text-xs text-gray-300 font-medium">
                      {formatDateTime(msg.createdAt || msg.created_at)}
                    </time>
                    <button
                      type="button"
                      onClick={() => handleToggleRead(msg.id, msg.isRead || msg.is_read)}
                      className="px-3.5 py-1.5 rounded-xl border-2 border-white/20 bg-[#13141f] hover:border-white text-gray-200 hover:text-white font-bold text-xs transition-all cursor-pointer"
                    >
                      {msg.isRead || msg.is_read ? "Mark Unread" : "Mark Read"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(msg.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white border-2 border-red-500/40 hover:border-red-400 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {msg.subject && (
                  <div className="text-xs uppercase tracking-wider font-bold text-violet-300 mb-2">
                    Subject: <span className="text-white normal-case font-semibold">{msg.subject}</span>
                  </div>
                )}

                <div className="text-sm text-gray-100 whitespace-pre-wrap leading-relaxed mt-3 bg-[#13141f] p-4 rounded-xl border-2 border-white/10 font-normal shadow-inner">
                  {msg.message || msg.content}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
