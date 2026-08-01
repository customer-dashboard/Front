import fs from "fs/promises";
import path from "path";
import express from "express";
const router = express.Router();

const templatePath = path.join(process.cwd(), "data", "installTemplate.json");

router.post("/", async (req, res) => {
    const { payload } = req.body;
    try {
        await fs.writeFile(
            templatePath,
            JSON.stringify(payload, null, 2),
            "utf8"
        );

        res.json({
            success: true,
            message: "Template saved successfully."
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await fs.readFile(templatePath, "utf8");

        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});


export default router;