import ChannelResponse from './ChannelResponse.js';

const ListInboxChannels = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "inbox_id": {
            "type": "string",
            "default": "inb_123",
            "description": "The Inbox ID"
          }
        },
        "required": [
          "inbox_id"
        ]
      }
    ]
  },
  "response": {
    "200": {
      "type": "object",
      "properties": {
        "_links": {
          "type": "object",
          "properties": {
            "self": {
              "type": "string",
              "description": "Link to resource",
              "examples": [
                "https://yourCompany.api.frontapp.com/channels"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": ChannelResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListInboxChannels
