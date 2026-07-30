const DeleteDraft = {
  "required": [
    "version"
  ],
  "properties": {
    "version": {
      "type": "string",
      "description": "Version of the draft"
    }
  },
  "title": "DeleteDraft",
  "x-readme-ref-name": "DeleteDraft",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "draft_id": {
            "type": "string",
            "default": "msg_123",
            "description": "The draft ID"
          }
        },
        "required": [
          "draft_id"
        ]
      }
    ]
  }
} as const;
export default DeleteDraft
