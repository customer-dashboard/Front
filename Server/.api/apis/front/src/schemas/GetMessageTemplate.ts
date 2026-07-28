const GetMessageTemplate = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "message_template_id": {
            "type": "string",
            "default": "rsp_123",
            "description": "The message template ID"
          }
        },
        "required": [
          "message_template_id"
        ]
      }
    ]
  }
} as const;
export default GetMessageTemplate
