import ContactNoteResponses from './ContactNoteResponses.js';

const ListNotes = {
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
  },
  "response": {
    "202": {
      "type": "object",
      "properties": {
        "_links": {
          "type": "object",
          "properties": {
            "self": {
              "type": "string",
              "description": "Link to resource",
              "examples": [
                "https://yourCompany.api.frontapp.com/contacts/crd_2okzojy/notes"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": ContactNoteResponses
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListNotes
