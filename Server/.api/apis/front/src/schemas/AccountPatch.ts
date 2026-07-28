const AccountPatch = {
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
    "custom_fields": {
      "description": "Custom fields for this account. If you want to keep all custom fields the same when updating this resource, do not include any custom fields in the update. If you want to update custom fields, make sure to include all custom fields, not just the fields you want to add or update. If you send only the custom fields you want to update, the other custom fields will be erased. You can retrieve the existing custom fields before making the update to note the current fields.",
      "type": "object",
      "additionalProperties": true
    }
  },
  "title": "AccountPatch",
  "x-readme-ref-name": "AccountPatch",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default AccountPatch
