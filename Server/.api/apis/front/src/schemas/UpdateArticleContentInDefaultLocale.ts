const UpdateArticleContentInDefaultLocale = {
  "body": {
    "required": [
      "author_id",
      "content"
    ],
    "type": "object",
    "properties": {
      "author_id": {
        "type": "string",
        "description": "Teammate ID of the article author"
      },
      "subject": {
        "type": "string",
        "description": "Subject of the article"
      },
      "content": {
        "type": "string",
        "description": "HTML content of the article"
      },
      "status": {
        "type": "string",
        "enum": [
          "draft",
          "published"
        ],
        "description": "Article status",
        "default": "draft"
      }
    },
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "article_id": {
            "type": "string",
            "default": "kba_123",
            "description": "The ID of the article to update"
          }
        },
        "required": [
          "article_id"
        ]
      }
    ]
  }
} as const;
export default UpdateArticleContentInDefaultLocale
