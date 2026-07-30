import ResourceId from './ResourceId.js';

const UpdateTimeOff = {
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the time off"
    },
    "start_at": {
      "type": "number",
      "description": "Timestamp when the time off starts (in seconds)"
    },
    "end_at": {
      "type": [
        "number",
        "null"
      ],
      "description": "Timestamp when the time off ends (in seconds), or null to clear it"
    },
    "auto_responder": {
      "type": "object",
      "properties": {
        "body": {
          "type": "string",
          "description": "The auto-reply message body"
        },
        "is_enabled": {
          "type": "boolean",
          "description": "Whether the auto-responder is enabled"
        },
        "is_contacts_only": {
          "type": "boolean",
          "description": "Whether the auto-responder only replies to known contacts"
        },
        "channel_ids": {
          "type": "array",
          "description": "List of channel IDs the auto-responder applies to",
          "items": ResourceId
        }
      }
    }
  },
  "title": "UpdateTimeOff",
  "x-readme-ref-name": "UpdateTimeOff",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "time_off_id": {
            "type": "string",
            "default": "vcr_abc123",
            "description": "The time off ID"
          }
        },
        "required": [
          "time_off_id"
        ]
      }
    ]
  }
} as const;
export default UpdateTimeOff
