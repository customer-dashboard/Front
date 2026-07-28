const RemoveTeammatesFromTeam = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "team_id": {
            "type": "string",
            "default": "tim_123",
            "description": "The Team ID"
          }
        },
        "required": [
          "team_id"
        ]
      }
    ]
  }
} as const;
export default RemoveTeammatesFromTeam
