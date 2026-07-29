import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Import routes and requests api
import conversationRouter from "../routes/conversation.js";
import conversationsRouter from "../routes/conversations.js";
import channelsRouter from "../routes/channels.js";
import contactsRouter from "../routes/contacts.js";
import attachmentsRouter from "../routes/attachments.js";
import sendRouter from "../routes/send.js";
import replyRouter from "../routes/reply.js";

// Reply and send messages
app.use("/api/send", sendRouter);
app.use("/api/reply", replyRouter);

// Get all conversations
app.use("/api/conversations", conversationsRouter);

// pagination conversation
app.use("/api/conversation", conversationRouter);

// Get all channels
app.use("/api/channels", channelsRouter);

// Get all contacts
app.use("/api/contacts", contactsRouter);

// Get all frond images
app.use("/api/attachments/:attachmentId", attachmentsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Server is running 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});