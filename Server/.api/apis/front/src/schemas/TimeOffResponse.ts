const TimeOffResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "name",
    "start_at",
    "auto_responder"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to the time off resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/time_offs/vcr_1bri"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "teammate": {
              "type": "string",
              "description": "Link to the teammate this time off belongs to",
              "examples": [
                "https://yourCompany.api.frontapp.com/teammates/tea_1bri"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the time off",
      "examples": [
        "vcr_1bri"
      ]
    },
    "name": {
      "type": "string",
      "description": "Name of the time off",
      "examples": [
        "Out of office"
      ]
    },
    "start_at": {
      "type": "number",
      "description": "Timestamp when the time off starts",
      "examples": [
        1606943265.298
      ]
    },
    "end_at": {
      "type": [
        "number",
        "null"
      ],
      "description": "Timestamp when the time off ends, or null if open-ended",
      "examples": [
        1607548065.298
      ]
    },
    "created_at": {
      "type": "number",
      "description": "Timestamp when the time off was created",
      "examples": [
        1606943265.298
      ]
    },
    "updated_at": {
      "type": "number",
      "description": "Timestamp when the time off was last updated",
      "examples": [
        1606943265.298
      ]
    },
    "auto_responder": {
      "type": "object",
      "properties": {
        "is_enabled": {
          "type": "boolean",
          "description": "Whether the auto-responder is enabled",
          "examples": [
            true
          ]
        },
        "channel_ids": {
          "type": "array",
          "description": "List of channel IDs the auto-responder applies to",
          "items": {
            "type": "string"
          },
          "examples": [
            "cha_1bri",
            "cha_2bri"
          ]
        },
        "is_contacts_only": {
          "type": "boolean",
          "description": "Whether the auto-responder only replies to known contacts",
          "examples": [
            false
          ]
        },
        "body": {
          "type": "string",
          "description": "The auto-reply message body",
          "examples": [
            "Thanks for reaching out, I will reply when I am back."
          ]
        }
      }
    }
  },
  "title": "TimeOffResponse",
  "x-readme-ref-name": "TimeOffResponse"
} as const;
export default TimeOffResponse
