import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "../../proxy";
import ComposeModal from "../components/Composemodal";
import EmailViewModal from "../components/Emailviewmodal";
import { Link } from "react-router-dom";

// ─── Inline SVG Icons ────────────────────────────────────────────────────────
const SearchIcon = () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const PlusIcon = () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const CrossIcon = () => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const MailIcon = () => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

function Inbox() {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [channels, setChannels] = useState([]);
    const [open, setOpen] = useState(false);
    const [openEmailView, setOpenEmailView] = useState(false);
    const [activeConversationId, setActiveConversationId] = useState(null);

    // Search state
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    const [nextPageToken, setNextPageToken] = useState(null);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        fetchContacts();
        fetchChannels();
    }, []);

    // Debounced server-side search when searchQuery changes
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchConversations(null, false, searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Click outside handler for search suggestions
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/contacts`);
            setContacts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchConversations = async (pageToken = null, append = false, query = searchQuery) => {
        try {
            let url = `${API_URL}/api/conversations?limit=50`;
            if (pageToken) {
                url += `&page_token=${pageToken}`;
            }
            if (query && query.trim()) {
                url += `&q=${encodeURIComponent(query.trim())}`;
            }
            const response = await axios.get(url);

            const fetchedConvs = response.data.conversations || (Array.isArray(response.data) ? response.data : []);

            if (append) {
                setConversations((prev) => [...prev, ...fetchedConvs]);
            } else {
                setConversations(fetchedConvs);
            }

            if (response.data.next) {
                try {
                    const token = new URL(response.data.next).searchParams.get("page_token");
                    setNextPageToken(token);
                } catch {
                    setNextPageToken(null);
                }
            } else {
                setNextPageToken(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchChannels = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/channels`);
            setChannels(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getMessages = async (conversationId) => {
        try {
            const response = await axios.get(
                `${API_URL}/api/conversations/${conversationId}/messages`
            );
            setMessages(response.data);
            setCurrentIndex(0);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenEmail = (conversationId) => {
        setActiveConversationId(conversationId);
        getMessages(conversationId);
        setOpenEmailView(true);
        setShowSuggestions(false);
    };

    const handleReply = async (payload) => {
        const conversationId = activeConversationId || messages[0]?.conversation_id;
        if (!conversationId) {
            alert("Conversation ID not found.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("conversationId", conversationId);
            formData.append("body", payload.body);
            if (payload.subject) formData.append("subject", payload.subject);

            if (payload.to && payload.to.length) {
                payload.to.forEach((r) => {
                    formData.append("to[]", typeof r === "string" ? r : r.email);
                });
            }
            if (payload.cc && payload.cc.length) {
                payload.cc.forEach((r) => {
                    formData.append("cc[]", typeof r === "string" ? r : r.email);
                });
            }

            if (payload.attachments && payload.attachments.length) {
                payload.attachments.forEach((file) => {
                    formData.append("attachments", file);
                });
            }

            await axios.post(`${API_URL}/api/reply`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            await getMessages(conversationId);
        } catch (err) {
            console.error("Failed to send reply:", err);
            const errMsg = err.response?.data?.error || err.message || "Failed to send reply";
            alert(`Error sending reply: ${typeof errMsg === "object" ? JSON.stringify(errMsg) : errMsg}`);
            throw err;
        }
    };

    // Filter conversations: server handles query via q parameter when searching
    const filteredConversations = conversations;

    const getSenderDisplay = (conv) => {
        return (
            conv.last_message?.from?.name ||
            conv.last_message?.from?.email ||
            conv.recipient?.name ||
            conv.recipient?.handle ||
            "Unknown Sender"
        );
    };

    const getSenderEmail = (conv) => {
        return (
            conv.last_message?.from?.email ||
            conv.last_message?.from?.handle ||
            conv.recipient?.handle ||
            ""
        );
    };

    return (
        <div className="min-h-screen text-slate-800 p-4 md:p-8">
            {/* Header bar */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                            <MailIcon />
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Inbox</h1>
                    </div>

                    {/* Search & Compose container */}
                    <div className="flex items-center gap-3 flex-1 md:max-w-2xl justify-end">
                        {/* Search Bar with live suggestions dropdown */}
                        <div ref={searchRef} className="relative flex-1 max-w-lg">
                            <div className="relative flex items-center">
                                <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                                    <SearchIcon />
                                </span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                    placeholder="Search by email, subject, or message..."
                                    className="w-full pl-10 pr-9 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearchQuery("");
                                            setShowSuggestions(false);
                                            fetchConversations(null, false, "");
                                        }}
                                        className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200/60 transition-colors"
                                    >
                                        <CrossIcon />
                                    </button>
                                )}
                            </div>

                            {/* Search Suggestions Dropdown */}
                            {showSuggestions && searchQuery.trim() !== "" && (
                                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-40 max-h-[420px] overflow-y-auto divide-y divide-slate-100">
                                    <div className="px-4 py-2 bg-slate-50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                                        Search Suggestions ({filteredConversations.length})
                                    </div>
                                    {filteredConversations.length === 0 ? (
                                        <div className="p-6 text-center text-sm text-slate-500">
                                            No emails found matching &quot;{searchQuery}&quot;
                                        </div>
                                    ) : (
                                        filteredConversations.map((conv) => {
                                            const senderName = getSenderDisplay(conv);
                                            const senderEmail = getSenderEmail(conv);
                                            return (
                                                <div
                                                    key={conv.id}
                                                    onClick={() => handleOpenEmail(conv.id)}
                                                    className="p-3.5 hover:bg-blue-50/60 cursor-pointer transition-colors flex items-start gap-3 group"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                        {senderName.slice(0, 2).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className="text-xs font-semibold text-slate-800 truncate">
                                                                {senderName}
                                                            </span>
                                                            {senderEmail && (
                                                                <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                                                                    {senderEmail}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs font-medium text-slate-700 truncate mt-0.5">
                                                            {conv.subject || "(No Subject)"}
                                                        </div>
                                                        {conv.snippet && (
                                                            <div className="text-[11px] text-slate-500 truncate mt-0.5">
                                                                {conv.snippet}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                    {nextPageToken && (
                                        <div className="p-2.5 bg-slate-50 text-center border-t border-slate-100">
                                            <button
                                                type="button"
                                                disabled={loadingMore}
                                                onClick={async (e) => {
                                                    e.stopPropagation();
                                                    setLoadingMore(true);
                                                    await fetchConversations(nextPageToken, true);
                                                    setLoadingMore(false);
                                                }}
                                                className="text-xs text-blue-600 font-semibold hover:text-blue-700 transition-colors py-1 px-3 rounded-lg hover:bg-blue-50"
                                            >
                                                {loadingMore ? "Loading more..." : "Load more search results from server"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Compose Button */}
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-md shadow-blue-500/20 transition-all shrink-0"
                        >
                            <PlusIcon />
                            <span>Compose</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Compose Modal */}
            {open && (
                <ComposeModal
                    senderAccounts={channels}
                    open={open}
                    setOpen={setOpen}
                    contacts={contacts}
                />
            )}

            {/* Conversations List View */}
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-base font-semibold text-slate-800">
                        {searchQuery ? "Search Results" : "All Messages"}
                    </h2>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {filteredConversations.length} {filteredConversations.length === 1 ? "conversation" : "conversations"}
                    </span>
                </div>

                {filteredConversations.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 text-sm">
                        No conversations found.
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filteredConversations.map((conversation) => {
                            const senderName = getSenderDisplay(conversation);
                            const senderEmail = getSenderEmail(conversation);
                            return (
                                <div
                                    key={conversation.id}
                                    onClick={() => handleOpenEmail(conversation.id)}
                                    className="p-5 hover:bg-slate-50/80 cursor-pointer transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                                >
                                    <div className="flex items-start gap-4 flex-1 min-w-0">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            {senderName.slice(0, 2).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-slate-900 truncate">
                                                    {senderName}
                                                </span>
                                                {senderEmail && (
                                                    <span className="text-xs text-slate-400 truncate">
                                                        &lt;{senderEmail}&gt;
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm font-medium text-slate-800 truncate mt-0.5">
                                                {conversation.subject || "(No Subject)"}
                                            </div>
                                            {conversation.snippet && (
                                                <p className="text-xs text-slate-500 truncate mt-1">
                                                    {conversation.snippet}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenEmail(conversation.id);
                                        }}
                                        className="px-4 py-2 bg-slate-100 group-hover:bg-blue-600 text-slate-700 group-hover:text-white text-xs font-semibold rounded-xl transition-all self-start md:self-center shrink-0"
                                    >
                                        Open Email
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {nextPageToken && (
                    <div className="p-4 text-center border-t border-slate-100 bg-slate-50/50">
                        <button
                            type="button"
                            disabled={loadingMore}
                            onClick={async () => {
                                setLoadingMore(true);
                                await fetchConversations(nextPageToken, true);
                                setLoadingMore(false);
                            }}
                            className="px-5 py-2.5 bg-white hover:bg-slate-100 text-blue-600 font-semibold text-xs rounded-xl border border-slate-200 shadow-sm transition-all inline-flex items-center gap-2 disabled:opacity-50"
                        >
                            {loadingMore ? "Loading..." : "Load More Conversations"}
                        </button>
                    </div>
                )}
            </div>

            {/* Email View Modal (hidden by default until mail selected) */}
            {openEmailView && (
                <EmailViewModal
                    open={openEmailView}
                    onClose={() => setOpenEmailView(false)}
                    messages={messages}
                    subject={
                        conversations.find((c) => c.id === activeConversationId)?.subject ||
                        messages[0]?.subject ||
                        ""
                    }
                    senderAccounts={channels}
                    onSend={handleReply}
                />
            )}
        </div>
    );
}

export default Inbox;