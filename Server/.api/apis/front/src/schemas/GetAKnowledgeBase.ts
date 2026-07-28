const GetAKnowledgeBase = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "knowledge_base_id": {
            "type": "string",
            "default": "knb_123",
            "description": "The ID of the knowledge base to fetch"
          }
        },
        "required": [
          "knowledge_base_id"
        ]
      }
    ]
  }
} as const;
export default GetAKnowledgeBase
