const CustomFieldResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "name",
    "type",
    "description"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/custom_fields/fld_co0e"
          ]
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the custom field",
      "examples": [
        "fld_co0e"
      ]
    },
    "name": {
      "type": "string",
      "description": "Name of the custom field",
      "examples": [
        "Customer plan"
      ]
    },
    "description": {
      "type": "string",
      "description": "Description of the custom field",
      "examples": [
        "The billing plan of the customer"
      ]
    },
    "type": {
      "type": "string",
      "description": "Type of the custom field\n\n`string` `boolean` `datetime` `number` `teammate` `inbox` `enum`",
      "enum": [
        "string",
        "boolean",
        "datetime",
        "number",
        "teammate",
        "inbox",
        "enum"
      ],
      "examples": [
        "enum"
      ]
    },
    "values": {
      "type": "array",
      "description": "List of possible values for a custom field of type `enum`.",
      "items": {
        "type": "object",
        "properties": {
          "value": {
            "type": "string",
            "description": "Value of the custom field",
            "examples": [
              "Enterprise"
            ]
          },
          "label": {
            "type": "string",
            "description": "Human readable label for the value",
            "examples": [
              "Customer plan"
            ]
          }
        }
      }
    }
  },
  "title": "CustomFieldResponse",
  "x-readme-ref-name": "CustomFieldResponse"
} as const;
export default CustomFieldResponse
