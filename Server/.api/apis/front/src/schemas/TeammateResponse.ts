const TeammateResponse = {
  "type": "object",
  "description": "A teammate is a user in Front.",
  "required": [
    "_links",
    "id",
    "email",
    "username",
    "first_name",
    "last_name",
    "license_type",
    "is_admin",
    "is_available",
    "is_blocked",
    "type",
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
            "https://yourCompany.api.frontapp.com/teammates/tea_6r55a"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "inboxes": {
              "type": "string",
              "description": "Link to teammate's inboxes",
              "examples": [
                "https://yourCompany.api.frontapp.com/teammates/tea_6r55a/inboxes"
              ]
            },
            "conversations": {
              "type": "string",
              "description": "Link to teammate's conversations",
              "examples": [
                "https://yourCompany.api.frontapp.com/teammates/tea_6r55a/conversations"
              ]
            },
            "botSource": {
              "type": "string",
              "description": "Link to the source resource of the bot (e.g. rule)",
              "examples": [
                "https://yourCompany.api.frontapp.com/rules/rul_6r55a"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the teammate",
      "examples": [
        "tea_6r55a"
      ]
    },
    "email": {
      "type": "string",
      "description": "Email address of the teammate",
      "examples": [
        "michael.scott@dundermifflin.com"
      ]
    },
    "username": {
      "type": "string",
      "description": "Username of the teammate (used for \"@\" mentions)",
      "examples": [
        "PrisonMike"
      ]
    },
    "first_name": {
      "type": "string",
      "description": "First name of the teammate",
      "examples": [
        "Michael"
      ]
    },
    "last_name": {
      "type": "string",
      "description": "Last name of the teammate",
      "examples": [
        "Scott"
      ]
    },
    "is_admin": {
      "type": "boolean",
      "description": "Whether or not the teammate is an admin in your company",
      "examples": [
        true
      ]
    },
    "is_available": {
      "type": "boolean",
      "description": "Whether or not the teammate is available",
      "examples": [
        false
      ]
    },
    "is_blocked": {
      "type": "boolean",
      "description": "Whether or not the teammate account has been blocked",
      "examples": [
        false
      ]
    },
    "type": {
      "type": "string",
      "description": "Type of the teammate, normal teammates are denoted as \"user\", while visitors are denoted as \"visitor\".\nBot users are denoted by their parent resource type.\nThe following bot types are available:\n  * ai: acting on behalf of an AI\n  * api: acting on behalf of OAuth clients\n  * application: acting on behalf of an Application\n  * bulk_reply: acting on behalf of a Bulk Reply\n  * csat: used for authoring CSAT response comments\n  * integration: acting on behalf of an Integration\n  * macro: acting on behalf of a Macro, author of comments and drafts\n  * rule: acting on behalf of a Rule, author of comments and drafts\n  * smart_csat: acting on behalf of a Smart CSAT\n\n\n`user` `visitor` `ai` `api` `application` `bulk_reply` `csat` `integration` `macro` `rule` `smart_csat`",
      "enum": [
        "user",
        "visitor",
        "ai",
        "api",
        "application",
        "bulk_reply",
        "csat",
        "integration",
        "macro",
        "rule",
        "smart_csat"
      ]
    },
    "custom_fields": {
      "description": "Custom fields for this teammate",
      "type": "object",
      "additionalProperties": true
    }
  },
  "title": "TeammateResponse",
  "x-readme-ref-name": "TeammateResponse"
} as const;
export default TeammateResponse
