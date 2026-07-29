import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
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

export default router;