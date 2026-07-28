import Attachment from './Attachment.js';

const MessageTemplateResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "name",
    "subject",
    "body",
    "attachments",
    "is_available_for_all_inboxes",
    "inbox_ids"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/responses/rsp_16yc"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "owner": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to resource's owner",
              "examples": [
                "https://yourCompany.api.frontapp.com/teams/tim_s47"
              ]
            },
            "parent_folder": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to the parent folder that contains the message template",
              "examples": [
                "https://yourCompany.api.frontapp.com/message_template_folders/rsf_g2"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the message template",
      "examples": [
        "rsp_16yc"
      ]
    },
    "name": {
      "type": "string",
      "description": "Name of the message template",
      "examples": [
        "Pam wedding planning complaint"
      ]
    },
    "subject": {
      "type": [
        "string",
        "null"
      ],
      "description": "Subject of the message template",
      "examples": [
        "Work time being used for wedding planning"
      ]
    },
    "body": {
      "type": "string",
      "description": "Body of the message template",
      "examples": [
        "<div><p>Pam is spending time planning her <span style=\"color:red;\">wedding</span> at the office. This message <b>WAS NOT</b> sent by Angela.</p></div>\n"
      ]
    },
    "attachments": {
      "type": "array",
      "description": "List of files attached to the response",
      "items": Attachment
    },
    "is_available_for_all_inboxes": {
      "type": "boolean",
      "description": "Whether or not the template is available in all inboxes.",
      "examples": [
        true
      ]
    },
    "inbox_ids": {
      "type": [
        "array",
        "null"
      ],
      "description": "List of inboxes the template is available in. Null if there are no restrictions.",
      "items": {
        "type": "string"
      }
    }
  },
  "title": "MessageTemplateResponse",
  "x-readme-ref-name": "MessageTemplateResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default MessageTemplateResponse
