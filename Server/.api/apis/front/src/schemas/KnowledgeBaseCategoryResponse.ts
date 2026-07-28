const KnowledgeBaseCategoryResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "name",
    "description",
    "is_hidden",
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
    "name": {
      "type": [
        "string",
        "null"
      ],
      "description": "Category name",
      "examples": [
        "Getting started"
      ]
    },
    "description": {
      "type": [
        "string",
        "null"
      ],
      "description": "Description of the category",
      "examples": [
        "How to get started in Front"
      ]
    },
    "is_hidden": {
      "type": "boolean",
      "description": "Is the category hidden",
      "examples": [
        false
      ]
    },
    "locale": {
      "type": "string",
      "enum": [
        "fr",
        "en"
      ],
      "description": "Locale of this category\n\n`fr` `en`",
      "examples": [
        "en"
      ]
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
  "title": "KnowledgeBaseCategoryResponse",
  "x-readme-ref-name": "KnowledgeBaseCategoryResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default KnowledgeBaseCategoryResponse
