const StatusResponse = {
  "type": "object",
  "description": "A ticket status of a conversation.",
  "required": [
    "_links",
    "id",
    "name",
    "category",
    "description"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to ticket status",
          "examples": [
            "https://yourCompany.api.frontapp.com/company/statuses/sts_5z"
          ]
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the ticket status",
      "examples": [
        "sts_5z"
      ]
    },
    "name": {
      "type": "string",
      "description": "The name of the ticket status. Default statuses match the category name. Custom statuses have a unique name.",
      "examples": [
        "Open"
      ]
    },
    "category": {
      "type": [
        "string",
        "null"
      ],
      "description": "Category of the ticket status.\n\n`open` `waiting` `resolved`",
      "enum": [
        "open",
        "waiting",
        "resolved"
      ],
      "examples": [
        "open"
      ]
    },
    "description": {
      "type": [
        "string",
        "null"
      ],
      "description": "Description of the ticket status",
      "examples": [
        "New or currently being worked on"
      ]
    },
    "created_at": {
      "type": "number",
      "description": "Timestamp of ticket status creation",
      "examples": [
        1682538996.583
      ]
    },
    "updated_at": {
      "type": "number",
      "description": "Timestamp of the last ticket status update",
      "examples": [
        1699575875.186
      ]
    }
  },
  "title": "StatusResponse",
  "x-readme-ref-name": "StatusResponse"
} as const;
export default StatusResponse
