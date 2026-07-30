const GetComment = {
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
export default GetComment
