const UpdateConversationReminders = {
  "required": [
    "teammate_id",
    "scheduled_at"
  ],
  "properties": {
    "teammate_id": {
      "type": "string",
      "description": "ID of the teammate to create a reminder for. For a private conversation, specify the id of the teammate that owns the conversation. For a shared conversation, use the id of any teammate that has access to the conversation's shared inbox. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    },
    "scheduled_at": {
      "type": "number",
      "description": "Unix timestamp in seconds to schedule the reminder for. Must be in the future and within 50 years. Set to null to cancel."
    },
    "status_id": {
      "type": "string",
      "description": "ID of the waiting status to which the conversation will be set. Ticketing must be enabled for the company to use this field. If no status is supplied and ticket is enabled, the default waiting status will be used."
    }
  },
  "title": "UpdateConversationReminders",
  "x-readme-ref-name": "UpdateConversationReminders",
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
export default UpdateConversationReminders
