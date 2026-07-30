import TagResponse from './TagResponse.js';

const ListTagChildren = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "tag_id": {
            "type": "string",
            "default": "tag_123",
            "description": "The tag ID"
          }
        },
        "required": [
          "tag_id"
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
                "https://yourCompany.api.frontapp.com/tags"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": TagResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListTagChildren
