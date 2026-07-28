const RecipientResponse = {
  "type": "object",
  "required": [
    "_links",
    "name",
    "handle",
    "role"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "related": {
          "type": "object",
          "properties": {
            "contact": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to recipient contact",
              "examples": [
                "https://yourCompany.api.frontapp.com/contacts/crd_2njtoem"
              ]
            }
          }
        }
      }
    },
    "name": {
      "type": [
        "string",
        "null"
      ],
      "description": "Name of the recipient.",
      "examples": [
        "Phyllis Lapin-Vance"
      ]
    },
    "handle": {
      "type": "string",
      "description": "Handle of the contact. Can be any string used to uniquely identify the contact",
      "examples": [
        "purpleboss@limitlesspaper.com"
      ]
    },
    "role": {
      "type": "string",
      "description": "Role of the recipient\n\n`from` `to` `cc` `bcc` `reply-to`",
      "enum": [
        "from",
        "to",
        "cc",
        "bcc",
        "reply-to"
      ],
      "examples": [
        "cc"
      ]
    }
  },
  "title": "RecipientResponse",
  "x-readme-ref-name": "RecipientResponse"
} as const;
export default RecipientResponse
