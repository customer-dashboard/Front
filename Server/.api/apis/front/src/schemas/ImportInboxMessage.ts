const ImportInboxMessage = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "inbox_id": {
            "type": "string",
            "default": "inb_123",
            "description": "The Inbox ID"
          }
        },
        "required": [
          "inbox_id"
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
          "description": "The status of the incoming message. Should return 'accepted' if successful.",
          "examples": [
            "accepted"
          ]
        },
        "message_uid": {
          "type": "string",
          "description": "Message unique identifier. Use the message UID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1) to check whether the [message is created successfully](https://dev.frontapp.com/reference/messages#creating-a-new-message).",
          "examples": [
            "1eab543f84a0785f7b6b8967cck18f4d"
          ]
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ImportInboxMessage
