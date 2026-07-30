const CreateAccount = {
  "body": {
    "required": [
      "name"
    ],
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Name of the Account"
      },
      "description": {
        "type": "string",
        "description": "Account description"
      },
      "domains": {
        "type": "array",
        "description": "List of domains associated with the Account",
        "items": {
          "type": "string"
        }
      },
      "external_id": {
        "type": "string",
        "description": "ID of the Account in an external system"
      },
      "custom_fields": {
        "description": "Custom fields for this account",
        "type": "object",
        "additionalProperties": true
      }
    },
    "$schema": "http://json-schema.org/draft-04/schema#"
  }
} as const;
export default CreateAccount
