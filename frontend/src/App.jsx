import { useState, useEffect, useRef } from "react";

const getStyle = (dark) => `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap');

  :root {
    --bg:        ${dark ? "#0e0f11" : "#f0f2f5"};
    --bg-side:   ${dark ? "#13151a" : "#e5e8ef"};
    --ink:       ${dark ? "#e8eaf0" : "#1a1c22"};
    --ink-soft:  ${dark ? "#7b8099" : "#6b7080"};
    --accent:    ${dark ? "#6c8fff" : "#3b5bdb"};
    --accent2:   ${dark ? "#ff7eb3" : "#c2255c"};
    --divider:   ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)"};
    --border:    ${dark ? "#2a2d38" : "#cdd0da"};
    --input-bg:  ${dark ? "#1a1d26" : "#e8eaf2"};
    --hover:     ${dark ? "rgba(108,143,255,0.08)" : "rgba(59,91,219,0.07)"};
    --active:    ${dark ? "rgba(108,143,255,0.14)" : "rgba(59,91,219,0.12)"};
    --send-fg:   ${dark ? "#0e0f11" : "#f0f2f5"};
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    font-family: 'JetBrains Mono', monospace;
    color: var(--ink);
    overflow: hidden;
    transition: background 0.3s, color 0.3s;
  }

  .app {
    display: flex;
    height: 100vh;
    background: var(--bg);
    transition: background 0.3s;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 256px;
    min-width: 256px;
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    background: var(--bg-side);
    transition: background 0.3s, border-color 0.3s;
  }

  .sidebar-header {
    padding: 24px 20px 16px;
    border-bottom: 1px solid var(--divider);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sidebar-brand {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .sidebar-logo {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.5px;
    line-height: 1;
  }

  .sidebar-logo span {
    color: var(--accent);
    font-style: italic;
  }

  .sidebar-sub {
    font-size: 8px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  /* Theme toggle */
  .theme-btn {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    color: var(--ink-soft);
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .theme-btn:hover {
    background: var(--hover);
    color: var(--ink);
    border-color: var(--accent);
  }

  .new-chat-btn {
    margin: 14px 16px 0;
    padding: 9px 14px;
    background: var(--accent);
    color: var(--send-fg);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: opacity 0.2s, transform 0.1s;
    width: calc(100% - 32px);
    font-weight: 500;
  }

  .new-chat-btn:hover { opacity: 0.88; }
  .new-chat-btn:active { transform: scale(0.98); }
  .new-chat-btn .plus { font-size: 15px; line-height: 1; font-weight: 300; }

  .sessions-label {
    padding: 18px 20px 6px;
    font-size: 8px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  .sessions-list {
    flex: 1;
    overflow-y: auto;
    padding: 0 10px 16px;
  }

  .sessions-list::-webkit-scrollbar { width: 3px; }
  .sessions-list::-webkit-scrollbar-track { background: transparent; }
  .sessions-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

  .session-item {
    padding: 9px 10px;
    cursor: pointer;
    border-radius: 6px;
    margin-bottom: 2px;
    transition: all 0.15s;
  }

  .session-item:hover { background: var(--hover); }
  .session-item.active { background: var(--active); }

  .session-num {
    font-size: 8px;
    letter-spacing: 1px;
    color: var(--accent);
    opacity: 0.6;
    margin-bottom: 2px;
  }

  .session-title {
    font-size: 11px;
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
  }

  .sidebar-footer {
    padding: 14px 20px;
    border-top: 1px solid var(--divider);
    font-size: 9px;
    letter-spacing: 1px;
    color: var(--ink-soft);
    opacity: 0.6;
  }

  /* ── MAIN ── */
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--bg);
    transition: background 0.3s;
  }

  .main-header {
    padding: 18px 36px;
    border-bottom: 1px solid var(--divider);
    display: flex;
    align-items: baseline;
    gap: 14px;
  }

  .main-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 400;
    font-style: italic;
    color: var(--ink);
    line-height: 1;
  }

  .main-title-num {
    font-size: 10px;
    color: var(--ink-soft);
    letter-spacing: 2px;
  }

  .main-date {
    margin-left: auto;
    font-size: 9px;
    letter-spacing: 2px;
    color: var(--ink-soft);
    text-transform: uppercase;
  }

  /* ── MESSAGES ── */
  .messages-area {
    flex: 1;
    overflow-y: auto;
    padding: 28px 36px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .messages-area::-webkit-scrollbar { width: 3px; }
  .messages-area::-webkit-scrollbar-track { background: transparent; }
  .messages-area::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

  .message-row {
    display: flex;
    gap: 18px;
    padding: 16px 0;
    border-bottom: 1px solid var(--divider);
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .message-row:last-child { border-bottom: none; }

  .msg-meta {
    width: 76px;
    min-width: 76px;
    text-align: right;
    padding-top: 2px;
  }

  .msg-role {
    font-size: 8px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 500;
  }

  .msg-role.user      { color: var(--accent2); }
  .msg-role.assistant { color: var(--accent); }

  .msg-divider {
    width: 18px;
    display: flex;
    align-items: flex-start;
    padding-top: 5px;
    justify-content: center;
  }

  .msg-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .msg-dot.user      { background: var(--accent2); }
  .msg-dot.assistant { background: var(--accent); }

  .msg-body { flex: 1; }

  .msg-content {
    font-size: 13px;
    line-height: 1.85;
    color: var(--ink);
    font-weight: 300;
    white-space: pre-wrap;
  }

  /* ── EMPTY STATE ── */
  .empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    opacity: 0.3;
  }

  .empty-ornament {
    font-family: 'Playfair Display', serif;
    font-size: 44px;
    color: var(--accent);
    line-height: 1;
  }

  .empty-text {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  /* ── INPUT AREA ── */
  .input-area {
    border-top: 1px solid var(--border);
    padding: 18px 36px 22px;
    background: var(--bg-side);
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: background 0.3s;
  }

  .input-label {
    font-size: 8px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  .input-row {
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }

  .input-wrapper {
    flex: 1;
    background: var(--input-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 14px;
    transition: border-color 0.2s, background 0.3s;
  }

  .input-wrapper:focus-within {
    border-color: var(--accent);
  }

  textarea {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: var(--ink);
    font-weight: 300;
    resize: none;
    min-height: 22px;
    max-height: 120px;
    line-height: 1.6;
    caret-color: var(--accent);
  }

  textarea::placeholder {
    color: var(--ink-soft);
    opacity: 0.5;
    font-style: italic;
  }

  .send-btn {
    padding: 10px 20px;
    background: var(--accent);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--send-fg);
    font-weight: 500;
    transition: opacity 0.2s, transform 0.1s;
    white-space: nowrap;
    align-self: flex-end;
  }

  .send-btn:hover  { opacity: 0.85; }
  .send-btn:active { transform: scale(0.97); }
  .send-btn:disabled { opacity: 0.25; cursor: default; }

  .input-hint {
    font-size: 8px;
    letter-spacing: 1px;
    color: var(--ink-soft);
    opacity: 0.5;
    text-align: right;
  }

  /* ── NO SESSION ── */
  .no-session {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 14px;
    opacity: 0.4;
  }

  .no-session-text {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-style: italic;
    color: var(--ink-soft);
  }

  .no-session-sub {
    font-size: 9px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--ink-soft);
  }
`;

