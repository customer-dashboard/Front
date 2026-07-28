const TriggerAppEvent = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "application_uid": {
            "type": "string",
            "description": "The application UID"
          }
        },
        "required": [
          "application_uid"
        ]
      }
    ]
  }
} as const;
export default TriggerAppEvent
