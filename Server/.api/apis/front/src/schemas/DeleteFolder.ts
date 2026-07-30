const DeleteFolder = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "message_template_folder_id": {
            "type": "string",
            "default": "rsf_123",
            "description": "The message template folder id"
          }
        },
        "required": [
          "message_template_folder_id"
        ]
      }
    ]
  },
  "response": {
    "202": {
      "type": "object",
      "properties": {
        "status": {
          "type": "string",
          "default": "accepted",
          "examples": [
            "accepted"
          ]
        },
        "message_template_folder_id": {
          "type": "string",
          "description": "id of the message template to be deleted",
          "examples": [
            "rsf_g2"
          ]
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default DeleteFolder
