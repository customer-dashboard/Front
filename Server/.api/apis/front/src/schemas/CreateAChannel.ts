const CreateAChannel = {
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
  }
} as const;
export default CreateAChannel
