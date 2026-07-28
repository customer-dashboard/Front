const IdentityResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "name"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/me"
          ]
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique ID of company",
      "examples": [
        "cmp_k30"
      ]
    },
    "name": {
      "type": "string",
      "description": "Name of company",
      "examples": [
        "Dunder Mifflin Paper Company, Inc."
      ]
    }
  },
  "title": "IdentityResponse",
  "x-readme-ref-name": "IdentityResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default IdentityResponse
