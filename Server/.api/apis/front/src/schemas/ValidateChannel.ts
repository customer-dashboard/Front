const ValidateChannel = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "channel_id": {
            "type": "string",
            "default": "cha_123",
            "description": "The Channel ID. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
          }
        },
        "required": [
          "channel_id"
        ]
      }
    ]
  },
  "response": {
    "202": {
      "type": "object",
      "properties": {
        "status": {
          "type": "string",
          "default": "accepted",
          "examples": [
            "accepted"
          ]
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ValidateChannel
