const DownloadAttachmentFromAnArticle = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "article_id": {
            "type": "string",
            "default": "kba_123",
            "description": "The ID of the article"
          },
          "attachment_id": {
            "type": "string",
            "description": "The ID of the file to download"
          }
        },
        "required": [
          "article_id",
          "attachment_id"
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
export default DownloadAttachmentFromAnArticle
