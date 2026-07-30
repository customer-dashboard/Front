import Attachment from './Attachment.js';

const CommentResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "author",
    "body",
    "attachments",
    "is_pinned"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/comments/com_1ywg3f2"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "conversation": {
              "type": "string",
              "description": "Link to comment's conversation",
              "examples": [
                "https://yourCompany.api.frontapp.com/conversations/cnv_y4xb93i"
              ]
            },
            "mentions": {
              "type": "string",
              "description": "Link to comment mentions",
              "examples": [
                "https://yourCompany.api.frontapp.com/comments/com_1ywg3f2/mentions"
              ]
            },
            "comment_replied_to": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to the comment that is being replied to.",
              "examples": [
                "https://yourCompany.api.frontapp.com/comments/com_1ywg3f2"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the comment",
      "examples": [
        "com_1ywg3f2"
      ]
    },
    "author": {
      "description": "Teammate who wrote the comment",
      "type": "object",
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
      }
    },
    "body": {
      "type": "string",
      "description": "Content of the comment",
      "examples": [
        "Sometimes I'll start a sentence and I don't even know where it's going. I just hope I find it along the way."
      ]
    },
    "posted_at": {
      "type": "number",
      "description": "The timestamp when the comment was posted",
      "examples": [
        1698943401.378
      ]
    },
    "attachments": {
      "type": "array",
      "items": Attachment,
      "description": "List of files attached to the comment"
    },
    "is_pinned": {
      "type": "boolean",
      "description": "Whether or not the comment is pinned in its conversation",
      "examples": [
        true
      ]
    }
  },
  "title": "CommentResponse",
  "x-readme-ref-name": "CommentResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CommentResponse
