const DownloadAttachmentForAMessageTemplate = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "message_template_id": {
            "type": "string",
            "default": "rsp_1v3ef",
            "description": "The Message Template ID"
          },
          "attachment_link_id": {
            "type": "string",
            "default": "fil_55c8c149",
            "description": "The Attachment ID"
          }
        },
        "required": [
          "message_template_id",
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
export default DownloadAttachmentForAMessageTemplate
