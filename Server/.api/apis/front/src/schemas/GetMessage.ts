const GetMessage = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "message_id": {
            "type": "string",
            "default": "msg_123",
            "description": "The message ID"
          }
        },
        "required": [
          "message_id"
        ]
      }
    ]
  }
} as const;
export default GetMessage
