const GetKnowledgeBaseArticleWithContentInDefaultLocale = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "article_id": {
            "type": "string",
            "default": "kba_123",
            "description": "The ID of the article to fetch"
          }
        },
        "required": [
          "article_id"
        ]
      }
    ]
  }
} as const;
export default GetKnowledgeBaseArticleWithContentInDefaultLocale
