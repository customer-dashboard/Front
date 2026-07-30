const UpdateComment = {
  "properties": {
    "body": {
      "type": "string",
      "description": "Content of the comment. Can include markdown formatting. Can only be updated if the comment was created using the same token."
    },
    "is_pinned": {
      "type": "boolean",
      "description": "Whether or not the comment is pinned in its conversation."
    }
  },
  "title": "UpdateComment",
  "x-readme-ref-name": "UpdateComment",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "comment_id": {
            "type": "string",
            "default": "com_123",
            "description": "The Comment ID"
          }
        },
        "required": [
          "comment_id"
        ]
      }
    ]
  }
} as const;
export default UpdateComment
