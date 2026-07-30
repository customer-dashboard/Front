import MessageTemplateFolderResponse from './MessageTemplateFolderResponse.js';

const GetChildFolders = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "message_template_folder_id": {
            "type": "string",
            "default": "rsf_123",
            "description": "The message template folder ID"
          }
        },
        "required": [
          "message_template_folder_id"
        ]
      }
    ]
  },
  "response": {
    "200": {
      "type": "object",
      "properties": {
        "_pagination": {
          "type": "object",
          "properties": {
            "next": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to next [page of results](https://dev.frontapp.com/docs/pagination)",
              "examples": [
                "https://yourCompany.api.frontapp.com/message_template_folders?page_token=9fa92a7f385fd7be43f7153055b30e6d"
              ]
            }
          }
        },
        "_links": {
          "type": "object",
          "properties": {
            "self": {
              "type": "string",
              "description": "Link to resource",
              "examples": [
                "https://yourCompany.api.frontapp.com/message_template_folders"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": MessageTemplateFolderResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GetChildFolders