function App() {
  const [message, setMessage] = useState("");
  const [sessions, setSessions] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { loadSessions(); }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, activeChat]);

  const loadSessions = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/sessions/");
      const data = await res.json();
      const formatted = data.map(s => ({ ...s, messages: [] }));
      setSessions(formatted);
      if (formatted.length > 0) {
        setActiveChat(formatted[0].id);
        loadMessages(formatted[0].id, formatted);
      }
    } catch (e) { console.error(e); }
  };

  const loadMessages = async (sessionId, base) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/messages/${sessionId}`);
      const data = await res.json();
      setSessions(prev =>
        (base || prev).map(s => s.id === sessionId ? { ...s, messages: data } : s)
      );
      setActiveChat(sessionId);
    } catch (e) { console.error(e); }
  };

  const createChat = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/sessions/", { method: "POST" });
      const data = await res.json();
      setSessions(prev => [...prev, { ...data, messages: [] }]);
      setActiveChat(data.id);
    } catch (e) { console.error(e); }
  };

  const sendMessage = async () => {
    if (!message.trim() || loading) return;
    const userMsg = { role: "user", content: message };
    setSessions(prev =>
      prev.map(s => s.id === activeChat ? { ...s, messages: [...s.messages, userMsg] } : s)
    );
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: activeChat, message })
      });
      const data = await res.json();
      setSessions(prev =>
        prev.map(s => s.id === activeChat
          ? { ...s, messages: [...s.messages, { role: "assistant", content: data.response }] }
          : s)
      );
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const currentChat = sessions.find(s => s.id === activeChat);
  const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();

  return (
    <>
      <style>{getStyle(dark)}</style>
      <div className="app">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <div className="sidebar-logo">Tïfëh<span>bot</span></div>
              <div className="sidebar-sub">Correspondence Log</div>
            </div>
            <button
              className="theme-btn"
              onClick={() => setDark(d => !d)}
              title={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>

          <button className="new-chat-btn" onClick={createChat}>
            <span className="plus">+</span> New Thread
          </button>

          <div className="sessions-label">Threads</div>
          <div className="sessions-list">
            {sessions.map((chat, i) => (
              <div
                key={chat.id}
                className={`session-item ${activeChat === chat.id ? "active" : ""}`}
                onClick={() => loadMessages(chat.id)}
              >
                <div className="session-num">#{String(i + 1).padStart(3, "0")}</div>
                <div className="session-title">{chat.title || "Untitled thread"}</div>
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            {sessions.length} thread{sessions.length !== 1 ? "s" : ""} on record
          </div>
        </div>

        {/* MAIN */}
        <div className="main">
          {currentChat ? (
            <>
              <div className="main-header">
                <div className="main-title">{currentChat.title || "New Thread"}</div>
                <span className="main-title-num">
                  {currentChat.messages.length} entr{currentChat.messages.length !== 1 ? "ies" : "y"}
                </span>
                <div className="main-date">{dateStr}</div>
              </div>

              <div className="messages-area">
                {currentChat.messages.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-ornament">❧</div>
                    <div className="empty-text">Begin your correspondence</div>
                  </div>
                ) : (
                  currentChat.messages.map((msg, i) => (
                    <div key={i} className="message-row">
                      <div className="msg-meta">
                        <div className={`msg-role ${msg.role}`}>{msg.role}</div>
                      </div>
                      <div className="msg-divider">
                        <div className={`msg-dot ${msg.role}`} />
                      </div>
                      <div className="msg-body">
                        <div className="msg-content">{msg.content}</div>
                      </div>
                    </div>
                  ))
                )}
                {loading && (
                  <div className="message-row">
                    <div className="msg-meta">
                      <div className="msg-role assistant">assistant</div>
                    </div>
                    <div className="msg-divider">
                      <div className="msg-dot assistant" />
                    </div>
                    <div className="msg-body">
                      <div className="msg-content" style={{ opacity: 0.4, fontStyle: "italic" }}>composing…</div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="input-area">
                <div className="input-label">Your message</div>
                <div className="input-row">
                  <div className="input-wrapper">
                    <textarea
                      ref={textareaRef}
                      value={message}
                      onChange={handleInput}
                      onKeyDown={handleKey}
                      placeholder="Write your message here…"
                      rows={1}
                    />
                  </div>
                  <button className="send-btn" onClick={sendMessage} disabled={!message.trim() || loading}>
                    Dispatch
                  </button>
                </div>
                <div className="input-hint">↵ send · shift+↵ newline</div>
              </div>
            </>
          ) : (
            <div className="no-session">
              <div className="no-session-text">No thread selected</div>
              <div className="no-session-sub">Open a thread from the sidebar</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;