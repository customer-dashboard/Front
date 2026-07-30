import ShiftResponse from './ShiftResponse.js';

const ListShifts = {
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
                "https://yourCompany.api.frontapp.com/shifts"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": ShiftResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListShifts
