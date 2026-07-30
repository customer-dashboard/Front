const GetAnalyticsExport = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "export_id": {
            "type": "string",
            "default": "exp_123",
            "description": "The export ID."
          }
        },
        "required": [
          "export_id"
        ]
      }
    ]
  }
} as const;
export default GetAnalyticsExport
