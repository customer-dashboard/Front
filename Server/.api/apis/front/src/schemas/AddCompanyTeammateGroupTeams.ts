const AddCompanyTeammateGroupTeams = {
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
  }
} as const;
export default AddCompanyTeammateGroupTeams
