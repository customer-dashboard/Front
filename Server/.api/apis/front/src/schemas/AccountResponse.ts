const AccountResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "name",
    "logo_url",
    "description",
    "domains",
    "external_id",
    "custom_fields"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/accounts/acc_76"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "contacts": {
              "type": "string",
              "description": "Link to contacts associated to the account",
              "examples": [
                "https://yourCompany.api.frontapp.com/accounts/acc_76/contacts"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the account",
      "examples": [
        "acc_76"
      ]
    },
    "name": {
      "type": "string",
      "description": "Account name",
      "examples": [
        "Dunder Mifflin, Inc."
      ]
    },
    "logo_url": {
      "type": [
        "string",
        "null"
      ],
      "description": "URL of the Account's logo",
      "examples": [
        "https://yourCompany.api.frontapp.com/accounts/acc_aq/logo-1654309308278"
      ]
    },
    "description": {
      "type": [
        "string",
        "null"
      ],
      "description": "Account Description",
      "examples": [
        "Limitless Paper in a Paperless World"
      ]
    },
    "domains": {
      "type": "array",
      "description": "List of domains associated to the Account",
      "items": {
        "type": "string",
        "examples": [
          "dundermifflininc.com",
          "limitlesspaper.com"
        ]
      }
    },
    "external_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "ID of the Account in an External system, such as your backoffice system or CRM",
      "examples": [
        8739674733
      ]
    },
    "custom_fields": {
      "description": "Custom fields for this account",
      "type": "object",
      "additionalProperties": true
    },
    "created_at": {
      "type": "number",
      "description": "Timestamp when the account was created",
      "examples": [
        1622672452.363
      ]
    },
    "updated_at": {
      "type": "number",
      "description": "Timestamp when the account was updated",
      "examples": [
        1654309308.278
      ]
    }
  },
  "title": "AccountResponse",
  "x-readme-ref-name": "AccountResponse"
} as const;
export default AccountResponse
