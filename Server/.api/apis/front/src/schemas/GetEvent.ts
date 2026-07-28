const GetEvent = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "event_id": {
            "type": "string",
            "default": "evt_55c8c149",
            "description": "The event ID"
          }
        },
        "required": [
          "event_id"
        ]
      }
    ]
  }
} as const;
export default GetEvent
