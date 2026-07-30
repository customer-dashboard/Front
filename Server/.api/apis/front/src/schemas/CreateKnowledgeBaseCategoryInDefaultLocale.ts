const CreateKnowledgeBaseCategoryInDefaultLocale = {
  "body": {
    "required": [
      "name"
    ],
    "type": "object",
    "properties": {
      "parent_category_id": {
        "type": "string",
        "description": "ID of the parent category"
      },
      "name": {
        "type": "string",
        "description": "Name of the knowledge base category"
      },
      "description": {
        "type": "string",
        "description": "Description of the knowledge base category"
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
            "description": "The ID of the knowledge base to create the category in"
          }
        },
        "required": [
          "knowledge_base_id"
        ]
      }
    ]
  }
} as const;
export default CreateKnowledgeBaseCategoryInDefaultLocale
