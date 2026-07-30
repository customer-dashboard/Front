const GetAKnowledgeBaseWithContentInSpecifiedLocale = {
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
          },
          "locale": {
            "type": "string",
            "default": "en",
            "description": "The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the content to fetch"
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
export default GetAKnowledgeBaseWithContentInSpecifiedLocale
