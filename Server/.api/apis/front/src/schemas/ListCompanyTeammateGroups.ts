import TeammateGroupResponse from './TeammateGroupResponse.js';

const ListCompanyTeammateGroups = {
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
                "https://yourCompany.api.frontapp.com/teammate_groups"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": TeammateGroupResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListCompanyTeammateGroups
