import express from "express";
const router = express.Router();

import front from "../config/front.js";

router.get("/", async (req, res) => {
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

export default router;