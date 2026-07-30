const GetTimeOff = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "time_off_id": {
            "type": "string",
            "default": "vcr_abc123",
            "description": "The time off ID"
          }
        },
        "required": [
          "time_off_id"
        ]
      }
    ]
  }
} as const;
export default GetTimeOff
