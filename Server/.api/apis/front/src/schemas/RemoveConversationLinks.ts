const RemoveConversationLinks = {
  "body": {
    "type": "object",
    "properties": {
      "link_ids": {
        "description": "Link IDs to remove.",
        "type": "array",
        "maxItems": 10,
        "items": {
          "type": "string"
        }
      }
    },
    "required": [
      "link_ids"
    ],
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "conversation_id": {
            "type": "string",
            "default": "cnv_123",
            "description": "The conversation ID"
          }
        },
        "required": [
          "conversation_id"
        ]
      }
    ]
  }
} as const;
export default RemoveConversationLinks
