const UpdateConversationAssignee = {
  "required": [
    "assignee_id"
  ],
  "properties": {
    "assignee_id": {
      "type": "string",
      "description": "ID of the teammate to assign the conversation to. Set it to null to unassign."
    }
  },
  "title": "UpdateConversationAssignee",
  "x-readme-ref-name": "UpdateConversationAssignee",
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
export default UpdateConversationAssignee
