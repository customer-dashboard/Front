const AddConversationFollowers = {
  "body": {
    "type": "object",
    "properties": {
      "teammate_ids": {
        "description": "IDs of the teammate to add to the followers list. Alternatively, you can supply the teammates as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
        "type": "array",
        "maxItems": 50,
        "items": {
          "type": "string"
        }
      }
    },
    "required": [
      "teammate_ids"
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
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "ignore_errors": {
            "type": "boolean",
            "default": false,
            "description": "Whether to ignore invalid teammate IDs and continue adding valid ones."
          }
        }
      }
    ]
  }
} as const;
export default AddConversationFollowers
