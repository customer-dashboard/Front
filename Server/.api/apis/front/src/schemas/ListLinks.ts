import LinkResponse from './LinkResponse.js';

const ListLinks = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "q": {
            "type": "string",
            "description": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `types`, whose value should be a list of link types. Links created via the API have type `web` and links created by application objects have type `app_<uid>`, matching the app UID where the object is configured. There are also types `jira`, `asana`, `monday`, `trello`, and `github`, which correspond to the integrations built by Front."
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
          },
          "sort_by": {
            "type": "string",
            "description": "Field used to sort the links. Only supports `id`."
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
                "https://yourCompany.api.frontapp.com/links?page_token=4fcb1f8ca11971c5da59c21ea686fd50"
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
                "https://yourCompany.api.frontapp.com/links"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": LinkResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListLinks
