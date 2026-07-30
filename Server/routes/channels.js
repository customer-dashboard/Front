import express from "express";
const router = express.Router();

import front from "../config/front.js";

router.get("/", async (req, res) => {
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

export default router;