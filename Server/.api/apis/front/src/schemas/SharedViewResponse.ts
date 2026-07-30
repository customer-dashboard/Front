const SharedViewResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "name",
    "highlight",
    "inbox_ids",
    "tag_ids",
    "not_tag_ids",
    "no_tags",
    "assignee_ids",
    "not_assignee_ids"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/views/lns_abc123"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "owner": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to the team that owns the view",
              "examples": [
                "https://yourCompany.api.frontapp.com/teams/tim_xyz"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the shared view",
      "examples": [
        "lns_abc123"
      ]
    },
    "name": {
      "type": "string",
      "description": "Name of the shared view",
      "examples": [
        "High Priority Support"
      ]
    },
    "highlight": {
      "type": [
        "string",
        "null"
      ],
      "description": "Color highlight for the view",
      "examples": [
        "pink"
      ]
    },
    "inbox_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of inbox IDs included in the view"
    },
    "tag_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of tag IDs to filter by"
    },
    "not_tag_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of tag IDs to exclude"
    },
    "no_tags": {
      "type": "boolean",
      "description": "Whether to filter for conversations without tags"
    },
    "assignee_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of assignee IDs to filter by"
    },
    "not_assignee_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of assignee IDs to exclude"
    }
  },
  "title": "SharedViewResponse",
  "x-readme-ref-name": "SharedViewResponse"
} as const;
export default SharedViewResponse
