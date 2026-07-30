import MessageTemplateResponse from './MessageTemplateResponse.js';

const ListTeamMessageTemplates = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "team_id": {
            "type": "string",
            "default": "tim_55c8c149",
            "description": "The team ID"
          }
        },
        "required": [
          "team_id"
        ]
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "sort_by": {
            "type": "string",
            "description": "Field used to sort the message templates. Either `created_at`, `updated_at`, or `sort_order`."
          },
          "sort_order": {
            "type": "string",
            "enum": [
              "asc",
              "desc"
            ],
            "examples": [
              "asc"
            ],
            "description": "Order by which results should be sorted"
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
                "https://yourCompany.api.frontapp.com/message_templates?page_token=9fa92a7f385fd7be43f7153055b30e6d"
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
                "https://yourCompany.api.frontapp.com/message_templates"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": MessageTemplateResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListTeamMessageTemplates
