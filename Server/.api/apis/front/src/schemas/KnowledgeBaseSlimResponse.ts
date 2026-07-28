const KnowledgeBaseSlimResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "type",
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
    "locales": {
      "type": "array",
      "description": "List of the KB's possible locales",
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
  "title": "KnowledgeBaseSlimResponse",
  "x-readme-ref-name": "KnowledgeBaseSlimResponse"
} as const;
export default KnowledgeBaseSlimResponse
