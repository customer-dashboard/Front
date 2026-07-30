const GetChannel = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "channel_id": {
            "type": "string",
            "default": "cha_123",
            "description": "The Channel ID. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
          }
        },
        "required": [
          "channel_id"
        ]
      }
    ]
  }
} as const;
export default GetChannel
