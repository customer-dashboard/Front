import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../proxy";
import ComposeModal from "../components/Composemodal";
import EmailViewModal from "../components/Emailviewmodal";

function Inbox() {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([])
    const [contacts, setContacts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [channels, setChannels] = useState([]);
    const [open, setOpen] = useState(false);
    const [openEmailView, setOpenEmailView] = useState(false);

    const [activeConversationId, setActiveConversationId] = useState(null);

    useEffect(() => {
        fetchContacts();
        fetchConversations();
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/contacts`);
            setContacts(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    const fetchConversations = async () => {
        try {
            const response = await axios.get(
                `${API_URL}/api/conversations`
            );

            setConversations(response.data);
        } catch (error) {
            console.error(error);
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

    const message = messages[currentIndex];

    const cidMap = {};

    // console.log("message", message);
    if (!message);
    message?.attachments.forEach((att) => {
        if (att.metadata?.cid) {
            cidMap[att.metadata.cid] = att.id;
        }
    });

    const parser = new DOMParser();
    const doc = parser.parseFromString(message?.body, "text/html");

    doc.querySelectorAll("img").forEach((img) => {
        const cid = img.getAttribute("front-cid");

        if (cid && cidMap[cid]) {
            img.src = `${API_URL}/api/attachments/${cidMap[cid]}`;
        }
    });

    const body = doc.body.innerHTML;

    useEffect(() => {
        axios
            .get(`${API_URL}/api/channels`)
            .then((res) => setChannels(res.data));
    }, []);

    const handleReply = async (payload) => {
        const conversationId = activeConversationId || messages[0]?.conversation_id;
        if (!conversationId) {
            alert("Conversation ID not found.");
            return;
        }

        try {
            await axios.post(`${API_URL}/api/reply`, {
                conversationId,
                body: payload.body,
                to: payload.to,
                cc: payload.cc,
                subject: payload.subject,
            });

            await getMessages(conversationId);
        } catch (err) {
            console.error("Failed to send reply:", err);
            const errMsg = err.response?.data?.error || err.message || "Failed to send reply";
            alert(`Error sending reply: ${typeof errMsg === "object" ? JSON.stringify(errMsg) : errMsg}`);
            throw err;
        }
    };

    return (
        <div>
            <button type="button" onClick={() => setOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">compose</button>
            {open && (
                <ComposeModal senderAccounts={channels} open={open} setOpen={setOpen} contacts={contacts} />
            )}
            <h2>Inbox</h2>
            {conversations.map((conversation) => (
                <div key={conversation.id}>
                    <div className="md:flex">
                        <div className="mt-4 md:mt-0 md:ml-6">
                            <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">{conversation.subject}</div>
                            <button
                                onClick={() => {
                                    setActiveConversationId(conversation.id);
                                    setOpenEmailView(true);
                                    getMessages(conversation.id);
                                }}
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Open Email Popup
                            </button>

                        </div>
                    </div>

                </div>
            ))}
            {openEmailView && (
                <EmailViewModal
                    open={openEmailView}
                    onClose={() => setOpenEmailView(false)}
                    messages={messages}
                    subject={conversations.find((c) => c.id === activeConversationId)?.subject || messages[0]?.subject || ""}
                    senderAccounts={channels}
                    onSend={handleReply}
                />
            )}


        </div>
    );
}

export default Inbox;