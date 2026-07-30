const GetKnowledgeBaseCategoryWithContentInSpecifiedLocale = {
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
          },
          "locale": {
            "type": "string",
            "default": "en",
            "description": "The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the content to fetch"
          }
        },
        "required": [
          "category_id",
          "locale"
        ]
      }
    ]
  }
} as const;
export default GetKnowledgeBaseCategoryWithContentInSpecifiedLocale
