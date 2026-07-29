import express from "express";
const router = express.Router();

import front from "../config/front.js";

router.get("/", async (req, res) => {
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

router.get("/:id/messages", async (req, res) => {
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

export default router;