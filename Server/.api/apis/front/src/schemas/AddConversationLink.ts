const AddConversationLink = {
  "body": {
    "type": "object",
    "properties": {
      "link_ids": {
        "description": "Link IDs to add. Either link_ids or link_external_urls must be specified but not both",
        "type": "array",
        "maxItems": 10,
        "items": {
          "type": "string"
        }
      },
      "link_external_urls": {
        "description": "Link external URLs to add. Creates links if necessary. Either link_ids or link_external_urls must be specified but not both",
        "type": "array",
        "maxItems": 10,
        "items": {
          "type": "string"
        }
      }
    },
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
export default AddConversationLink
