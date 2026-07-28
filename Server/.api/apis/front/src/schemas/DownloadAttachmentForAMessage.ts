const DownloadAttachmentForAMessage = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "message_id": {
            "type": "string",
            "default": "msg_12345",
            "description": "The Message ID"
          },
          "attachment_link_id": {
            "type": "string",
            "default": "fil_55c8c149",
            "description": "The Attachment ID"
          }
        },
        "required": [
          "message_id",
          "attachment_link_id"
        ]
      }
    ]
  },
  "response": {
    "200": {
      "type": "string",
      "format": "binary",
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default DownloadAttachmentForAMessage
