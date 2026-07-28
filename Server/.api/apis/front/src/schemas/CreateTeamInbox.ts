import ResourceId from './ResourceId.js';

const CreateTeamInbox = {
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "The name of the inbox"
    },
    "teammate_ids": {
      "type": "array",
      "description": "An array of teammate IDs that should have access to the inbox. Alternatively, you can supply teammate emails as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
      "items": ResourceId
    },
    "is_public": {
      "type": "boolean",
      "description": "Whether the inbox is public or not"
    },
    "custom_fields": {
      "description": "Custom fields for this inbox",
      "type": "object",
      "additionalProperties": true
    }
  },
  "title": "CreateTeamInbox",
  "x-readme-ref-name": "CreateTeamInbox",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "team_id": {
            "type": "string",
            "default": "tim_123",
            "description": "The team ID"
          }
        },
        "required": [
          "team_id"
        ]
      }
    ]
  }
} as const;
export default CreateTeamInbox
