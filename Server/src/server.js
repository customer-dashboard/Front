import express from "express";
import cors from "cors";
import front from '@api/front';
import axios from "axios";
import dotenv from "dotenv";
import multer from "multer";
import FormData from "form-data";

dotenv.config();

const upload = multer({
  storage: multer.memoryStorage(),
});
front.auth(process.env.FRONT_API_TOKEN);

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/reply", async (req, res) => {
  try {
    const {
      conversationId,
      body,
      text,
      to,
      cc,
      bcc,
      subject,
      attachments = [],
      archive = false,
    } = req.body;

    if (!conversationId || !body) {
      return res.status(400).json({
        success: false,
        error: "conversationId and body are required.",
      });
    }

    const replyPayload = {
      body,
      ...(text && { text }),
      ...(to?.length && { to: to.map((r) => (typeof r === "string" ? r : r.email)) }),
      ...(cc?.length && { cc: cc.map((r) => (typeof r === "string" ? r : r.email)) }),
      ...(bcc?.length && { bcc: bcc.map((r) => (typeof r === "string" ? r : r.email)) }),
      ...(subject && { subject }),
      ...(attachments?.length && { attachments }),
      options: {
        archive,
      },
    };

    const response = await front.createMessageReply(
      replyPayload,
      {
        conversation_id: conversationId,
      }
    );

    res.status(200).json(response.data || { success: true });
  } catch (err) {
    console.error("Error sending reply:", err.response?.data || err.data || err.message || err);
    res.status(500).json({
      success: false,
      error: err.response?.data || err.message || "Failed to send reply",
    });
  }
});


app.post("/api/send", async (req, res) => {
  try {
    const { from, to, subject, body, attachments } = req.body;

    const response = await front.createMessage(
      {
        to: to.map((recipient) => recipient.email),

        subject,
        body,

        // optional
        cc: [],
        bcc: [],
        attachments:
          attachments?.length > 0
            ? attachments
            : undefined,

        should_add_default_signature: true,
      },
      {
        channel_id: from,
      }
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error(
      err.response?.data || err.data || err.message || err
    );

    res.status(500).json({
      success: false,
      error: err.response?.data || err.message,
    });
  }
});

app.get("/api/channels", async (req, res) => {
  try {
    const { data } = await front.listChannels();

    // Only channels that can send email
    const channels = data._results
      .filter(
        (channel) =>
          channel.is_valid &&
          (channel.type === "gmail" ||
            channel.type === "outlook" ||
            channel.type === "imap")
      )
      .map((channel) => ({
        id: channel.id,
        name: channel.name,
        address: channel.address,
        send_as: channel.send_as,
      }));

    res.json(channels);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Unable to fetch channels",
    });
  }
});

// Get all conversations
app.get("/api/conversations", async (req, res) => {
  try {
    const { data } = await front.listConversations();

    res.status(200).json(data._results);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch conversations",
      error: error.message,
    });
  }
});

app.get("/api/contacts", async (req, res) => {
  try {
    const { data } = await front.listContacts();

    const contacts = data._results.map((contact) => ({
      name: contact.name,
      email:
        contact.handlest?.find((h) => h.source === "email")?.handle ||
        contact.handles?.[0]?.handle ||
        "",
    }));

    res.json(contacts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch contacts",
      error: error.message,
    });
  }
});

// Get messages of a conversation
app.get("/api/conversations/:id/messages", async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await front.listConversationMessages({
      conversation_id: id,
      // limit: 1,
    });
    res.status(200).json(data._results);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch messages",
      error: error.message,
    });
  }
});

app.get("/api/attachments/:attachmentId", async (req, res) => {
  try {
    const { attachmentId } = req.params;

    const response = await fetch(
      `https://api2.frontapp.com/download/${attachmentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FRONT_API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).send(error);
    }

    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/octet-stream"
    );

    if (response.headers.get("content-length")) {
      res.setHeader(
        "Content-Length",
        response.headers.get("content-length")
      );
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to download attachment",
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Server is running 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});