import InboxResponse from './InboxResponse.js';

const ListCompanyTeammateGroupTeamInboxes = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "teammate_group_id": {
            "type": "string",
            "default": "cir_123",
            "description": "The teammate group ID."
          }
        },
        "required": [
          "teammate_group_id"
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
                "https://yourCompany.api.frontapp.com/inboxes"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": InboxResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListCompanyTeammateGroupTeamInboxes
