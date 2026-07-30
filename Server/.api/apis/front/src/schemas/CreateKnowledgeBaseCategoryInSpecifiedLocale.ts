const CreateKnowledgeBaseCategoryInSpecifiedLocale = {
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
          },
          "locale": {
            "type": "string",
            "default": "en",
            "description": "The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the category's content"
          }
        },
        "required": [
          "knowledge_base_id",
          "locale"
        ]
      }
    ]
  }
} as const;
export default CreateKnowledgeBaseCategoryInSpecifiedLocale
