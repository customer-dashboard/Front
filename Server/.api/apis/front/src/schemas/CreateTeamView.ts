const CreateTeamView = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "team_id": {
            "type": "string",
            "default": "tim_xyz",
            "description": "The team ID"
          }
        },
        "required": [
          "team_id"
        ]
      }
    ]
  }
} as const;
export default CreateTeamView
