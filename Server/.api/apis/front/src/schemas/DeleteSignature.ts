const DeleteSignature = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "signature_id": {
            "type": "string",
            "default": "sig_123",
            "description": "The signature ID"
          }
        },
        "required": [
          "signature_id"
        ]
      }
    ]
  }
} as const;
export default DeleteSignature
