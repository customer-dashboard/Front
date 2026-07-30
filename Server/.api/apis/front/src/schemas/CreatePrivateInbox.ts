const CreatePrivateInbox = {
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "The name of the inbox"
    },
    "custom_fields": {
      "description": "Custom fields for this inbox",
      "type": "object",
      "additionalProperties": true
    }
  },
  "title": "CreatePrivateInbox",
  "x-readme-ref-name": "CreatePrivateInbox",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreatePrivateInbox
