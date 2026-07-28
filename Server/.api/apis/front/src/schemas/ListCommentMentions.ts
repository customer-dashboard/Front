import TeammateResponse from './TeammateResponse.js';

const ListCommentMentions = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "comment_id": {
            "type": "string",
            "default": "com_123",
            "description": "The Comment ID"
          }
        },
        "required": [
          "comment_id"
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
export default ListCommentMentions
