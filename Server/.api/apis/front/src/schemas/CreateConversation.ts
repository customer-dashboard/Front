const CreateConversation = {
  "required": [
    "type",
    "subject"
  ],
  "properties": {
    "type": {
      "description": "Conversation type",
      "type": "string",
      "enum": [
        "discussion",
        "task"
      ]
    },
    "inbox_id": {
      "description": "Inbox ID for the conversation. Either `inbox_id` OR `teammate_ids` must be provided (not both).",
      "type": "string"
    },
    "teammate_ids": {
      "description": "Teammates to add to the conversation. Either `inbox_id` OR `teammate_ids` must be provided (not both).",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "subject": {
      "description": "Subject of the conversation. Used as the title for tasks.",
      "type": "string"
    },
    "comment": {
      "description": "Details for the starter comment. Required for discussions, optional for tasks.",
      "type": "object",
      "required": [
        "body"
      ],
      "properties": {
        "author_id": {
          "description": "ID of the teammate creating the comment. If omitted, will post as the API Token or OAuth client of the requester.",
          "type": "string"
        },
        "body": {
          "description": "Content of the comment",
          "type": "string"
        },
        "attachments": {
          "description": "Binary data of attached files. Must use `Content-Type: multipart/form-data` if specified. See [example](https://gist.github.com/hdornier/e04d04921032e98271f46ff8a539a4cb) or read more about [Attachments](https://dev.frontapp.com/docs/attachments-1).",
          "type": "array",
          "items": {
            "type": "string",
            "format": "binary"
          }
        }
      }
    },
    "description": {
      "description": "Description of the task. Only allowed when type is `task`.",
      "type": "string",
      "maxLength": 65535
    },
    "due_at": {
      "description": "Unix timestamp in seconds when the task is due. Must be in the future and within 50 years. Only allowed when type is `task`.",
      "type": "number"
    },
    "custom_fields": {
      "description": "Custom fields for this conversation",
      "type": "object",
      "additionalProperties": true
    }
  },
  "title": "CreateConversation",
  "x-readme-ref-name": "CreateConversation",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreateConversation
