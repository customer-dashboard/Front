const UpdateALink = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "link_id": {
            "type": "string",
            "default": "top_123",
            "description": "The Link ID"
          }
        },
        "required": [
          "link_id"
        ]
      }
    ]
  }
} as const;
export default UpdateALink
