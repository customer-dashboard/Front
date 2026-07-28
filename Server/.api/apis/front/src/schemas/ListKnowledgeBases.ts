import KnowledgeBaseSlimResponse from './KnowledgeBaseSlimResponse.js';

const ListKnowledgeBases = {
  "response": {
    "200": {
      "type": "object",
      "properties": {
        "_links": {
          "type": "object",
          "properties": {
            "self": {
              "type": "string",
              "description": "Link to resource",
              "examples": [
                "https://yourCompany.api.frontapp.com/knowledge_bases"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": KnowledgeBaseSlimResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListKnowledgeBases
