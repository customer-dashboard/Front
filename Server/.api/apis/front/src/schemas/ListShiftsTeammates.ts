import TeammateResponse from './TeammateResponse.js';

const ListShiftsTeammates = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "shift_id": {
            "type": "string",
            "default": "shf_123",
            "description": "The Shift ID"
          }
        },
        "required": [
          "shift_id"
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
export default ListShiftsTeammates
