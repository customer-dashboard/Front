const UpdateTeammate = {
  "properties": {
    "username": {
      "type": "string",
      "description": "New username. It must be unique and can only contains lowercase letters, numbers and underscores."
    },
    "first_name": {
      "type": "string",
      "description": "New first name"
    },
    "last_name": {
      "type": "string",
      "description": "New last name"
    },
    "is_available": {
      "type": "boolean",
      "description": "New availability status"
    },
    "custom_fields": {
      "description": "Custom fields for this teammate. If you want to keep all custom fields the same when updating this resource, do not include any custom fields in the update. If you want to update custom fields, make sure to include all custom fields, not just the fields you want to add or update. If you send only the custom fields you want to update, the other custom fields will be erased. You can retrieve the existing custom fields before making the update to note the current fields.",
      "type": "object",
      "additionalProperties": true
    }
  },
  "title": "UpdateTeammate",
  "x-readme-ref-name": "UpdateTeammate",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "teammate_id": {
            "type": "string",
            "default": "tea_123",
            "description": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
          }
        },
        "required": [
          "teammate_id"
        ]
      }
    ]
  }
} as const;
export default UpdateTeammate
