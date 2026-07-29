import express from "express";
import axios from "axios";
import front from "../config/front.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { page_token, q } = req.query;

    if (q && q.trim()) {
      const rawQuery = q.trim();
      const searchTerm = rawQuery.endsWith("*") ? rawQuery : `${rawQuery}*`;

      try {
        const searchUrl = page_token
          ? `https://api2.frontapp.com/conversations/search/${encodeURIComponent(searchTerm)}?page_token=${page_token}`
          : `https://api2.frontapp.com/conversations/search/${encodeURIComponent(searchTerm)}`;

        const response = await axios.get(searchUrl, {
          headers: {
            Authorization: `Bearer ${process.env.FRONT_API_TOKEN}`,
          },
        });

        return res.status(200).json({
          conversations: response.data._results || [],
          next: response.data._pagination?.next || null,
        });
      } catch (searchError) {
        console.warn("Front search endpoint warning, falling back to list:", searchError.response?.data || searchError.message);
      }
    }

    const { data } = await front.listConversations({
      limit: 50,
      ...(page_token && { page_token }),
    });

    let results = data._results || [];

    if (q && q.trim()) {
      const qLower = q.trim().toLowerCase();
      results = results.filter((c) => {
        return JSON.stringify(c).toLowerCase().includes(qLower);
      });
    }

    res.status(200).json({
      conversations: results,
      next: data._pagination?.next || null,
    });
  } catch (error) {
    console.error("Error in /api/conversations:", error.response?.data || error.message || error);

    res.status(500).json({
      message: "Unable to fetch conversations",
      error: error.response?.data?.message || error.message,
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