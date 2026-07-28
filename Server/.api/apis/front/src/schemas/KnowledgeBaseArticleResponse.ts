import Attachment from './Attachment.js';

const KnowledgeBaseArticleResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "slug",
    "name",
    "status",
    "keywords",
    "content",
    "locale",
    "attachments"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/knowledge_base_articles/kba_12"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "knowledge_base": {
              "type": "string",
              "description": "Link to the article's knowledge base",
              "examples": [
                "https://yourCompany.api.frontapp.com/knowledge_bases/knb_12"
              ]
            },
            "category": {
              "type": "string",
              "description": "Link to the article's category",
              "examples": [
                "https://yourCompany.api.frontapp.com/knowledge_base_category/kbc_12"
              ]
            },
            "last_editor": {
              "type": "string",
              "description": "Link to the article's last editor",
              "examples": [
                "https://yourCompany.api.frontapp.com/teammates/tea_6r55a"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the knowledge base article",
      "examples": [
        "kba_12"
      ]
    },
    "slug": {
      "type": "string",
      "description": "URL slug of the article. Construct the full URL using the template of protocol/knowledge base domain/locale/slug, such as https://yourDomain.com/en/articles/5",
      "examples": [
        "/articles/5"
      ]
    },
    "name": {
      "type": "string",
      "description": "Name of the article",
      "examples": [
        "Billing 101"
      ]
    },
    "status": {
      "type": "string",
      "description": "Status of the article",
      "examples": [
        "published"
      ]
    },
    "keywords": {
      "type": "array",
      "description": "Article keywords",
      "items": {
        "type": "string",
        "examples": [
          "billing",
          "returns"
        ]
      }
    },
    "content": {
      "type": "string",
      "description": "Article HTML content",
      "examples": [
        "<h1>How to process a return</h1><p>To process a return...</p>"
      ]
    },
    "locale": {
      "type": "string",
      "description": "Locale of the article",
      "examples": [
        "en"
      ]
    },
    "attachments": {
      "type": "array",
      "items": Attachment,
      "description": "List of files attached to the article"
    },
    "last_edited_at": {
      "type": "number",
      "description": "Timestamp when the article was last edited",
      "examples": [
        1622672452.363
      ]
    },
    "created_at": {
      "type": "number",
      "description": "Timestamp when the article was created",
      "examples": [
        1622672452.363
      ]
    },
    "updated_at": {
      "type": "number",
      "description": "Timestamp when the article was updated",
      "examples": [
        1654309308.278
      ]
    }
  },
  "title": "KnowledgeBaseArticleResponse",
  "x-readme-ref-name": "KnowledgeBaseArticleResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default KnowledgeBaseArticleResponse
