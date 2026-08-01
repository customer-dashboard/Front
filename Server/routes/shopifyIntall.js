import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import front from "../config/front.js";

dotenv.config();

const router = express.Router();

const requiredEnv = [
    "FRONT_API_TOKEN",
    "FRONT_AUTHOR_ID",
    "FRONT_AWAITING_TAG_ID",
    "FRONT_OPEN_TAG_ID",
    "FRONT_TEMPLATE_ID",
];

for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
}

router.post("/api/shopify/install", async (req, res) => {
    try {
        const { email, shopName } = req.body;

        // Get template from Front
        const { data: template } = await front.getMessageTemplate({
            message_template_id: process.env.FRONT_TEMPLATE_ID,
        });

        // Replace variables
        const subject = template.subject;

        const body = template.body.replaceAll(
            "{{shop_name}}",
            shopName
        );

        // Send email using Create Message API
        const { data } = await axios.post(
            `https://api2.frontapp.com/channels/${process.env.FRONT_CHANNEL_ID}/messages`,
            {
                author_id: process.env.FRONT_AUTHOR_ID,

                to: [email],

                subject,
                body,

                should_add_default_signature: true,

                options: {
                    archive: false,
                    tag_ids: [
                        process.env.FRONT_OPEN_TAG_ID,
                        process.env.FRONT_AWAITING_TAG_ID,
                    ],
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.FRONT_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Front Response:", data);

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        console.error(error.response?.data || error);

        res.status(500).json({
            success: false,
            error: error.response?.data || error.message,
        });
    }
});

export default router;