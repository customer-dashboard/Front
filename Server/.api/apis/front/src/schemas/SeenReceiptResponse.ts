const SeenReceiptResponse = {
  "type": "object",
  "required": [
    "_links",
    "first_seen_at",
    "seen_by"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to self",
          "examples": [
            "https://yourCompany.api.frontapp.com/messages/msg_1p4lvjym/seen"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "description": "Link to message associated with the seen record",
              "examples": [
                "https://yourCompany.api.frontapp.com/messages/msg_1p4lvjym"
              ]
            }
          }
        }
      }
    },
    "first_seen_at": {
      "type": "string",
      "description": "Timestamp when message was seen",
      "examples": [
        1701298738269
      ]
    },
    "seen_by": {
      "type": [
        "object",
        "null"
      ],
      "required": [
        "handle",
        "source"
      ],
      "properties": {
        "handle": {
          "type": "string",
          "description": "Handle used to reach the contact.",
          "examples": [
            "dwight@limitlesspaper.com"
          ]
        },
        "source": {
          "type": "string",
          "enum": [
            "twitter",
            "email",
            "phone",
            "facebook",
            "intercom",
            "front_chat",
            "custom"
          ],
          "description": "Source of the handle. Can be `email`, `phone`, `twitter`, `facebook`, `intercom`, `front_chat`, or `custom`.\n\n`twitter` `email` `phone` `facebook` `intercom` `front_chat` `custom`",
          "examples": [
            "email"
          ]
        }
      }
    }
  },
  "title": "SeenReceiptResponse",
  "x-readme-ref-name": "SeenReceiptResponse"
} as const;
export default SeenReceiptResponse
