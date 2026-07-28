const RemoveContactsFromGroup = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "contact_group_id": {
            "type": "string",
            "default": "grp_123",
            "description": "The contact group ID"
          }
        },
        "required": [
          "contact_group_id"
        ]
      }
    ]
  }
} as const;
export default RemoveContactsFromGroup
