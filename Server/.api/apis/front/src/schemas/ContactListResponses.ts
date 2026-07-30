const ContactListResponses = {
  "type": "object",
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/contact_lists/grp_3j342"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "contacts": {
              "type": "string",
              "description": "Link to contact list contacts",
              "examples": [
                "https://yourCompany.api.frontapp.com/contact_lists/grp_3j342/contacts"
              ]
            },
            "owner": {
              "type": "string",
              "description": "Link to list owner",
              "examples": [
                "https://yourCompany.api.frontapp.com/teammates/tea_e35u"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the list",
      "examples": [
        "grp_3j342"
      ]
    },
    "name": {
      "type": "string",
      "description": "Name of the list",
      "examples": [
        "Party Planning Committee"
      ]
    },
    "is_private": {
      "type": "boolean",
      "description": "Whether or not the contact is individual",
      "examples": [
        false
      ]
    }
  },
  "title": "ContactListResponses",
  "x-readme-ref-name": "ContactListResponses"
} as const;
export default ContactListResponses
