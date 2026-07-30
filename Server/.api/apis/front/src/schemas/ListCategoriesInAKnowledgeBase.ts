import KnowledgeBaseCategorySlimResponse from './KnowledgeBaseCategorySlimResponse.js';

const ListCategoriesInAKnowledgeBase = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "knowledge_base_id": {
            "type": "string",
            "default": "knb_123",
            "description": "The ID of the knowledge base"
          }
        },
        "required": [
          "knowledge_base_id"
        ]
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "limit": {
            "type": "integer",
            "maximum": 100,
            "examples": [
              25
            ],
            "description": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)"
          },
          "page_token": {
            "type": "string",
            "examples": [
              "https://yourCompany.api.frontapp.com/endpoint?limit=25&page_token=92f32bcd7625333caf4e0f8fc26d920c812f"
            ],
            "description": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)"
          }
        }
      }
    ]
  },
  "response": {
    "200": {
      "type": "object",
      "properties": {
        "_pagination": {
          "type": "object",
          "properties": {
            "next": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to next [page of results](https://dev.frontapp.com/docs/pagination)",
              "examples": [
                "https://yourCompany.api.frontapp.com/knowledge_bases/knb_1/categories?page_token=134287aba8eaa55cf366400c63300a75bab0c"
              ]
            }
          }
        },
        "_links": {
          "type": "object",
          "properties": {
            "self": {
              "type": "string",
              "description": "Link to resource",
              "examples": [
                "https://yourCompany.api.frontapp.com/knowledge_bases/knb_1/categories"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": KnowledgeBaseCategorySlimResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListCategoriesInAKnowledgeBase
