const GetAnalyticsReport = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "report_uid": {
            "type": "string",
            "default": "723ec32796f12c6f05f6b124d8ef76191a38cec990e0f65d549206c51373f1a0",
            "description": "The report UID."
          }
        },
        "required": [
          "report_uid"
        ]
      }
    ]
  }
} as const;
export default GetAnalyticsReport
