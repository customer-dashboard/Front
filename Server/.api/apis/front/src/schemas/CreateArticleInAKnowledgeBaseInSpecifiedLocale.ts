const CreateArticleInAKnowledgeBaseInSpecifiedLocale = {
  "body": {
    "required": [
      "author_id",
      "subject",
      "content"
    ],
    "type": "object",
    "properties": {
      "category_id": {
        "type": "string",
        "description": "ID of the category this article belongs to"
      },
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
        "default": "draft",
        "description": "Article status"
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
          "knowledge_base_id": {
            "type": "string",
            "default": "knb_123",
            "description": "The ID of the knowledge base to create the article in"
          },
          "locale": {
            "type": "string",
            "default": "en",
            "description": "The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the article's content"
          }
        },
        "required": [
          "knowledge_base_id",
          "locale"
        ]
      }
    ]
  }
} as const;
export default CreateArticleInAKnowledgeBaseInSpecifiedLocale
