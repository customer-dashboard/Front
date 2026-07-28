const DownloadAttachment = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "attachment_link_id": {
            "type": "string",
            "default": "fil_55c8c149",
            "description": "The Attachment ID"
          }
        },
        "required": [
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
export default DownloadAttachment
