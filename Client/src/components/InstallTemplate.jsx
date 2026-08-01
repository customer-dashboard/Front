import { useState, useRef, useEffect } from "react";
import { API_URL } from "../../proxy";
import axios from "axios";
// ─── Icons ────────────────────────────────────────────────────────────────────

const Icon = ({ path, size = 18, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {Array.isArray(path)
            ? path.map((d, i) => <path key={i} d={d} />)
            : <path d={path} />}
    </svg>
);

const icons = {
    minimize: "M5 12h14",
    maximize: ["M8 3H5a2 2 0 0 0-2 2v3", "M21 8V5a2 2 0 0 0-2-2h-3", "M3 16v3a2 2 0 0 0 2 2h3", "M16 21h3a2 2 0 0 0 2-2v-3"],
    x: ["M18 6 6 18", "m6 6 12 12"],
    send: ["M22 2 11 13", "M22 2 15 22 11 13 2 9l20-7z"],
    attach: ["m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"],
    link: ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
    emoji: ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M8 14s1.5 2 4 2 4-2 4-2", "M9 9h.01", "M15 9h.01"],
    drive: ["M12 2L2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"],
    more: ["M12 5h.01", "M12 12h.01", "M12 19h.01"],
    bold: ["M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z", "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"],
    italic: ["M19 4h-9", "M14 20H5", "M15 4 9 20"],
    underline: ["M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3", "M4 21h16"],
    list: ["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
    undo: ["M3 7v6h6", "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"],
    redo: ["M21 7v6h-6", "M3 17a9 9 0 0 0 9-9 9 9 0 0 0 6 2.3L21 13"],
    code: ["M16 18 22 12 16 6", "M8 6 2 12 8 18"],
    chevronDown: "M6 9l6 6 6-6",
    chevronUp: "M18 15l-6-6-6 6",
    spinner: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
    clock: ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 6v6l4 2"],
    file: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6"],
    trash: ["M3 6h18", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"],
    mention: ["M20 12v-2a8 8 0 1 0-3.56 6.62", "M12 8v4l2 2", "M20 12a4 4 0 1 1-4-4", "M20 20v-4"],
    check: "M20 6 9 17 4 12",
};

// ─── Utilities ────────────────────────────────────────────────────────────────

const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ─── Toolbar Button ───────────────────────────────────────────────────────────

const ToolbarBtn = ({ iconPath, title, onClick, active = false, size = 16 }) => (
    <button
        type="button"
        title={title}
        onClick={onClick}
        className={`p-1.5 rounded transition-colors ${active
            ? "bg-blue-100 text-blue-600"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
    >
        <Icon path={iconPath} size={size} />
    </button>
);

// ─── Rich Text Editor ─────────────────────────────────────────────────────────

const RichTextEditor = ({ value, onChange, minHeight = 300 }) => {
    const editorRef = useRef(null);
    const [activeFormats, setActiveFormats] = useState({});

    const exec = (cmd, val = null) => {
        editorRef.current?.focus();
        document.execCommand(cmd, false, val);
        updateFormats();
    };

    const updateFormats = () => {
        setActiveFormats({
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            underline: document.queryCommandState("underline"),
            insertUnorderedList: document.queryCommandState("insertUnorderedList"),
        });
    };

    const handleInput = () => {
        onChange(editorRef.current?.innerHTML || "");
        updateFormats();
    };

    useEffect(() => {
        if (editorRef.current && value === "" && editorRef.current.innerHTML !== "") {
            editorRef.current.innerHTML = "";
        }
    }, [value]);

    // Set initial value
    useEffect(() => {
        if (editorRef.current && value && editorRef.current.innerHTML === "") {
            editorRef.current.innerHTML = value;
        }
    }, []);

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-gray-100 bg-gray-50/50 flex-wrap">
                <ToolbarBtn iconPath={icons.undo} title="Undo" onClick={() => exec("undo")} />
                <ToolbarBtn iconPath={icons.redo} title="Redo" onClick={() => exec("redo")} />
                <div className="w-px h-4 bg-gray-200 mx-1" />
                <ToolbarBtn iconPath={icons.bold} title="Bold (Ctrl+B)" onClick={() => exec("bold")} active={activeFormats.bold} />
                <ToolbarBtn iconPath={icons.italic} title="Italic (Ctrl+I)" onClick={() => exec("italic")} active={activeFormats.italic} />
                <ToolbarBtn iconPath={icons.underline} title="Underline (Ctrl+U)" onClick={() => exec("underline")} active={activeFormats.underline} />
                <div className="w-px h-4 bg-gray-200 mx-1" />
                <ToolbarBtn iconPath={icons.list} title="Bullet list" onClick={() => exec("insertUnorderedList")} active={activeFormats.insertUnorderedList} />
                <ToolbarBtn iconPath={icons.code} title="Code block" onClick={() => exec("formatBlock", "pre")} />
                <div className="w-px h-4 bg-gray-200 mx-1" />
                <ToolbarBtn
                    iconPath={icons.link}
                    title="Insert link"
                    onClick={() => {
                        const url = window.prompt("Enter URL:");
                        if (url) exec("createLink", url);
                    }}
                />
                <ToolbarBtn iconPath={icons.emoji} title="Emoji" onClick={() => exec("insertText", "😊")} />
                <ToolbarBtn iconPath={icons.mention} title="Mention" onClick={() => exec("insertText", "@")} />
            </div>
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onKeyUp={updateFormats}
                onMouseUp={updateFormats}
                className="px-4 py-3 outline-none text-sm text-gray-800 leading-relaxed overflow-y-auto"
                style={{ minHeight }}
                data-placeholder="Write your message…"
                aria-label="Message body"
                role="textbox"
                aria-multiline="true"
            />
            <style>{`
        [contenteditable]:empty:before { content: attr(data-placeholder); color: #9ca3af; pointer-events: none; }
        [contenteditable] a { color: #2563eb; text-decoration: underline; }
        [contenteditable] pre { background: #f3f4f6; border-radius: 6px; padding: 8px 12px; font-family: monospace; font-size: 12px; }
        [contenteditable] ul { padding-left: 20px; list-style: disc; }
      `}</style>
        </div>
    );
};

// ─── Attachment Card ──────────────────────────────────────────────────────────

const AttachmentCard = ({ file, previewUrl, onRemove }) => {
    const isImage = file.type.startsWith("image/");
    return (
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg group hover:border-gray-300 transition-colors max-w-[200px]">
            {isImage && previewUrl ? (
                <img src={previewUrl} alt={file.name} className="w-8 h-8 rounded object-cover shrink-0" />
            ) : (
                <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon path={icons.file} size={16} className="text-blue-500" />
                </div>
            )}
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
            </div>
            <button
                type="button"
                onClick={onRemove}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all p-0.5 rounded"
                aria-label={`Remove ${file.name}`}
            >
                <Icon path={icons.trash} size={14} />
            </button>
        </div>
    );
};

// ─── Toast ────────────────────────────────────────────────────────────────────

const Toast = ({ message, type }) => (
    <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium text-white transition-all ${type === "error" ? "bg-red-500" : "bg-green-600"
            }`}
    >
        <Icon path={type === "error" ? icons.x : icons.check} size={15} />
        {message}
    </div>
);

// ─── ComposeModal ─────────────────────────────────────────────────────────────

export function ComposeModal({
    open,
    setOpen,
    onClose = () => { },
    initialSubject = "",
    initialBody = "",
    onSend, // optional callback: onSend({ subject, body, attachments })
}) {
    const [mounted, setMounted] = useState(false);
    const [subject, setSubject] = useState(initialSubject);
    const [body, setBody] = useState(initialBody);
    const [attachments, setAttachments] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [sending, setSending] = useState(false);
    const [toast, setToast] = useState(null);
    const [minimized, setMinimized] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [scheduleOpen, setScheduleOpen] = useState(false);

    const backdropRef = useRef(null);
    const fileInputRef = useRef(null);

    // Mount animation
    useEffect(() => {
        if (open) {
            setSubject(initialSubject);
            setBody(initialBody);
            requestAnimationFrame(() => setMounted(true));
        } else {
            setMounted(false);
        }
    }, [open]);

    // ESC to close
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") handleClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    // Ctrl+Enter to send
    useEffect(() => {
        const handler = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleSend();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [subject, body, attachments]);

    // Auto-dismiss toast
    useEffect(() => {
        if (toast) {
            const t = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(t);
        }
    }, [toast]);

    const showToast = (message, type = "success") => setToast({ message, type });

    const handleClose = () => {
        setMounted(false);
        setTimeout(() => {
            setAttachments([]);
            setPreviews([]);
            setMinimized(false);
            setFullscreen(false);
            onClose();
            if (setOpen) setOpen(false);
        }, 200);
    };

    const handleBackdropClick = (e) => {
        if (e.target === backdropRef.current) handleClose();
    };

    // ── Attachments ──────────────────────────────────────────────────────────────

    const handleFiles = (files) => {
        const newFiles = Array.from(files);
        const newPreviews = newFiles.map((f) =>
            f.type.startsWith("image/") ? URL.createObjectURL(f) : null
        );
        setAttachments((prev) => [...prev, ...newFiles]);
        setPreviews((prev) => [...prev, ...newPreviews]);
    };

    const removeAttachment = (index) => {
        setAttachments((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = () => setIsDragging(false);
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    };

    // ── Send ─────────────────────────────────────────────────────────────────────

    const validate = () => {
        if (!subject.trim()) { showToast("Please enter a subject.", "error"); return false; }
        if (!body.trim() || body === "<br>") { showToast("Message body is empty.", "error"); return false; }
        return true;
    };

    const handleSend = async () => {
        if (!validate()) return;
        setSending(true);
        try {
            const payload = { subject, body, attachments };

            if (onSend) {
                await onSend(payload);
            } else {
                // Default: build FormData and log (replace with your API call)
                const formData = new FormData();
                formData.append("subject", subject);
                formData.append("body", body);
                attachments.forEach((file) => formData.append("attachments", file));
                console.log("Sending:", { subject, body, attachmentCount: attachments.length });
                // await axios.post(`${API_URL}/api/send`, formData, { headers: { "Content-Type": "multipart/form-data" } });
            }

            showToast("Message sent successfully!");
            setTimeout(handleClose, 1500);
        } catch (err) {
            console.error("Send failed:", err);
            showToast("Failed to send. Please try again.", "error");
        } finally {
            setSending(false);
        }
    };

    const modalW = fullscreen ? "w-full" : "w-[700px] max-w-[95vw]";
    const modalH = fullscreen
        ? "h-screen rounded-none"
        : minimized
            ? "h-auto rounded-xl"
            : "h-[80vh] rounded-xl";

    if (!open) return null;

    return (
        <>
            {toast && <Toast {...toast} />}

            <div
                ref={backdropRef}
                onClick={handleBackdropClick}
                className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${mounted ? "bg-black/30 backdrop-blur-sm" : "bg-transparent"
                    }`}
                aria-modal="true"
                role="dialog"
                aria-label="Compose email"
            >
                <div
                    className={`
            ${modalW} ${modalH}
            ${fullscreen ? "fixed inset-0" : ""}
            bg-white shadow-2xl flex flex-col overflow-hidden
            transition-all duration-200
            ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            ${isDragging ? "ring-2 ring-blue-400 ring-inset" : ""}
          `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white shrink-0 rounded-t-xl">
                        <span className="text-sm font-semibold tracking-wide">New Message</span>
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                title="Minimize"
                                onClick={() => setMinimized((m) => !m)}
                                className="p-1.5 rounded hover:bg-white/20 transition-colors"
                            >
                                <Icon path={minimized ? icons.chevronUp : icons.minimize} size={16} />
                            </button>
                            <button
                                type="button"
                                title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
                                onClick={() => setFullscreen((f) => !f)}
                                className="p-1.5 rounded hover:bg-white/20 transition-colors"
                            >
                                <Icon path={icons.maximize} size={16} />
                            </button>
                            <button
                                type="button"
                                title="Close (Esc)"
                                onClick={handleClose}
                                className="p-1.5 rounded hover:bg-red-500 transition-colors"
                            >
                                <Icon path={icons.x} size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Collapsible Body */}
                    {!minimized && (
                        <div className="flex flex-col flex-1 min-h-0">
                            {/* Subject */}
                            <div className="px-4 py-2.5 border-b border-gray-100">
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Subject"
                                    disabled={sending}
                                    className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none font-medium"
                                    aria-label="Subject"
                                />
                            </div>

                            {/* Editor + Attachments */}
                            <div className="flex-1 min-h-0 overflow-y-auto flex flex-col relative">
                                <RichTextEditor value={body} onChange={setBody} minHeight={300} />

                                {attachments.length > 0 && (
                                    <div className="px-4 py-3 border-t border-gray-100 flex flex-wrap gap-2">
                                        {attachments.map((f, i) => (
                                            <AttachmentCard
                                                key={i}
                                                file={f}
                                                previewUrl={previews[i]}
                                                onRemove={() => removeAttachment(i)}
                                            />
                                        ))}
                                    </div>
                                )}

                                {isDragging && (
                                    <div className="absolute inset-0 bg-blue-50/90 flex items-center justify-center pointer-events-none z-10 rounded-xl">
                                        <div className="text-center">
                                            <Icon path={icons.attach} size={40} className="text-blue-400 mx-auto mb-2" />
                                            <p className="text-blue-600 font-semibold text-sm">Drop files to attach</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50 shrink-0">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center rounded-lg overflow-hidden shadow-sm">
                                        <button
                                            type="button"
                                            onClick={handleSend}
                                            disabled={sending}
                                            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all ${sending ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 active:scale-95"
                                                }`}
                                        >
                                            {sending ? (
                                                <><Icon path={icons.spinner} size={14} className="animate-spin" /> Sending…</>
                                            ) : (
                                                <><Icon path={icons.send} size={14} /> Send</>
                                            )}
                                        </button>
                                        <div className="w-px h-8 bg-blue-400" />
                                        <div className="relative">
                                            <button
                                                type="button"
                                                title="Schedule send"
                                                onClick={() => setScheduleOpen((o) => !o)}
                                                disabled={sending}
                                                className="flex items-center px-2 py-2 text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                                            >
                                                <Icon path={icons.chevronDown} size={14} />
                                            </button>
                                            {scheduleOpen && (
                                                <div className="absolute left-0 bottom-10 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[180px] z-20 py-1 text-sm">
                                                    {["In 1 hour", "This afternoon", "Tomorrow morning", "Custom time…"].map((opt) => (
                                                        <button
                                                            key={opt}
                                                            type="button"
                                                            onClick={() => { setScheduleOpen(false); showToast(`Scheduled: ${opt}`); }}
                                                            className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-50 text-gray-700 transition-colors"
                                                        >
                                                            <Icon path={icons.clock} size={14} className="text-gray-400" />
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400 ml-1">Ctrl+Enter</span>
                                </div>

                                <div className="flex items-center gap-0.5">
                                    <button
                                        type="button"
                                        title="Attach file"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={sending}
                                        className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-lg transition-colors"
                                    >
                                        <Icon path={icons.attach} size={17} />
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={(e) => handleFiles(e.target.files)}
                                        aria-label="Attach files"
                                    />
                                    <button type="button" title="Insert link" disabled={sending} className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-lg transition-colors">
                                        <Icon path={icons.link} size={17} />
                                    </button>
                                    <button type="button" title="Emoji" disabled={sending} className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-lg transition-colors">
                                        <Icon path={icons.emoji} size={17} />
                                    </button>
                                    <button type="button" title="Google Drive" disabled={sending} className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-lg transition-colors">
                                        <Icon path={icons.drive} size={17} />
                                    </button>
                                    <div className="w-px h-5 bg-gray-200 mx-1" />
                                    <button type="button" title="More options" disabled={sending} className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-lg transition-colors">
                                        <Icon path={icons.more} size={17} />
                                    </button>
                                    <button
                                        type="button"
                                        title="Discard draft"
                                        onClick={handleClose}
                                        disabled={sending}
                                        className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors ml-1"
                                    >
                                        <Icon path={icons.trash} size={17} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

// ─── Usage Example ─────────────────────────────────────────────────────────────
// This shows how to wire the trigger button + modal together.

export default function InstallTemplateButton({ subject = "", body = "" }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Trigger button — place this wherever you need it */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
            >
                <Icon path={icons.send} size={15} />
                Install Template
            </button>

            {/* Modal */}
            <ComposeModal
                open={open}
                setOpen={setOpen}
                initialSubject={subject}
                initialBody={body}
                onSend={async ({ subject, body, attachments }) => {
                    // Replace with your actual API call, e.g.:
                    // const formData = new FormData();
                    // formData.append("subject", subject);
                    // formData.append("body", body);
                    // attachments.forEach(f => formData.append("attachments", f));
                    await axios.post(`${API_URL}/api/install-template`, { payload: { subject, body, attachments } });
                    console.log("Payload →", { subject, body, attachments });
                }}
            />
        </>
    );
}
