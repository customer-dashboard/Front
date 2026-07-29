import express from "express";
import axios from "axios";
import FormData from "form-data";
import upload from "../middleware/upload.js";
import front from "../config/front.js";
import parseRecipients from "../utils/parseRecipients.js";

const router = express.Router();

router.post("/", upload.array("attachments"), async (req, res) => {
  try {
    const { conversationId, body, subject, archive } = req.body;

    const to = parseRecipients(req.body["to[]"] || req.body.to);
    const cc = parseRecipients(req.body["cc[]"] || req.body.cc);
    const bcc = parseRecipients(req.body["bcc[]"] || req.body.bcc);

    if (!conversationId || !body) {
      return res.status(400).json({
        success: false,
        error: "conversationId and body are required.",
      });
    }

    const files = req.files || [];

    if (files.length) {
      const form = new FormData();

      form.append("body", body);

      if (subject) form.append("subject", subject);

      if (archive === "true" || archive === true) {
        form.append("options[archive]", "true");
      }

      to.forEach((email) => form.append("to[]", email));
      cc.forEach((email) => form.append("cc[]", email));
      bcc.forEach((email) => form.append("bcc[]", email));

      files.forEach((file) => {
        form.append("attachments", file.buffer, {
          filename: file.originalname,
          contentType: file.mimetype,
        });
      });

      const response = await axios.post(
        `https://api2.frontapp.com/conversations/${conversationId}/messages`,
        form,
        {
          headers: {
            Authorization: `Bearer ${process.env.FRONT_API_TOKEN}`,
            ...form.getHeaders(),
          },
        }
      );

      return res.json(response.data);
    }

    const response = await front.createMessageReply(
      {
        body,
        ...(to.length && { to }),
        ...(cc.length && { cc }),
        ...(bcc.length && { bcc }),
        ...(subject && { subject }),
        options: {
          archive: archive === "true" || archive === true,
        },
      },
      {
        conversation_id: conversationId,
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      error: err.response?.data || err.message,
    });
  }
});

export default router;