const KnowledgeBaseCategorySlimResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "slug",
    "is_hidden",
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
            "https://yourCompany.api.frontapp.com/knowledge_base_categories/kbc_12"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "knowledge_base": {
              "type": "string",
              "description": "Link to the category's knowledge base",
              "examples": [
                "https://yourCompany.api.frontapp.com/knowledge_bases/knb_12"
              ]
            },
            "parent_category": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to the category's parent",
              "examples": [
                "https://yourCompany.api.frontapp.com/knowledge_base_catgories/kbc_10"
              ]
            },
            "articles": {
              "type": "string",
              "description": "Link to articles in this category",
              "examples": [
                "https://yourCompany.api.frontapp.com/knowledge_base_categories/kbc_12/articles"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the knowledge base category",
      "examples": [
        "kbc_12"
      ]
    },
    "slug": {
      "type": "string",
      "description": "URL slug of the category. Construct the full URL using the template of protocol/knowledge base domain/locale/slug, such as https://yourDomain.com/en/categories/2",
      "examples": [
        "/categories/2"
      ]
    },
    "is_hidden": {
      "type": "boolean",
      "description": "Is the category hidden from navigation and breadcrumbs (topics are accessed as direct links)",
      "examples": [
        false
      ]
    },
    "locales": {
      "type": "array",
      "description": "List of the locales the category supports",
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
      "description": "Timestamp when the category was created",
      "examples": [
        1622672452.363
      ]
    },
    "updated_at": {
      "type": "number",
      "description": "Timestamp when the category was updated",
      "examples": [
        1654309308.278
      ]
    }
  },
  "title": "KnowledgeBaseCategorySlimResponse",
  "x-readme-ref-name": "KnowledgeBaseCategorySlimResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default KnowledgeBaseCategorySlimResponse
