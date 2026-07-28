import EventResponse from './EventResponse.js';

const ListEvents = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "q": {
            "type": "string",
            "description": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with optional properties `before`, `after`, `types`, or `inboxes`. `before` and `after` should be a timestamp in seconds with up to 3 decimal places. `types` should be a list of [event types](https://dev.frontapp.com/reference/events). `inboxes` should be a list of inbox IDs."
          },
          "limit": {
            "type": "integer",
            "default": 15,
            "description": "Max number of results per page (max 15)"
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
            "description": "Field used to sort the events. Only supports `created_at`."
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
                "https://yourCompany.api.frontapp.com/events?page_token=2d018a5809eb90d349bc08c52cb1f4987bef"
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
                "https://yourCompany.api.frontapp.com/events"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": EventResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListEvents
