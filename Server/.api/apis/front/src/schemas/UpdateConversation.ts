import ResourceId from './ResourceId.js';

const UpdateConversation = {
  "properties": {
    "assignee_id": {
      "type": "string",
      "description": "ID of the teammate to assign the conversation to. Set it to null to unassign."
    },
    "inbox_id": {
      "type": "string",
      "description": "ID of the inbox to move the conversation to."
    },
    "status": {
      "type": "string",
      "description": "New status of the conversation",
      "enum": [
        "archived",
        "open",
        "deleted",
        "spam"
      ]
    },
    "status_id": {
      "type": "string",
      "description": "Unique identifier of the status to set the conversation to. Only one of status and status_id should be provided. Ticketing must be enabled for the company to use this field.",
      "examples": [
        "sts_123"
      ]
    },
    "tag_ids": {
      "type": "array",
      "description": "List of all the tag IDs replacing the old conversation tags",
      "items": ResourceId
    },
    "description": {
      "type": [
        "string",
        "null"
      ],
      "maxLength": 65535,
      "description": "Description of the task. Only allowed on task conversations. Set to null to clear."
    },
    "due_at": {
      "type": [
        "number",
        "null"
      ],
      "description": "Unix timestamp in seconds when the task is due. Must be in the future and within 50 years. Only allowed on task conversations. Set to null to clear.",
      "examples": [
        1701292649.333
      ]
    },
    "custom_fields": {
      "description": "Custom fields for this conversation. If you want to keep all custom fields the same when updating this resource, do not include any custom fields in the update. If you want to update custom fields, make sure to include all custom fields, not just the fields you want to add or update. If you send only the custom fields you want to update, the other custom fields will be erased. You can retrieve the existing custom fields before making the update to note the current fields. Send as an object of key:value pairs where the key is the custom field name and the value is the custom field value.",
      "type": "object",
      "additionalProperties": true
    }
  },
  "title": "UpdateConversation",
  "x-readme-ref-name": "UpdateConversation",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
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
      }
    ]
  }
} as const;
export default UpdateConversation
