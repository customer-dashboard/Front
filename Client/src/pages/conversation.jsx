import React, { useState, useEffect } from 'react';
import { API_URL } from '../../proxy';
import axios from 'axios';

const Conversation = () => {
    const [conversations, setConversations] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [prevTokens, setPrevTokens] = useState([]); // stack of previous page tokens
    const [currentPageToken, setCurrentPageToken] = useState(null);

    // Fetch conversations. If `replace` is true, replace the list; otherwise append (load more).
    const fetchConversations = async (pageToken = null, replace = false) => {
        try {
            const url = pageToken
                ? `${API_URL}/api/conversation?page_token=${pageToken}`
                : `${API_URL}/api/conversation`;
            const response = await axios.get(url);

            if (replace) {
                setConversations(response.data.conversations);
            } else {
                setConversations((prev) => [...prev, ...response.data.conversations]);
            }

            // Update pagination tokens
            setCurrentPageToken(pageToken);
            if (response.data.next) {
                const token = new URL(response.data.next).searchParams.get('page_token');
                setNextPageToken(token);
            } else {
                setNextPageToken(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Navigation handlers
    const handlePrev = () => {
        if (prevTokens.length === 0) return;
        const token = prevTokens[prevTokens.length - 1];
        setPrevTokens((prev) => prev.slice(0, -1));
        fetchConversations(token, true);
    };

    const handleNext = () => {
        if (!nextPageToken) return;
        setPrevTokens((prev) => [...prev, currentPageToken]);
        fetchConversations(nextPageToken, true);
    };

    // Initial load – replace existing list
    useEffect(() => {
        fetchConversations(null, true);
    }, []);

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

    // Placeholder for opening an email – keep existing reference if defined elsewhere
    const handleOpenEmail = (id) => {
        // TODO: implement opening email modal if needed
        console.log('Open email', id);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Conversation</h1>
            <p>Welcome to our conversation page!</p>
            {/* Pagination controls at the top */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={handlePrev}
                    disabled={prevTokens.length === 0}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded"
                >
                    Prev
                </button>
                <button
                    onClick={handleNext}
                    disabled={!nextPageToken}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded"
                >
                    Next
                </button>
            </div>
            {conversations.map((conv) => {
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
            })}
            {/* Load more button at the bottom */}
            {nextPageToken && (
                <button onClick={() => fetchConversations(nextPageToken, false)} className="mt-4 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded">
                    Load More
                </button>
            )}
        </div>
    );
};

export default Conversation;
