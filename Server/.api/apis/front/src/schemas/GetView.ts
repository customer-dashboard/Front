const GetView = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "view_id": {
            "type": "string",
            "default": "lns_abc123",
            "description": "The view ID"
          }
        },
        "required": [
          "view_id"
        ]
      }
    ]
  }
} as const;
export default GetView
