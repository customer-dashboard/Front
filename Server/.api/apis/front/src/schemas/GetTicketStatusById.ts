const GetTicketStatusById = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "status_id": {
            "type": "string",
            "default": "sts_5z",
            "description": "The ticket status ID"
          }
        },
        "required": [
          "status_id"
        ]
      }
    ]
  }
} as const;
export default GetTicketStatusById
