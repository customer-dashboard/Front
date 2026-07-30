const CreateAKnowledgeBase = {
  "body": {
    "required": [
      "name"
    ],
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Name of the knowledge base"
      },
      "type": {
        "type": "string",
        "enum": [
          "internal",
          "external"
        ],
        "description": "Determines if the knowledge base is publicly available or private only to your company",
        "default": "external",
        "examples": [
          "internal"
        ]
      }
    },
    "$schema": "http://json-schema.org/draft-04/schema#"
  }
} as const;
export default CreateAKnowledgeBase
