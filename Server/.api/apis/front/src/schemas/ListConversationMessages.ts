import MessageResponse from './MessageResponse.js';

const ListConversationMessages = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "conversation_id": {
            "type": "string",
            "default": "cnv_123",
            "description": "The conversation ID"
          }
        },
        "required": [
          "conversation_id"
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
          },
          "sort_by": {
            "type": "string",
            "description": "Field used to sort the messages. Only supports `created_at`."
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
                "https://yourCompany.api.frontapp.com/conversations/cnv_y4xb93i/messages?page_token=klsljs8023j09suidfjlsjiei00043lllwww998303dkef0g"
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
                "https://yourCompany.api.frontapp.com/conversations/cnv_y4xb93i/messages"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": MessageResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListConversationMessages
