import { useState, useRef, useEffect, useCallback } from "react";
import { API_URL } from "../../proxy";
import axios from "axios";

// ─── Icons (inline SVG to avoid dependencies) ───────────────────────────────

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
        {Array.isArray(path) ? path.map((d, i) => <path key={i} d={d} />) : <path d={path} />}
    </svg>
);

const icons = {
    minimize: "M5 12h14",
    maximize: ["M8 3H5a2 2 0 0 0-2 2v3", "M21 8V5a2 2 0 0 0-2-2h-3", "M3 16v3a2 2 0 0 0 2 2h3", "M16 21h3a2 2 0 0 0 2-2v-3"],
    close: ["M18 6 6 18", "m6 6 12 12"],
    x: ["M18 6 6 18", "m6 6 12 12"],
    send: ["M22 2 11 13", "M22 2 15 22 11 13 2 9l20-7z"],
    attach: ["m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"],
    link: ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
    emoji: ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M8 14s1.5 2 4 2 4-2 4-2", "M9 9h.01", "M15 9h.01"],
    drive: ["M12 2L2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"],
    more: ["M12 5h.01", "M12 12h.01", "M12 19h.01"],
    format: ["M4 7V4h16v3", "M9 20h6", "M12 4v16"],
    bold: ["M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z", "M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"],
    italic: ["M19 4h-9", "M14 20H5", "M15 4 9 20"],
    underline: ["M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3", "M4 21h16"],
    list: ["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
    undo: ["M3 7v6h6", "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"],
    redo: ["M21 7v6h-6", "M3 17a9 9 0 0 0 9-9 9 9 0 0 0 6 2.3L21 13"],
    image: ["rect x='3' y='3' width='18' height='18' rx='2' ry='2'", "M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z", "M21 15l-5-5L5 21"],
    code: ["M16 18 22 12 16 6", "M8 6 2 12 8 18"],
    chevronDown: "M6 9l6 6 6-6",
    chevronUp: "M18 15l-6-6-6 6",
    spinner: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
    check: "M20 6 9 17 4 12",
    warning: ["M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4", "M12 17h.01"],
    file: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6"],
    trash: ["M3 6h18", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"],
    clock: ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 6v6l4 2"],
    mention: ["M20 12v-2a8 8 0 1 0-3.56 6.62", "M12 8v4l2 2", "M20 12a4 4 0 1 1-4-4", "M20 20v-4"],
};

// ─── Utilities ───────────────────────────────────────────────────────────────

const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ─── Toast ───────────────────────────────────────────────────────────────────

const Toast = ({ message, type = "success", onRetry, onClose }) => {
    useEffect(() => {
        if (type !== "error") {
            const t = setTimeout(onClose, 3500);
            return () => clearTimeout(t);
        }
    }, [type, onClose]);

    const colors = {
        success: "bg-gray-900 text-white",
        error: "bg-red-600 text-white",
    };

    return (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium transition-all ${colors[type]}`}>
            {type === "success" ? (
                <Icon path={icons.check} size={16} />
            ) : (
                <Icon path={icons.warning} size={16} />
            )}
            <span>{message}</span>
            {type === "error" && onRetry && (
                <button onClick={onRetry} className="underline underline-offset-2 ml-1 opacity-90 hover:opacity-100">
                    Retry
                </button>
            )}
            <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
                <Icon path={icons.x} size={14} />
            </button>
        </div>
    );
};

// ─── Recipient Chip ───────────────────────────────────────────────────────────

const RecipientChip = ({ label, email, onRemove, hasError }) => (
    <span
        title={email}
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm font-medium max-w-[200px] ${hasError
            ? "bg-red-100 text-red-700 ring-1 ring-red-300"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors`}
    >
        <span className="truncate">{label || email}</span>
        <button
            type="button"
            onClick={onRemove}
            className="shrink-0 ml-0.5 rounded-full hover:bg-gray-300 p-0.5 transition-colors"
            aria-label={`Remove ${label || email}`}
        >
            <Icon path={icons.x} size={12} />
        </button>
    </span>
);

// ─── Recipient Field ──────────────────────────────────────────────────────────

const RecipientField = ({ label, recipients, onAdd, contacts = [], onRemove, placeholder = "Add recipients" }) => {
    const [inputVal, setInputVal] = useState("");
    const [focused, setFocused] = useState(false);
    const [highlighted, setHighlighted] = useState(0);
    const [searchResults, setSearchResults] = useState([]);
    const inputRef = useRef(null);

    // Server-side debounced search for contacts across the entire account
    useEffect(() => {
        if (!inputVal.trim()) {
            setSearchResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const response = await axios.get(`${API_URL}/api/contacts?q=${encodeURIComponent(inputVal.trim())}`);
                const fetched = response.data?.contacts || (Array.isArray(response.data) ? response.data : []);
                setSearchResults(fetched);
            } catch (err) {
                console.error("Error searching contacts:", err);
            }
        }, 250);

        return () => clearTimeout(timer);
    }, [inputVal]);

    // Combine local contacts & server search results, deduplicating by email
    const combined = [...contacts, ...searchResults];
    const seen = new Set();
    const uniqueContacts = combined.filter((c) => {
        if (!c.email) return false;
        const key = c.email.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    const filteredContacts =
        inputVal.trim() === ""
            ? []
            : uniqueContacts
                .filter((c) => {
                    const value = inputVal.toLowerCase();

                    const alreadyAdded = recipients.some(
                        (r) => r.email?.toLowerCase() === c.email?.toLowerCase()
                    );

                    return (
                        !alreadyAdded &&
                        (
                            (c.name || "").toLowerCase().includes(value) ||
                            (c.email || "").toLowerCase().includes(value)
                        )
                    );
                })
                .slice(0, 30);

    const selectSuggestion = (contact) => {
        onAdd({
            name: contact.name,
            email: contact.email,
            error: false,
        });

        setInputVal("");
        setHighlighted(0);
    };

    const commit = (raw) => {
        const val = raw.trim().replace(/,$/, "");
        if (!val) return;
        // Parse "Name <email>" or plain email
        const match = val.match(/^(.+?)\s*<([^>]+)>$/);
        const email = match ? match[2].trim() : val;
        const name = match ? match[1].trim() : "";
        if (!isValidEmail(email)) {
            onAdd({ email, name, error: true });
        } else {
            onAdd({ email, name, error: false });
        }
        setInputVal("");
    };

    const handleKey = (e) => {
        if (["Enter", "Tab", ","].includes(e.key)) {
            if (e.key !== "Tab" || inputVal) e.preventDefault();
            commit(inputVal);
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlighted((prev) =>
                Math.min(prev + 1, filteredContacts.length - 1)
            );
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlighted((prev) =>
                Math.max(prev - 1, 0)
            );
        }

        if (
            e.key === "Enter" &&
            filteredContacts.length
        ) {
            e.preventDefault();
            selectSuggestion(filteredContacts[highlighted]);
            return;
        }
        if (e.key === "Backspace" && !inputVal && recipients.length) {
            onRemove(recipients.length - 1);
        }
    };

    return (
        <div
            className={`flex flex-wrap items-center gap-1.5 px-4 py-2.5 border-b border-gray-100 min-h-[44px] cursor-text transition-colors ${focused ? "bg-blue-50/30" : "hover:bg-gray-50/50"}`}
            onClick={() => inputRef.current?.focus()}
        >
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-8 shrink-0 select-none">{label}</span>
            {recipients.map((r, i) => (
                <RecipientChip
                    key={i}
                    label={r.name}
                    email={r.email}
                    hasError={r.error}
                    onRemove={() => onRemove(i)}
                />
            ))}
            <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKey}
                onBlur={() => {
                    setTimeout(() => {
                        setFocused(false);
                        commit(inputVal);
                    }, 150);
                }}
                onFocus={() => setFocused(true)}
                placeholder={recipients.length === 0 ? placeholder : ""}
                className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
                aria-label={label}
            />
            {focused && filteredContacts.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                    {filteredContacts.map((contact, index) => (
                        <button
                            key={contact.email}
                            type="button"
                            onMouseDown={() => selectSuggestion(contact)}
                            className={`w-full px-4 py-3 flex items-center gap-3 text-left ${index === highlighted
                                ? "bg-blue-50"
                                : "hover:bg-gray-50"
                                }`}
                        >
                            <div className="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                                {contact.name?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <div className="text-sm font-medium">
                                    {contact.name}
                                </div>

                                <div className="text-xs text-gray-500">
                                    {contact.email}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─── Simple Toolbar Button ────────────────────────────────────────────────────

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
        {Array.isArray(iconPath) ? (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                {iconPath.map((d, i) => <path key={i} d={d} />)}
            </svg>
        ) : (
            <Icon path={iconPath} size={size} />
        )}
    </button>
);

// ─── Rich Text Editor (contentEditable with execCommand) ──────────────────────

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

    const handleKeyUp = () => updateFormats();

    useEffect(() => {
        if (editorRef.current && value === "" && editorRef.current.innerHTML !== "") {
            editorRef.current.innerHTML = "";
        }
    }, [value]);

    return (
        <div className="flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-gray-100 bg-gray-50/50 flex-wrap">
                <ToolbarBtn iconPath={icons.undo} title="Undo (Ctrl+Z)" onClick={() => exec("undo")} />
                <ToolbarBtn iconPath={icons.redo} title="Redo (Ctrl+Y)" onClick={() => exec("redo")} />
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
            {/* Editable area */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onKeyUp={handleKeyUp}
                onMouseUp={handleKeyUp}
                className="px-4 py-3 outline-none text-sm text-gray-800 leading-relaxed overflow-y-auto"
                style={{ minHeight }}
                data-placeholder="Write your message…"
                aria-label="Message body"
                aria-multiline="true"
                role="textbox"
            />
            <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
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

// ─── Main ComposeModal ────────────────────────────────────────────────────────

export default function ComposeModal({
    contacts, open, setOpen,
    onClose = () => { },
    initialTo = [],
    initialCc = [],
    initialBcc = [],
    initialSubject = "",
    initialBody = "",
    onSend = async () => { },
    senderAccounts,
}) {
    // ── State ──────────────────────────────────────────────────────────────────
    const [from, setFrom] = useState(senderAccounts[0] || null);
    const [to, setTo] = useState(initialTo);
    const [cc, setCc] = useState(initialCc);
    const [bcc, setBcc] = useState(initialBcc);
    const [subject, setSubject] = useState(initialSubject);
    const [body, setBody] = useState(initialBody);
    const [attachments, setAttachments] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [sending, setSending] = useState(false);
    const [errors, setErrors] = useState({});
    const [showCc, setShowCc] = useState(initialCc.length > 0);
    const [showBcc, setShowBcc] = useState(initialBcc.length > 0);
    const [minimized, setMinimized] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [toast, setToast] = useState(null);
    const [scheduleOpen, setScheduleOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [mounted, setMounted] = useState(false);

    const backdropRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (senderAccounts.length && !from) {
            setFrom(senderAccounts[0]);
        }
    }, [senderAccounts]);
    // Mount animation
    useEffect(() => {
        if (open) {
            requestAnimationFrame(() => setMounted(true));
        } else {
            setMounted(false);
        }
    }, [open]);

    // ESC to close
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") handleClose();
        };
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
    }, [to, subject, body, attachments]);

    const showToast = (message, type = "success") => setToast({ message, type });
    const hideToast = () => setToast(null);

    const handleClose = () => {
        setMounted(false);
        setTimeout(() => {
            onClose();
            if (setOpen) setOpen(false);
        }, 200);
    };

    const handleBackdropClick = (e) => {
        if (e.target === backdropRef.current) handleClose();
    };

    // ── Recipients ─────────────────────────────────────────────────────────────

    const addRecipient = (list, setList) => (recipient) => {
        // Prevent duplicates
        const already = list.some(r => r.email.toLowerCase() === recipient.email.toLowerCase());
        if (!already) setList(prev => [...prev, recipient]);
        // Clear matching error
        setErrors(prev => ({ ...prev, to: undefined }));
    };

    const removeRecipient = (list, setList) => (index) => {
        setList(prev => prev.filter((_, i) => i !== index));
    };

    // ── Attachments ────────────────────────────────────────────────────────────

    const handleFiles = (files) => {
        const newFiles = Array.from(files);
        const newPreviews = newFiles.map(f =>
            f.type.startsWith("image/") ? URL.createObjectURL(f) : null
        );
        setAttachments(prev => [...prev, ...newFiles]);
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = () => setIsDragging(false);
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    };

    // ── Validation ─────────────────────────────────────────────────────────────

    const validate = () => {
        const errs = {};
        if (to.length === 0) errs.to = "At least one recipient is required.";
        if (to.some(r => r.error)) errs.to = "One or more recipient emails are invalid.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    // ── Send ───────────────────────────────────────────────────────────────────

    const handleSend = async () => {
        if (!validate()) return;
        setSending(true);
        try {
            const channelId = typeof from === "object" ? from?.id : from;
            const formData = new FormData();
            formData.append("from", channelId);
            formData.append("subject", subject || "");
            formData.append("body", body || "");

            to.forEach((recipient) => {
                formData.append("to[]", typeof recipient === "string" ? recipient : recipient.email);
            });
            cc.forEach((recipient) => {
                formData.append("cc[]", typeof recipient === "string" ? recipient : recipient.email);
            });
            bcc.forEach((recipient) => {
                formData.append("bcc[]", typeof recipient === "string" ? recipient : recipient.email);
            });
            attachments.forEach((file) => {
                formData.append("attachments", file);
            });

            await axios.post(`${API_URL}/api/send`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            showToast("Message sent successfully");
            setTimeout(handleClose, 1800);
        } catch (err) {
            console.error("Send failed:", err);
            showToast("Failed to send. Please try again.", "error");
        } finally {
            setSending(false);
        }
    };

    // console.log("attachments", attachments);

    // const handleSend = async () => {
    //     if (!validate()) return;

    //     setSending(true);

    //     try {
    //         const formData = new FormData();

    //         formData.append("from", from.id);
    //         formData.append("subject", subject);
    //         formData.append("body", body);

    //         to.forEach((recipient) => {
    //             formData.append("to[]", recipient.email);
    //         });

    //         attachments.forEach((file) => {
    //             formData.append("attachments[]", file);
    //         });

    //         await axios.post(`${API_URL}/api/send`, formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         });

    //         showToast("Message sent successfully");
    //         setTimeout(handleClose, 1500);
    //     } catch (err) {
    //         console.error(err);
    //         showToast("Failed to send email", "error");
    //     } finally {
    //         setSending(false);
    //     }
    // };

    // ── Layout class helpers ───────────────────────────────────────────────────

    const modalW = fullscreen ? "w-full" : "w-[700px] max-w-[95vw]";
    const modalH = fullscreen
        ? "h-screen rounded-none"
        : minimized
            ? "h-auto rounded-t-xl"
            : "h-[80vh] rounded-xl";

    if (!open) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                ref={backdropRef}
                onClick={handleBackdropClick}
                className={`fixed inset-0 z-50 transition-all duration-200 ${fullscreen ? "" : "flex items-center justify-center"
                    } ${mounted ? "bg-black/30 backdrop-blur-sm" : "bg-transparent"}`}
                aria-modal="true"
                role="dialog"
                aria-label="Compose email"
            >
                {/* Modal */}
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
                    {/* ── Header ── */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white shrink-0 rounded-t-xl">
                        <span className="text-sm font-semibold tracking-wide">New Message</span>
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                title="Minimize"
                                onClick={() => setMinimized(m => !m)}
                                className="p-1.5 rounded hover:bg-white/20 transition-colors"
                            >
                                <Icon path={minimized ? icons.chevronUp : icons.minimize} size={16} />
                            </button>
                            <button
                                type="button"
                                title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
                                onClick={() => setFullscreen(f => !f)}
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

                    {/* ── Collapsible Body ── */}
                    {!minimized && (
                        <div className="flex flex-col flex-1 min-h-0">
                            {/* From */}
                            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 bg-gray-50/30">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider w-8 shrink-0">From</span>
                                <select
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                >
                                    {senderAccounts.map((channel) => (
                                        <option
                                            key={channel.id}
                                            value={channel.id}
                                        >
                                            {channel.name} ({channel.address})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* To */}
                            <div className="relative">
                                <RecipientField
                                    label="To"
                                    contacts={contacts}
                                    recipients={to}
                                    onAdd={addRecipient(to, setTo)}
                                    onRemove={removeRecipient(to, setTo)}
                                    placeholder="Recipients"
                                />
                                {/* CC / BCC toggles */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    {!showCc && (
                                        <button
                                            type="button"
                                            onClick={() => setShowCc(true)}
                                            className="text-xs font-semibold text-gray-400 hover:text-blue-500 transition-colors"
                                        >
                                            Cc
                                        </button>
                                    )}
                                    {!showBcc && (
                                        <button
                                            type="button"
                                            onClick={() => setShowBcc(true)}
                                            className="text-xs font-semibold text-gray-400 hover:text-blue-500 transition-colors"
                                        >
                                            Bcc
                                        </button>
                                    )}
                                </div>
                            </div>
                            {errors.to && (
                                <p className="px-4 py-1 text-xs text-red-500 bg-red-50 border-b border-red-100">{errors.to}</p>
                            )}

                            {/* Cc */}
                            {showCc && (
                                <RecipientField
                                    label="Cc"
                                    contacts={contacts}
                                    recipients={cc}
                                    onAdd={addRecipient(cc, setCc)}
                                    onRemove={removeRecipient(cc, setCc)}
                                    placeholder="Cc recipients"
                                />
                            )}

                            {/* Bcc */}
                            {showBcc && (
                                <RecipientField
                                    label="Bcc"
                                    contacts={contacts}
                                    recipients={bcc}
                                    onAdd={addRecipient(bcc, setBcc)}
                                    onRemove={removeRecipient(bcc, setBcc)}
                                    placeholder="Bcc recipients"
                                />
                            )}

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

                            {/* Editor + Attachments (scrollable) */}
                            <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
                                <RichTextEditor value={body} onChange={setBody} minHeight={300} />

                                {/* Attachments */}
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

                                {/* Drag hint */}
                                {isDragging && (
                                    <div className="absolute inset-0 bg-blue-50/90 flex items-center justify-center pointer-events-none z-10 rounded-xl">
                                        <div className="text-center">
                                            <Icon path={icons.attach} size={40} className="text-blue-400 mx-auto mb-2" />
                                            <p className="text-blue-600 font-semibold text-sm">Drop files to attach</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ── Footer ── */}
                            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50 shrink-0">
                                {/* Left: Send + schedule */}
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center rounded-lg overflow-hidden shadow-sm">
                                        <button
                                            type="button"
                                            onClick={handleSend}
                                            disabled={sending}
                                            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all ${sending
                                                ? "bg-blue-400 cursor-not-allowed"
                                                : "bg-blue-500 hover:bg-blue-600 active:scale-95"
                                                }`}
                                        >
                                            {sending ? (
                                                <>
                                                    <Icon path={icons.spinner} size={14} className="animate-spin" />
                                                    Sending…
                                                </>
                                            ) : (
                                                <>
                                                    <Icon path={icons.send} size={14} />
                                                    Send
                                                </>
                                            )}
                                        </button>
                                        <div className="w-px h-8 bg-blue-400" />
                                        <div className="relative">
                                            <button
                                                type="button"
                                                title="Schedule send"
                                                onClick={() => setScheduleOpen(o => !o)}
                                                disabled={sending}
                                                className="flex items-center px-2 py-2 text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                                                aria-haspopup="true"
                                                aria-expanded={scheduleOpen}
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

                                {/* Right: Toolbar icons */}
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
                                        onChange={(e) => setAttachments(Array.from(e.target.files))}
                                        aria-label="Attach files"
                                    />
                                    <button
                                        type="button"
                                        title="Insert link"
                                        disabled={sending}
                                        className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-lg transition-colors"
                                    >
                                        <Icon path={icons.link} size={17} />
                                    </button>
                                    <button
                                        type="button"
                                        title="Emoji"
                                        disabled={sending}
                                        className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-lg transition-colors"
                                    >
                                        <Icon path={icons.emoji} size={17} />
                                    </button>
                                    <button
                                        type="button"
                                        title="Google Drive"
                                        disabled={sending}
                                        className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-lg transition-colors"
                                    >
                                        <Icon path={icons.drive} size={17} />
                                    </button>
                                    <div className="w-px h-5 bg-gray-200 mx-1" />
                                    <button
                                        type="button"
                                        title="More options"
                                        disabled={sending}
                                        className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-lg transition-colors"
                                    >
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

            {/* Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                    onRetry={toast.type === "error" ? handleSend : undefined}
                />
            )}
        </>
    );
}