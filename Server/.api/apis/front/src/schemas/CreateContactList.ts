const CreateContactList = {
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the contact list"
    }
  },
  "title": "CreateContactList",
  "x-readme-ref-name": "CreateContactList",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreateContactList
