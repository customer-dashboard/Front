const KnowledgeBaseResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "name",
    "status",
    "type",
    "locale"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/knowledge_bases/knb_12"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "articles": {
              "type": "string",
              "description": "Link to articles associated to the knowledge base",
              "examples": [
                "https://yourCompany.api.frontapp.com/knowledge_bases/knb_12/articles"
              ]
            },
            "categories": {
              "type": "string",
              "description": "Link to categories associated to the knowledge base",
              "examples": [
                "https://yourCompany.api.frontapp.com/knowledge_bases/knb_12/categories"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the knowledge base",
      "examples": [
        "knb_12"
      ]
    },
    "name": {
      "type": "string",
      "description": "Knowledge base name",
      "examples": [
        "Company Help Center"
      ]
    },
    "status": {
      "type": "string",
      "enum": [
        "published",
        "unpublished"
      ],
      "description": "Status of the KB\n\n`published` `unpublished`",
      "examples": [
        "unpublished"
      ]
    },
    "type": {
      "type": "string",
      "enum": [
        "internal",
        "external"
      ],
      "description": "Type of the KB\n\n`internal` `external`",
      "examples": [
        "internal"
      ]
    },
    "locale": {
      "type": "string",
      "enum": [
        "fr",
        "en"
      ],
      "description": "Locale of this requested KB\n\n`fr` `en`",
      "examples": [
        "en"
      ]
    },
    "created_at": {
      "type": "number",
      "description": "Timestamp when the knowledge base was created",
      "examples": [
        1622672452.363
      ]
    },
    "updated_at": {
      "type": "number",
      "description": "Timestamp when the knowledge base was updated",
      "examples": [
        1654309308.278
      ]
    }
  },
  "title": "KnowledgeBaseResponse",
  "x-readme-ref-name": "KnowledgeBaseResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default KnowledgeBaseResponse
