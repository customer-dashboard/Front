const GetKnowledgeBaseCategoryContentInDefaultLocale = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "category_id": {
            "type": "string",
            "default": "kbc_123",
            "description": "The ID of the category to fetch"
          }
        },
        "required": [
          "category_id"
        ]
      }
    ]
  }
} as const;
export default GetKnowledgeBaseCategoryContentInDefaultLocale
