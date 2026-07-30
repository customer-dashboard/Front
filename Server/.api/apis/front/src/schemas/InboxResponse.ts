const InboxResponse = {
  "type": "object",
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/inboxes/inb_1ix6"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "teammates": {
              "type": "string",
              "description": "Link to inbox teammates",
              "examples": [
                "https://yourCompany.api.frontapp.com/inboxes/inb_1ix6/teammates"
              ]
            },
            "conversations": {
              "type": "string",
              "description": "Link to inbox conversations",
              "examples": [
                "https://yourCompany.api.frontapp.com/inboxes/inb_1ix6/conversations"
              ]
            },
            "channels": {
              "type": "string",
              "description": "Link to inbox channels",
              "examples": [
                "https://yourCompany.api.frontapp.com/inboxes/inb_1ix6/channels"
              ]
            },
            "owner": {
              "type": "string",
              "description": "Link to inbox owner",
              "examples": [
                "https://yourCompany.api.frontapp.com/teams/tim_k30"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier for the inbox",
      "examples": [
        "inb_1ix6"
      ]
    },
    "name": {
      "type": "string",
      "description": "Name of the inbox",
      "examples": [
        "The Dundies"
      ]
    },
    "is_private": {
      "type": "boolean",
      "description": "Whether or not the inbox is individual",
      "examples": [
        false
      ]
    },
    "is_public": {
      "type": "boolean",
      "description": "Whether or not the inbox is available to all members of a team by default",
      "examples": [
        true
      ]
    },
    "custom_fields": {
      "description": "Custom fields for this inbox",
      "type": "object",
      "additionalProperties": true
    }
  },
  "title": "InboxResponse",
  "x-readme-ref-name": "InboxResponse"
} as const;
export default InboxResponse
