const CreateTeamMessageTemplate = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "team_id": {
            "type": "string",
            "default": "tim_55c8c149",
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
export default CreateTeamMessageTemplate
