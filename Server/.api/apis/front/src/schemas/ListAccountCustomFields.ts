import CustomFieldResponse from './CustomFieldResponse.js';

const ListAccountCustomFields = {
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
                "https://yourCompany.api.frontapp.com/custom_fields"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": CustomFieldResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListAccountCustomFields
