const LinkResponse = {
  "type": "object",
  "description": "A link used to connect a Front conversation to an external resource.",
  "required": [
    "_links",
    "id",
    "name",
    "type",
    "external_url",
    "custom_fields"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/links/top_b2wpa"
          ]
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the link",
      "examples": [
        "top_b2wpa"
      ]
    },
    "name": {
      "type": "string",
      "description": "Display name of the link",
      "examples": [
        "JIRA-SCRAN-4567"
      ]
    },
    "type": {
      "type": "string",
      "description": "Type of the link. Typically associated with the underlying link provider (if known)",
      "examples": [
        "app_2f76b9ac738de158"
      ]
    },
    "external_url": {
      "type": "string",
      "description": "Underlying identifying external URL of the link",
      "examples": [
        "https://dundermifflin.atlassian.net/browse/PB-SCRAN-4567"
      ]
    },
    "custom_fields": {
      "description": "Custom fields for this link",
      "type": "object",
      "additionalProperties": true
    }
  },
  "title": "LinkResponse",
  "x-readme-ref-name": "LinkResponse"
} as const;
export default LinkResponse
