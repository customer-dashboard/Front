import express from "express";
import axios from "axios";
import FormData from "form-data";
import upload from "../middleware/upload.js";
import front from "../config/front.js";
import parseRecipients from "../utils/parseRecipients.js";

const router = express.Router();

router.post("/", upload.array("attachments"), async (req, res) => {
  try {
    const { from, subject, body } = req.body;

    const to = parseRecipients(req.body["to[]"] || req.body.to);
    const cc = parseRecipients(req.body["cc[]"] || req.body.cc);
    const bcc = parseRecipients(req.body["bcc[]"] || req.body.bcc);

    const files = req.files || [];

    if (files.length) {
      const form = new FormData();

      form.append("body", body || "");

      if (subject) form.append("subject", subject);

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
        `https://api2.frontapp.com/channels/${from}/messages`,
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

    const response = await front.createMessage(
      {
        to,
        subject,
        body,
        ...(cc.length && { cc }),
        ...(bcc.length && { bcc }),
        should_add_default_signature: true,
      },
      {
        channel_id: from,
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