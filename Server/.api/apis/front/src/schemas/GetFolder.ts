const GetFolder = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "message_template_folder_id": {
            "type": "string",
            "default": "rsf_123",
            "description": "The message template folder ID"
          }
        },
        "required": [
          "message_template_folder_id"
        ]
      }
    ]
  }
} as const;
export default GetFolder
