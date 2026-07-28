const KnowledgeBaseArticleSlimResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "slug",
    "locales"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/knowledge_base_articles/kba_12"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "knowledge_base": {
              "type": "string",
              "description": "Link to the article's knowledge base",
              "examples": [
                "https://yourCompany.api.frontapp.com/knowledge_bases/knb_12"
              ]
            },
            "category": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to the article's category",
              "examples": [
                "https://yourCompany.api.frontapp.com/knowledge_base_category/kbc_12"
              ]
            },
            "content": {
              "type": "string",
              "description": "Link to the article's content",
              "examples": [
                "https://yourCompany.api.frontapp.com/knowledge_base_articles/kba_12/content"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the knowledge base article",
      "examples": [
        "kba_12"
      ]
    },
    "slug": {
      "type": "string",
      "description": "URL slug of the article. Construct the full URL using the template of protocol/knowledge base domain/locale/slug, such as https://yourDomain.com/en/articles/5",
      "examples": [
        "/articles/5"
      ]
    },
    "locales": {
      "type": "array",
      "description": "List of the locales the article supports",
      "items": {
        "type": "string",
        "examples": [
          "en",
          "es"
        ]
      }
    },
    "created_at": {
      "type": "number",
      "description": "Timestamp when the article was created",
      "examples": [
        1622672452.363
      ]
    },
    "updated_at": {
      "type": "number",
      "description": "Timestamp when the article was updated",
      "examples": [
        1654309308.278
      ]
    }
  },
  "title": "KnowledgeBaseArticleSlimResponse",
  "x-readme-ref-name": "KnowledgeBaseArticleSlimResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default KnowledgeBaseArticleSlimResponse
