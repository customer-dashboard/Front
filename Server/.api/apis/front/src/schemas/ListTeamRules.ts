import RuleResponse from './RuleResponse.js';

const ListTeamRules = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "team_id": {
            "type": "string",
            "default": "tim_123",
            "description": "The team ID"
          }
        },
        "required": [
          "team_id"
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
                "https://yourCompany.api.frontapp.com/rules"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": RuleResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListTeamRules
