const RuleResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "name",
    "actions",
    "is_private"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/rules/rul_58xhq"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "owner": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to rule owner"
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the rule",
      "examples": [
        "rul_58xhq"
      ]
    },
    "name": {
      "type": "string",
      "description": "Name of the rule",
      "examples": [
        "Scranton new account workflow"
      ]
    },
    "actions": {
      "type": "array",
      "description": "List of the rule's actions description",
      "items": {
        "type": "string",
        "examples": [
          "Assign to Pam",
          "Unassign from Michael",
          "Tag with Scranton is the Best Branch",
          "Tag with Michael is the Best Boss"
        ]
      }
    },
    "is_private": {
      "type": "boolean",
      "description": "Whether or not the rule is individual",
      "examples": [
        false
      ]
    }
  },
  "title": "RuleResponse",
  "x-readme-ref-name": "RuleResponse"
} as const;
export default RuleResponse
