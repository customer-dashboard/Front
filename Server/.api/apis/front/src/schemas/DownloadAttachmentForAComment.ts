const DownloadAttachmentForAComment = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "comment_id": {
            "type": "string",
            "default": "com_1v3ef",
            "description": "The Comment ID"
          },
          "attachment_link_id": {
            "type": "string",
            "default": "fil_55c8c149",
            "description": "The Attachment ID"
          }
        },
        "required": [
          "comment_id",
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
export default DownloadAttachmentForAComment
