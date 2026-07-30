const AnalyticsScalarValue = {
  "oneOf": [
    {
      "type": "integer"
    },
    {
      "type": "string"
    },
    {
      "type": "object",
      "properties": {
        "label": {
          "type": "string"
        },
        "resource": {
          "type": "object",
          "required": [
            "id",
            "_links"
          ],
          "properties": {
            "id": {
              "type": "string"
            },
            "_links": {
              "type": "object",
              "properties": {
                "self": {
                  "type": "string",
                  "description": "Link to a resource."
                }
              }
            }
          }
        }
      }
    }
  ],
  "nullable": true,
  "description": "The value of a scalar metric.",
  "title": "AnalyticsScalarValue",
  "x-readme-ref-name": "AnalyticsScalarValue"
} as const;
export default AnalyticsScalarValue
