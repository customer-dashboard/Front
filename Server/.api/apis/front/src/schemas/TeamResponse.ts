import InboxResponse from './InboxResponse.js';
import TeammateResponse from './TeammateResponse.js';

const TeamResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "name",
    "inboxes",
    "members"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/teams/tim_aqsa"
          ]
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the team",
      "examples": [
        "tim_aqsa"
      ]
    },
    "name": {
      "type": "string",
      "description": "Name of the team",
      "examples": [
        "Stanley's crossword puzzle team"
      ]
    },
    "inboxes": {
      "type": "array",
      "description": "List of the inboxes in the team",
      "items": InboxResponse
    },
    "members": {
      "type": "array",
      "description": "List of the teammates that have access to the team",
      "items": TeammateResponse
    }
  },
  "title": "TeamResponse",
  "x-readme-ref-name": "TeamResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default TeamResponse
