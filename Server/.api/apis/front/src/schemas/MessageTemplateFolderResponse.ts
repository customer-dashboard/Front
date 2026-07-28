const MessageTemplateFolderResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "name"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/message_template_folders/rsf_g2"
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
              "description": "Link to resource's owner. Null if the current folder does not have an owner.",
              "examples": [
                "https://yourCompany.api.frontapp.com/teams/tim_s47"
              ]
            },
            "parent_folder": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to parent folder. Null if the current folder does not have a parent.",
              "examples": [
                "https://yourCompany.api.frontapp.com/message_template_folders/rsf_g1"
              ]
            },
            "child_folders": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to child folders. Null if the current folder does not have children.",
              "examples": [
                "https://yourCompany.api.frontapp.com/message_template_folders/rsf_g2/message_template_folders"
              ]
            },
            "child_answers": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to message templates contained within this folder or children folders. Null if the current folder does not have any message templates.",
              "examples": [
                "https://yourCompany.api.frontapp.com/message_template_folders/rsf_g2/message_templates"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the message template folder",
      "examples": [
        "rsf_g2"
      ]
    },
    "name": {
      "type": "string",
      "description": "Name of the message template folder",
      "examples": [
        "Complaints to Toby (or about Toby)"
      ]
    },
    "created_at": {
      "type": "number",
      "description": "Timestamp at which the message template folder was created.",
      "examples": [
        1680300342.904
      ]
    },
    "updated_at": {
      "type": "number",
      "description": "Timestamp at which the message template folder was updated.",
      "examples": [
        1688668654.501
      ]
    }
  },
  "title": "MessageTemplateFolderResponse",
  "x-readme-ref-name": "MessageTemplateFolderResponse"
} as const;
export default MessageTemplateFolderResponse
