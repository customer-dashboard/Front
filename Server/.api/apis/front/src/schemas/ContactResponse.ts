import ContactHandle from './ContactHandle.js';
import ContactListResponses from './ContactListResponses.js';

const ContactResponse = {
  "type": "object",
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/contacts/crd_3cgz4ge\""
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "notes": {
              "type": "string",
              "description": "Link to contact notes",
              "examples": [
                "https://yourCompany.api.frontapp.com/contacts/crd_3cgz4ge/notes"
              ]
            },
            "conversations": {
              "type": "string",
              "description": "Link to contact conversations",
              "examples": [
                "https://yourCompany.api.frontapp.com/contacts/crd_3cgz4ge/conversations"
              ]
            },
            "owner": {
              "type": "string",
              "description": "Link to contact owner"
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the contact",
      "examples": [
        "crd_3cgz4ge"
      ]
    },
    "name": {
      "type": "string",
      "description": "Contact name",
      "examples": [
        "Dwight Schrute"
      ]
    },
    "description": {
      "type": "string",
      "description": "Contact description",
      "examples": [
        "Assistant to the regional manager"
      ]
    },
    "avatar_url": {
      "type": "string",
      "description": "URL of the contact's avatar",
      "examples": [
        "https://yourCompany.api.frontapp.com/contacts/crd_3cgz4ge/avatar-1673436467707"
      ]
    },
    "links": {
      "type": "array",
      "description": "List of all the links of the contact",
      "items": {
        "type": "string",
        "examples": [
          "https://shrutefarms.com",
          "https://eatyourbeets.com"
        ]
      }
    },
    "groups": {
      "type": "array",
      "deprecated": true,
      "description": "List of the groups the contact belongs to. ⚠️ Deprecated. use `lists` instead.",
      "items": ContactListResponses
    },
    "lists": {
      "type": "array",
      "description": "List of the contact lists the contact belongs to.",
      "items": ContactListResponses
    },
    "handles": {
      "type": "array",
      "description": "List of the handles and sources with which the contact is reachable.",
      "items": ContactHandle
    },
    "custom_fields": {
      "description": "Custom fields for this contact.",
      "type": "object",
      "additionalProperties": true
    },
    "is_private": {
      "type": "boolean",
      "description": "Whether or not the contact is individual",
      "examples": [
        true
      ]
    }
  },
  "title": "ContactResponse",
  "x-readme-ref-name": "ContactResponse"
} as const;
export default ContactResponse
