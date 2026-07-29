import { useState, useRef, useEffect, useCallback } from "react";
import { API_URL } from "../../proxy";

// ─── Shared helpers ───────────────────────────────────────────────────────────

const parseEmailBody = (message) => {
  if (!message || !message.body) return "";

  const cidMap = {};
  if (message.attachments) {
    message.attachments.forEach((att) => {
      if (att.metadata?.cid) {
        cidMap[att.metadata.cid] = att.id;
      }
    });
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(message.body, "text/html");

  doc.querySelectorAll("img").forEach((img) => {
    const frontCid = img.getAttribute("front-cid");
    const srcCid = img.getAttribute("src")?.replace(/^cid:/, "");
    const cid = frontCid || srcCid;

    if (cid && cidMap[cid]) {
      img.src = `${API_URL}/api/attachments/${cidMap[cid]}`;
    }
  });

  return doc.body.innerHTML;
};

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    weekday: "short", month: "short", day: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
  });
};

const initials = (name = "", email = "") => {
  const src = name || email;
  return src.slice(0, 2).toUpperCase();
};

const avatarColor = (str = "") => {
  const colors = [
    "bg-blue-100 text-blue-700", "bg-purple-100 text-purple-700",
    "bg-green-100 text-green-700", "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",  "bg-teal-100 text-teal-700",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

// ─── Tiny icon wrapper ────────────────────────────────────────────────────────

const Ico = ({ d, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    {(Array.isArray(d) ? d : [d]).map((p, i) => <path key={i} d={p} />)}
  </svg>
);

const I = {
  reply:    ["M9 17 4 12l5-5", "M20 18v-2a4 4 0 0 0-4-4H4"],
  replyAll: ["M7 17 2 12l5-5", "M12 17 7 12l5-5", "M22 18v-2a4 4 0 0 0-4-4H7"],
  forward:  ["M15 17l5-5-5-5", "M4 18v-2a4 4 0 0 0 4-4h9"],
  close:    ["M18 6 6 18", "m6 6 12 12"],
  x:        ["M18 6 6 18", "m6 6 12 12"],
  expand:   ["M8 3H5a2 2 0 0 0-2 2v3","M21 8V5a2 2 0 0 0-2-2h-3","M3 16v3a2 2 0 0 0 2 2h3","M16 21h3a2 2 0 0 0 2-2v-3"],
  minimize: "M5 12h14",
  send:     ["M22 2 11 13", "M22 2 15 22 11 13 2 9l20-7z"],
  attach:   "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48",
  link:     ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71","M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
  emoji:    ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z","M8 14s1.5 2 4 2 4-2 4-2","M9 9h.01","M15 9h.01"],
  more:     "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
  trash:    ["M3 6h18","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"],
  bold:     ["M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z","M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"],
  italic:   ["M19 4h-9","M14 20H5","M15 4 9 20"],
  underline:["M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3","M4 21h16"],
  list:     ["M8 6h13","M8 12h13","M8 18h13","M3 6h.01","M3 12h.01","M3 18h.01"],
  undo:     ["M3 7v6h6","M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"],
  redo:     ["M21 7v6h-6","M3 17a9 9 0 0 0 9-9 9 9 0 0 0 6 2.3L21 13"],
  chevDown: "M6 9l6 6 6-6",
  nav:      ["M15 18l-6-6 6-6"],
  navR:     ["M9 18l6-6-6-6"],
  star:     "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  label:    ["M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z","M7 7h.01"],
  archive:  ["M21 8v13H3V8","M1 3h22v5H1z","M10 12h4"],
  print:    ["M6 9V2h12v7","M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2","M6 14h12v8H6z"],
  spinner:  "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
};

// ─── RecipientChip ────────────────────────────────────────────────────────────

const RecipientChip = ({ label, email, onRemove, hasError }) => (
  <span title={email} className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium max-w-[180px] ${hasError ? "bg-red-100 text-red-700 ring-1 ring-red-300" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} transition-colors`}>
    <span className="truncate">{label || email}</span>
    <button type="button" onClick={onRemove} className="shrink-0 rounded-full hover:bg-gray-300 p-0.5 transition-colors" aria-label={`Remove ${label || email}`}>
      <Ico d={I.x} size={10} />
    </button>
  </span>
);

// ─── RecipientField ───────────────────────────────────────────────────────────

const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

const RecipientField = ({ label, recipients, onAdd, onRemove }) => {
  const [val, setVal] = useState("");
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  const commit = (raw) => {
    const v = raw.trim().replace(/,$/, "");
    if (!v) return;
    const match = v.match(/^(.+?)\s*<([^>]+)>$/);
    const email = match ? match[2].trim() : v;
    const name  = match ? match[1].trim() : "";
    onAdd({ email, name, error: !isValidEmail(email) });
    setVal("");
  };

  return (
    <div className={`flex flex-wrap items-center gap-1.5 px-3 py-2 border-b border-gray-100 min-h-[38px] cursor-text transition-colors ${focused ? "bg-blue-50/20" : ""}`} onClick={() => ref.current?.focus()}>
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest w-6 shrink-0">{label}</span>
      {recipients.map((r, i) => (
        <RecipientChip key={i} label={r.name} email={r.email} hasError={r.error} onRemove={() => onRemove(i)} />
      ))}
      <input
        ref={ref} type="text" value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => { if (["Enter","Tab",","].includes(e.key)) { e.preventDefault(); commit(val); } if (e.key === "Backspace" && !val && recipients.length) onRemove(recipients.length - 1); }}
        onBlur={() => { setFocused(false); commit(val); }}
        onFocus={() => setFocused(true)}
        placeholder={recipients.length === 0 ? "Add recipients" : ""}
        className="flex-1 min-w-[100px] bg-transparent outline-none text-xs text-gray-700 placeholder:text-gray-400"
      />
    </div>
  );
};

// ─── Mini Rich Text Editor ────────────────────────────────────────────────────

const MiniEditor = ({ value, onChange, placeholder = "Write a reply…", minHeight = 120 }) => {
  const ref = useRef(null);

  const exec = (cmd, val = null) => { ref.current?.focus(); document.execCommand(cmd, false, val); };

  useEffect(() => {
    if (ref.current && value === "" && ref.current.innerHTML !== "") ref.current.innerHTML = "";
  }, [value]);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1 border-b border-gray-100">
        {[
          { d: I.undo,      title: "Undo",      cmd: "undo" },
          { d: I.redo,      title: "Redo",      cmd: "redo" },
          null,
          { d: I.bold,      title: "Bold",      cmd: "bold" },
          { d: I.italic,    title: "Italic",    cmd: "italic" },
          { d: I.underline, title: "Underline", cmd: "underline" },
          null,
          { d: I.list,      title: "List",      cmd: "insertUnorderedList" },
          { d: I.link,      title: "Link",      cmd: null, fn: () => { const u = prompt("URL:"); if (u) exec("createLink", u); } },
          { d: I.emoji,     title: "Emoji",     cmd: null, fn: () => exec("insertText", "😊") },
        ].map((btn, i) =>
          btn === null
            ? <div key={i} className="w-px h-3.5 bg-gray-200 mx-0.5" />
            : <button key={i} type="button" title={btn.title}
                onClick={() => btn.fn ? btn.fn() : exec(btn.cmd)}
                className="p-1.5 rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                <Ico d={btn.d} size={13} />
              </button>
        )}
      </div>
      {/* Content editable */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(ref.current?.innerHTML || "")}
        className="flex-1 px-3 py-2.5 outline-none text-sm text-gray-800 leading-relaxed overflow-y-auto"
        style={{ minHeight }}
        data-placeholder={placeholder}
        role="textbox"
        aria-multiline="true"
        aria-label="Reply body"
      />
      <style>{`
        [contenteditable][data-placeholder]:empty:before{content:attr(data-placeholder);color:#9ca3af;pointer-events:none}
        [contenteditable] a{color:#2563eb;text-decoration:underline}
      `}</style>
    </div>
  );
};

// ─── Reply / Forward Compose Popup ───────────────────────────────────────────
// Mimics Gmail's bottom-anchored reply composer

const ReplyCompose = ({
  mode = "reply",        // "reply" | "replyAll" | "forward"
  originalMessage,
  senderAccounts = [],
  onSend,
  onClose,
  onExpand,             // promote to full ComposeModal
}) => {
  const [to,      setTo]      = useState(() => {
    if (mode === "forward") return [];
    const sender = originalMessage?.from;
    return sender ? [{ email: sender.email, name: sender.name || "", error: false }] : [];
  });
  const [cc,      setCc]      = useState(mode === "replyAll" ? (originalMessage?.cc || []) : []);
  const [showCc,  setShowCc]  = useState(mode === "replyAll" && (originalMessage?.cc?.length > 0));
  const [subject, setSubject] = useState(() => {
    const s = originalMessage?.subject || "";
    if (mode === "forward") return `Fwd: ${s}`;
    return s.startsWith("Re:") ? s : `Re: ${s}`;
  });
  const [body,    setBody]    = useState("");
  const [attachments, setAttachments] = useState([]);
  const [sending, setSending] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const fileInputRef = useRef(null);

  const addRecipient = (list, setList) => (r) => {
    if (!list.some(x => x.email.toLowerCase() === r.email.toLowerCase())) setList(p => [...p, r]);
  };
  const removeRecipient = (list, setList) => (i) => setList(p => p.filter((_, idx) => idx !== i));

  const handleFiles = (e) => {
    if (e.target.files?.length) {
      const newFiles = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...newFiles]);
      e.target.value = "";
    }
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (to.length === 0) return;
    setSending(true);
    try {
      await onSend?.({ mode, to, cc, subject, body, attachments });
      onClose?.();
    } catch {
      // parent handles error
    } finally {
      setSending(false);
    }
  };

  const modeLabel = mode === "forward" ? "Forward" : mode === "replyAll" ? "Reply All" : "Reply";

  return (
    <div className={`bg-white rounded-t-xl shadow-2xl border border-gray-200 border-b-0 flex flex-col transition-all duration-200 ${minimized ? "h-[48px]" : "h-[360px]"}`}
      style={{ boxShadow: "0 -4px 24px rgba(0,0,0,0.13), 0 -1px 6px rgba(0,0,0,0.07)" }}>

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 cursor-pointer select-none shrink-0"
        onClick={() => setMinimized(m => !m)}
      >
        <div className="flex items-center gap-2">
          <Ico d={mode === "forward" ? I.forward : I.reply} size={14} className="text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">{modeLabel}</span>
          {to.length > 0 && !minimized && (
            <span className="text-xs text-gray-400 truncate max-w-[200px]">
              to {to.map(r => r.name || r.email).join(", ")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
          <button type="button" title={minimized ? "Expand" : "Minimize"} onClick={() => setMinimized(m => !m)}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <Ico d={minimized ? I.expand : I.minimize} size={15} />
          </button>
          {onExpand && (
            <button type="button" title="Open in full composer" onClick={onExpand}
              className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
              <Ico d={I.expand} size={15} />
            </button>
          )}
          <button type="button" title="Discard" onClick={onClose}
            className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
            <Ico d={I.x} size={15} />
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* To */}
          <RecipientField label="To" recipients={to} onAdd={addRecipient(to, setTo)} onRemove={removeRecipient(to, setTo)} />

          {/* Cc toggle */}
          {!showCc && (
            <div className="px-3 py-1 border-b border-gray-100 flex justify-end">
              <button type="button" onClick={() => setShowCc(true)}
                className="text-[10px] font-bold text-gray-400 hover:text-blue-500 uppercase tracking-widest transition-colors">
                Cc / Bcc
              </button>
            </div>
          )}
          {showCc && (
            <RecipientField label="Cc" recipients={cc} onAdd={addRecipient(cc, setCc)} onRemove={removeRecipient(cc, setCc)} />
          )}

          {/* Subject (forward shows it; reply hides it since it's pre-set) */}
          {mode === "forward" && (
            <div className="px-3 py-2 border-b border-gray-100">
              <input type="text" value={subject} onChange={e => setSubject(e.target.value)}
                className="w-full bg-transparent text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
                placeholder="Subject" aria-label="Subject" />
            </div>
          )}

          {/* Body editor */}
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
            <MiniEditor value={body} onChange={setBody} placeholder={mode === "forward" ? "Add a message…" : "Write a reply…"} minHeight={100} />
          </div>

          {/* Attached Files List */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-1.5 px-3 py-1.5 bg-gray-50 border-t border-gray-100 max-h-[60px] overflow-y-auto shrink-0">
              {attachments.map((file, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-gray-200 text-xs text-gray-700 shadow-sm">
                  <span className="truncate max-w-[150px]" title={file.name}>{file.name}</span>
                  <span className="text-[10px] text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
                  <button type="button" onClick={() => removeAttachment(i)} className="text-gray-400 hover:text-red-500 rounded p-0.5 transition-colors" title={`Remove ${file.name}`}>
                    <Ico d={I.x} size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 bg-white/50 shrink-0">
            <div className="flex items-center gap-2">
              <button type="button" onClick={handleSend} disabled={sending || to.length === 0}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-all ${sending || to.length === 0 ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 active:scale-95"}`}>
                {sending
                  ? <><Ico d={I.spinner} size={13} className="animate-spin" />Sending…</>
                  : <><Ico d={I.send} size={13} />Send</>}
              </button>
              <span className="text-[10px] text-gray-400">Ctrl+Enter</span>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                title="Attach file"
                onClick={() => fileInputRef.current?.click()}
                disabled={sending}
                className="p-1.5 rounded text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
              >
                <Ico d={I.attach} size={15} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFiles}
                aria-label="Attach files"
              />
              <button type="button" title="Insert link" className="p-1.5 rounded text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors">
                <Ico d={I.link} size={15} />
              </button>
              <button type="button" title="Emoji" className="p-1.5 rounded text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors">
                <Ico d={I.emoji} size={15} />
              </button>
              <button type="button" title="More options" className="p-1.5 rounded text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors">
                <Ico d={I.more} size={15} />
              </button>
              <div className="w-px h-4 bg-gray-200 mx-1" />
              <button type="button" title="Discard" onClick={onClose}
                className="p-1.5 rounded text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                <Ico d={I.trash} size={15} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─── EmailMessage (single message thread item) ────────────────────────────────

const EmailMessage = ({ message, isLast, onReply, onReplyAll, onForward, defaultExpanded }) => {
  const [expanded, setExpanded] = useState(defaultExpanded ?? isLast);
  const [showDetails, setShowDetails] = useState(false);

  const { from = {}, to = [], cc = [], date, body = "", subject, attachments = [] } = message;
  const color = avatarColor(from.name || from.email || "");
  const parsedBody = parseEmailBody(message);

  return (
    <div className={`bg-white rounded-xl border transition-all duration-150 ${expanded ? "border-gray-200 shadow-sm" : "border-transparent hover:border-gray-200 hover:shadow-sm"}`}>
      {/* Message header — always visible */}
      <div
        className={`flex items-start gap-3 px-5 py-4 cursor-pointer select-none`}
        onClick={() => setExpanded(e => !e)}
      >
        {/* Avatar */}
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${color}`}>
          {initials(from.name, from.email)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold truncate">{from.name || from.email}</span>
            <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">{formatDate(date)}</span>
          </div>

          {!expanded && (
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {body.replace(/<[^>]*>/g, "").slice(0, 120)}
            </p>
          )}

          {expanded && (
            <div className="flex items-center gap-1 mt-0.5">
              <button type="button" onClick={e => { e.stopPropagation(); setShowDetails(d => !d); }}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                <span>to {to.map(r => r.name || r.email).join(", ")}</span>
                <Ico d={I.chevDown} size={12} className={`transition-transform ${showDetails ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}
        </div>

        {/* Action icons (visible on hover / expanded) */}
        {expanded && (
          <div className="flex items-center gap-0.5 shrink-0 ml-1" onClick={e => e.stopPropagation()}>
            <button type="button" title="Reply" onClick={() => onReply?.(message)}
              className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
              <Ico d={I.reply} size={15} />
            </button>
            <button type="button" title="More" className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
              <Ico d={I.more} size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Details dropdown */}
      {expanded && showDetails && (
        <div className="mx-5 mb-3 px-3 py-2.5 bg-white rounded-lg border border-gray-100 text-xs text-gray-600 space-y-1">
          <div className="flex gap-2"><span className="text-gray-400 w-6">from</span><span>{from.name} &lt;{from.email}&gt;</span></div>
          {to.length > 0 && <div className="flex gap-2"><span className="text-gray-400 w-6">to</span><span>{to.map(r => `${r.name} <${r.email}>`).join(", ")}</span></div>}
          {cc.length > 0 && <div className="flex gap-2"><span className="text-gray-400 w-6">cc</span><span>{cc.map(r => `${r.name} <${r.email}>`).join(", ")}</span></div>}
          <div className="flex gap-2"><span className="text-gray-400 w-6">date</span><span>{formatDate(date)}</span></div>
          {subject && <div className="flex gap-2"><span className="text-gray-400 w-6">subj</span><span>{subject}</span></div>}
        </div>
      )}

      {/* Body */}
      {expanded && (
        <div
          className="px-5 pb-5 text-sm text-gray-700 leading-relaxed email-body"
          dangerouslySetInnerHTML={{ __html: parsedBody }}
        />
      )}

      {/* Attachments */}
      {expanded && attachments && attachments.length > 0 && (
        <div className="px-5 pb-4 flex flex-wrap gap-2">
          {attachments.map((att) => (
            <a
              key={att.id}
              href={`${API_URL}/api/attachments/${att.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-xs text-gray-700 font-medium transition-colors"
            >
              <Ico d={I.attach} size={14} className="text-gray-400" />
              <span className="truncate max-w-[200px]">{att.filename || att.name || "Attachment"}</span>
              {att.size && <span className="text-gray-400">({(att.size / 1024).toFixed(1)} KB)</span>}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Main EmailViewModal ──────────────────────────────────────────────────────

/**
 * EmailViewModal
 *
 * Props:
 *   open          boolean
 *   onClose       () => void
 *   messages      Message[]   — thread messages, oldest first
 *   subject       string
 *   senderAccounts string[]
 *   onSend        async (payload) => void
 *   onArchive     () => void
 *   onDelete      () => void
 *   onPrev        () => void   — navigate to previous thread
 *   onNext        () => void   — navigate to next thread
 *   totalCount    number
 *   currentIndex  number
 */
export default function EmailViewModal({
  open,
  onClose = () => {},
  messages = [],
  subject = "(No subject)",
  senderAccounts,
  onSend,
  onArchive,
  onDelete,
  onPrev,
  onNext,
  totalCount = 0,
  currentIndex = 0,
}) {
  const [replyMode, setReplyMode]   = useState(null); // null | "reply" | "replyAll" | "forward"
  const [mounted,   setMounted]     = useState(false);
  const backdropRef = useRef(null);
  const bottomRef   = useRef(null);

  useEffect(() => {
    if (open) requestAnimationFrame(() => setMounted(true));
    else setMounted(false);
  }, [open]);

  // ESC to close
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") { if (replyMode) setReplyMode(null); else handleClose(); } };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [replyMode]);

  // Scroll to bottom when reply opens
  useEffect(() => {
    if (replyMode) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [replyMode]);

  const handleClose = () => { setMounted(false); setTimeout(onClose, 200); };
  const handleBackdrop = (e) => { if (e.target === backdropRef.current) handleClose(); };

  const lastMessage = messages[messages.length - 1];

  const handleSend = async (payload) => {
    await onSend?.({ ...payload, originalMessageId: lastMessage?.id });
    setReplyMode(null);
  };

  console.log("messages", messages);

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${mounted ? "bg-black/30 backdrop-blur-sm" : "bg-transparent"}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Email: ${subject}`}
    >
      <div className={`w-[780px] max-w-[96vw] h-[88vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>

        {/* ── Top toolbar ── */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-1">
            <button type="button" onClick={handleClose} title="Back"
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" aria-label="Close">
              <Ico d={I.nav} size={18} />
            </button>
            {onArchive && (
              <button type="button" onClick={onArchive} title="Archive"
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" aria-label="Archive">
                <Ico d={I.archive} size={17} />
              </button>
            )}
            {onDelete && (
              <button type="button" onClick={onDelete} title="Delete"
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors" aria-label="Delete">
                <Ico d={I.trash} size={17} />
              </button>
            )}
            <button type="button" title="Mark unread"
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" aria-label="Mark unread">
              <Ico d={I.label} size={17} />
            </button>
            <button type="button" title="Star"
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" aria-label="Star">
              <Ico d={I.star} size={17} />
            </button>
            <button type="button" title="More"
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors" aria-label="More actions">
              <Ico d={I.more} size={17} />
            </button>
          </div>

          {/* Nav arrows */}
          {totalCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{currentIndex + 1} of {totalCount}</span>
              <button type="button" onClick={onPrev} disabled={currentIndex === 0} title="Previous"
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 disabled:opacity-30 transition-colors" aria-label="Previous email">
                <Ico d={I.nav} size={16} />
              </button>
              <button type="button" onClick={onNext} disabled={currentIndex === totalCount - 1} title="Next"
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 disabled:opacity-30 transition-colors" aria-label="Next email">
                <Ico d={I.navR} size={16} />
              </button>
            </div>
          )}
        </div>

        {/* ── Subject ── */}
        <div className="px-6 pt-5 pb-3 bg-white border-b border-gray-100 shrink-0">
          <h1 style={{color: "#000", fontSize: "22px", margin: "0px"}} className="text-xl font-semibold leading-snug">{subject || messages[0]?.subject || "(No subject)"}</h1>
          <p className="text-xs text-gray-400 mt-1">{messages.length} message{messages.length !== 1 ? "s" : ""} in this thread</p>
        </div>

        {/* ── Scrollable thread ── */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-3">
          {messages.map((msg, i) => (
            <EmailMessage
              key={msg.id || i}
              message={msg}
              isLast={i === messages.length - 1}
              defaultExpanded={i === messages.length - 1}
              onReply={() => setReplyMode("reply")}
              onReplyAll={() => setReplyMode("replyAll")}
              onForward={() => setReplyMode("forward")}
            />
          ))}

          {/* ── Reply / Forward / Reply All buttons (Gmail-style) ── */}
          {!replyMode && (
            <div className="flex items-center gap-3 px-1 pt-2 pb-4">
              <button type="button" onClick={() => setReplyMode("reply")}
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-white hover:border-gray-400 transition-all shadow-sm active:scale-95">
                <Ico d={I.reply} size={15} />
                Reply
              </button>
              <button type="button" onClick={() => setReplyMode("replyAll")}
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-white hover:border-gray-400 transition-all shadow-sm active:scale-95">
                <Ico d={I.replyAll} size={15} />
                Reply all
              </button>
              <button type="button" onClick={() => setReplyMode("forward")}
                className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-white hover:border-gray-400 transition-all shadow-sm active:scale-95">
                <Ico d={I.forward} size={15} />
                Forward
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── Bottom-anchored reply compose ── */}
        {replyMode && (
          <div className="shrink-0 px-4 pb-0">
            <ReplyCompose
              mode={replyMode}
              originalMessage={lastMessage}
              senderAccounts={senderAccounts}
              onSend={handleSend}
              onClose={() => setReplyMode(null)}
            />
          </div>
        )}
      </div>

      {/* Email body scoped styles */}
      <style>{`
        .email-body img { max-width: 100%; height: auto; }
        .email-body a   { color: #2563eb; text-decoration: underline; }
        .email-body ul  { padding-left: 1.25rem; list-style: disc; }
        .email-body ol  { padding-left: 1.25rem; list-style: decimal; }
        .email-body p   { margin-bottom: 0.75rem; }
        .email-body blockquote { border-left: 3px solid #d1d5db; padding-left: 1rem; color: #6b7280; margin: 0.5rem 0; }
      `}</style>
    </div>
  );
}