import ConversationResponse from './ConversationResponse.js';

const ListInboxConversations = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "inbox_id": {
            "type": "string",
            "default": "inb_123",
            "description": "The Inbox ID"
          }
        },
        "required": [
          "inbox_id"
        ]
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "q": {
            "type": "string",
            "description": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `statuses`, whose value should be a list of conversation statuses (`assigned`, `unassigned`, `archived`, or `trashed`). If ticketing is enabled, this endpoint accepts either `status_categories` (`open`, `waiting`, `resolved`) or `status_ids` as an alternative."
          },
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
                "https://yourCompany.api.frontapp.com/conversations?page_token=ce787da6f075740cf187d926f5e9f612bc7875763a8dd37d5"
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
                "https://yourCompany.api.frontapp.com/conversations"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": ConversationResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListInboxConversations
