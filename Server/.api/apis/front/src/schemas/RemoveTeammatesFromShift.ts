const RemoveTeammatesFromShift = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "shift_id": {
            "type": "string",
            "default": "shf_123",
            "description": "The Shift ID"
          }
        },
        "required": [
          "shift_id"
        ]
      }
    ]
  }
} as const;
export default RemoveTeammatesFromShift
