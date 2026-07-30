import express from "express";
import front from "../config/front.js";

const router = express.Router();

let contactsCache = null;
let lastFetchTime = 0;
const CACHE_TTL = 3 * 60 * 1000; // 3 minutes cache

async function getAllContacts(refresh = false) {
  const now = Date.now();
  if (!refresh && contactsCache && now - lastFetchTime < CACHE_TTL) {
    return contactsCache;
  }

  let allContacts = [];
  let pageToken = null;
  let hasMore = true;
  let pageCount = 0;
  const MAX_PAGES = 20; // Fetch up to 2000 contacts across pages

  while (hasMore && pageCount < MAX_PAGES) {
    pageCount++;
    try {
      const { data } = await front.listContacts({
        limit: 100,
        ...(pageToken && { page_token: pageToken }),
      });

      const pageResults = (data._results || [])
        .map((contact) => ({
          name: contact.name || "",
          email:
            contact.handles?.find((h) => h.source === "email")?.handle ||
            contact.handles?.[0]?.handle ||
            "",
        }))
        .filter((c) => c.name || c.email);

      allContacts = allContacts.concat(pageResults);

      if (data._pagination?.next) {
        try {
          const nextUrl = new URL(data._pagination.next);
          pageToken = nextUrl.searchParams.get("page_token");
          if (!pageToken) hasMore = false;
        } catch {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    } catch (err) {
      console.error("Error fetching page of contacts:", err.message);
      hasMore = false;
    }
  }

  if (allContacts.length > 0) {
    contactsCache = allContacts;
    lastFetchTime = now;
  }
  return contactsCache || allContacts;
}

router.get("/", async (req, res) => {
  try {
    const { q, refresh } = req.query;

    const allContacts = await getAllContacts(refresh === "true");

    if (q && q.trim()) {
      const qLower = q.trim().toLowerCase();
      const filtered = allContacts.filter(
        (c) =>
          c.name.toLowerCase().includes(qLower) ||
          c.email.toLowerCase().includes(qLower)
      );

      return res.status(200).json({
        contacts: filtered.slice(0, 50),
        total: filtered.length,
        next: null,
      });
    }

    res.status(200).json({
      contacts: allContacts.slice(0, 50),
      total: allContacts.length,
      next: null,
    });
  } catch (error) {
    console.error("Error in /api/contacts:", error.response?.data || error.message || error);

    res.status(500).json({
      message: "Unable to fetch contacts",
      error: error.response?.data?.message || error.message,
    });
  }
});

export default router;