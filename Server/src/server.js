import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Import routes and requests api
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

// Get all channels
app.use("/api/channels", channelsRouter);

// Get all contacts
app.use("/api/contacts", contactsRouter);

// Get all frond images
app.use("/api/attachments/:attachmentId", attachmentsRouter);

// Serve static assets from Client dist if present
const clientDistPath = path.resolve(__dirname, "../../Client/dist");
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.json({ message: "Server is running 🚀" });
  });
}

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});