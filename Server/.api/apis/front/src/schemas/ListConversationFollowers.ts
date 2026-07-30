import TeammateResponse from './TeammateResponse.js';

const ListConversationFollowers = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "conversation_id": {
            "type": "string",
            "default": "cnv_123",
            "description": "The conversation ID"
          }
        },
        "required": [
          "conversation_id"
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
                "https://yourCompany.api.frontapp.com/teammates"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": TeammateResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListConversationFollowers
