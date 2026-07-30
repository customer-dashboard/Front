const GetRule = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "rule_id": {
            "type": "string",
            "default": "rul_123",
            "description": "The Rule ID"
          }
        },
        "required": [
          "rule_id"
        ]
      }
    ]
  }
} as const;
export default GetRule
