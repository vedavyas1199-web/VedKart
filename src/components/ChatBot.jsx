import { useState, useRef, useEffect } from "react";

const API_BASE = import.meta.env.DEV ? "" : ""; // use Vite proxy in dev

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const abortRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setStreaming(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    const messageList = [...messages, userMessage];

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messageList }),
        signal: (abortRef.current = new AbortController()).signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Error ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.replace(/^data: /, "").trim();
          if (trimmed === "[DONE]" || !trimmed) continue;
          try {
            const json = JSON.parse(trimmed);
            const content = json?.choices?.[0]?.delta?.content;
            if (content) {
              fullContent += content;
              setMessages((prev) => {
                const next = [...prev];
                const last = next[next.length - 1];
                if (last?.role === "assistant") next[next.length - 1] = { ...last, content: fullContent };
                return next;
              });
            }
          } catch (_) {}
        }
      }

      if (fullContent === "") {
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last?.role === "assistant") next[next.length - 1] = { ...last, content: "No response." };
          return next;
        });
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === "assistant") next[next.length - 1] = { ...last, content: `Error: ${err.message}` };
        return next;
      });
    } finally {
      setStreaming(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#2874f0] text-white shadow-lg transition hover:bg-[#1a5bb8] focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:ring-offset-2"
        aria-label="Toggle chat"
      >
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 flex h-[420px] w-[360px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-200 bg-[#2874f0] px-4 py-3 text-white">
            <span className="font-semibold">Ved-Kart Assistant</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 hover:bg-white/20"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 p-3">
            {messages.length === 0 && (
              <p className="text-center text-sm text-gray-500">Ask me anything about products or orders.</p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 ${msg.role === "user" ? "flex justify-end" : "flex justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-[#2874f0] text-white"
                      : "bg-white text-gray-800 shadow border border-gray-100"
                  }`}
                >
                  <span className="whitespace-pre-wrap">{msg.content || (streaming && i === messages.length - 1 ? "…" : "")}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 bg-white p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={streaming}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                className="rounded-xl bg-[#2874f0] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1a5bb8] disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
