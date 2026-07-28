const DeleteContactList = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "contact_list_id": {
            "type": "string",
            "default": "grp_123",
            "description": "The contact list ID"
          }
        },
        "required": [
          "contact_list_id"
        ]
      }
    ]
  }
} as const;
export default DeleteContactList
