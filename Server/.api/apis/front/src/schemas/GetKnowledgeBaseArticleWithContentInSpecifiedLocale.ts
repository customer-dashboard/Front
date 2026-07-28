const GetKnowledgeBaseArticleWithContentInSpecifiedLocale = {
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
          },
          "locale": {
            "type": "string",
            "default": "en",
            "description": "The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the content to fetch"
          }
        },
        "required": [
          "article_id",
          "locale"
        ]
      }
    ]
  }
} as const;
export default GetKnowledgeBaseArticleWithContentInSpecifiedLocale
