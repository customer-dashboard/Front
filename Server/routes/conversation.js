import express from "express";
const router = express.Router();

import front from "../config/front.js";

router.get("/", async (req, res) => {
  try {
    const { page_token } = req.query;
    console.log("page_token", page_token);
    const { data } = await front.listConversations({
      limit: 50,
      ...(page_token && { page_token }),
    });

    res.json({
      conversations: data._results,
      next: data._pagination?.next || null,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;