const CreateTeammateGroup = {
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the teammate group"
    },
    "description": {
      "type": "string",
      "description": "Description of the teammate group"
    },
    "permissions": {
      "type": "object",
      "description": "Permissions for the teammate group",
      "properties": {
        "contacts": {
          "type": "object",
          "description": "Permissions for accessing contact lists. This only applies if shared contacts permissions are enabled.",
          "required": [
            "access"
          ],
          "properties": {
            "access": {
              "type": "string",
              "description": "One of 'all', 'contact_groups', 'contact_lists', or 'none'."
            },
            "contact_group_ids": {
              "type": "array",
              "deprecated": true,
              "description": "List of contact group ids. Can only be specified if access is set to 'contact_groups'. ⚠️ Deprecated. Use access 'contact_lists' and 'contact_list_ids' instead.",
              "items": {
                "type": "string"
              }
            },
            "contact_list_ids": {
              "type": "array",
              "description": "List of contact list ids. Can only be specified if access is set to 'contact_lists'.",
              "items": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  },
  "title": "CreateTeammateGroup",
  "x-readme-ref-name": "CreateTeammateGroup",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "teammate_id": {
            "type": "string",
            "default": "tea_123",
            "description": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
          }
        },
        "required": [
          "teammate_id"
        ]
      }
    ]
  }
} as const;
export default CreateTeammateGroup
