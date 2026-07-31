import express from "express";
import front from "../config/front.js";

const router = express.Router();

router.post("/api/shopify/install", async (req, res) => {
    try {
        const { shop, email, shopName } = req.body;

        console.log("Shop:", shop, "Email:", email, "Shop Name:", shopName);

        const { data } = await front.createMessage(
            {
                author_id: "tea_oymlk",
                to: [email],
                cc: [],
                bcc: [],
                sender_name: "Custlo Support",
                subject: "[TEST] Welcome to Custlo",
                body: `<p>Thank you for installing the Custlo app. Testing webhook api</p>`,
                should_add_default_signature: true,
                options: {
                    archive: false,             // Keep conversation open
                    tag_ids: ["tag_6t8tuw", "tag_6t8t7s"],    // Replace with your Awaiting tag ID
                },
            },
            {
                channel_id: "cha_o89uw",
            }
        );

        console.log("Front Response:", data);

        const conversationUrl = data._links.related.conversation;

        const conversationId = conversationUrl.split("/").pop();

        console.log("conversationId", conversationId);
        console.log("conversationUrl", conversationUrl);

        await front.updateConversation(
            {
                status: "open",
            },
            {
                conversation_id: conversationId,
            }
        );

        const { data: conversation } = await front.getConversation({
            conversation_id: conversationId,
        });

        console.log("Conversation Status:", conversation.status);
        console.log("Conversation Inbox:", conversation.inbox);
        console.log("Conversation Tags:", conversation.tags);
        console.log(conversation);

        res.status(200).json({
            success: true,
            message: "Email sent successfully.",
            data,
        });
    } catch (error) {
        console.error("Front Error:", error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: error.response?.data || error.message,
        });
    }
});

export default router;