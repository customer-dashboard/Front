const KnowledgeBaseCategoryPatch = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the knowledge base category"
    },
    "description": {
      "type": "string",
      "description": "Description of the knowledge base category"
    }
  },
  "title": "KnowledgeBaseCategoryPatch",
  "x-readme-ref-name": "KnowledgeBaseCategoryPatch",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default KnowledgeBaseCategoryPatch
