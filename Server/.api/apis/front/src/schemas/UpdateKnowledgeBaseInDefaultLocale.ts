const UpdateKnowledgeBaseInDefaultLocale = {
  "body": {
    "required": [
      "name"
    ],
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "Name of the knowledge base"
      }
    },
    "$schema": "http://json-schema.org/draft-04/schema#"
  },
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "knowledge_base_id": {
            "type": "string",
            "default": "knb_123",
            "description": "The ID of the knowledge base to update"
          }
        },
        "required": [
          "knowledge_base_id"
        ]
      }
    ]
  }
} as const;
export default UpdateKnowledgeBaseInDefaultLocale
