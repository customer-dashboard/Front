const UpdateATag = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "tag_id": {
            "type": "string",
            "default": "tag_123",
            "description": "The tag ID"
          }
        },
        "required": [
          "tag_id"
        ]
      }
    ]
  }
} as const;
export default UpdateATag
