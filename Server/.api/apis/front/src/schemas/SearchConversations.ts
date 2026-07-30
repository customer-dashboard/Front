import ConversationResponse from './ConversationResponse.js';

const SearchConversations = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "default": "inbox:inb_123 tag:tag_345",
            "description": "Search query string. See [Search](https://dev.frontapp.com/docs/search-1) topic for usage details."
          }
        },
        "required": [
          "query"
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
                "https://yourCompany.api.frontapp.com/conversations/search/:query:?page_token=d4d5f065c89f1284ea262fa6b19456239b0"
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
                "https://yourCompany.api.frontapp.com/conversations/search/:query:"
              ]
            }
          }
        },
        "_total": {
          "type": "integer",
          "description": "Total number of matching conversations",
          "examples": [
            212
          ]
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
export default SearchConversations
