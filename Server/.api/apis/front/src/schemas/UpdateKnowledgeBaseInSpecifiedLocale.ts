const UpdateKnowledgeBaseInSpecifiedLocale = {
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
          },
          "locale": {
            "type": "string",
            "default": "en",
            "description": "The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the updated content"
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
export default UpdateKnowledgeBaseInSpecifiedLocale
