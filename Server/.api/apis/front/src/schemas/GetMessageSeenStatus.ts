import SeenReceiptResponse from './SeenReceiptResponse.js';

const GetMessageSeenStatus = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "message_id": {
            "type": "string",
            "default": "msg_123",
            "description": "The message ID"
          }
        },
        "required": [
          "message_id"
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
                "https://yourCompany.api.frontapp.com/messages/msg_1p4lvjym/seen?page_token=jk7893fgeet644abnn39"
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
                "https://yourCompany.api.frontapp.com/messages/msg_1p4lvjym/seen"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": SeenReceiptResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GetMessageSeenStatus
