const TeamPreviewResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "name"
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
    }
  },
  "title": "TeamPreviewResponse",
  "x-readme-ref-name": "TeamPreviewResponse"
} as const;
export default TeamPreviewResponse
