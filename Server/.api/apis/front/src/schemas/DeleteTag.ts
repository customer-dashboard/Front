const DeleteTag = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "tag_id": {
            "type": "string",
            "default": "tag_123",
            "description": "The ID of the tag to delete"
          }
        },
        "required": [
          "tag_id"
        ]
      }
    ]
  }
} as const;
export default DeleteTag
