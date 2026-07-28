const UpdateAContact = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "contact_id": {
            "type": "string",
            "default": "crd_123",
            "description": "The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
          }
        },
        "required": [
          "contact_id"
        ]
      }
    ]
  }
} as const;
export default UpdateAContact
