const AnalyticsScalarType = {
  "type": "string",
  "enum": [
    "number",
    "percentage",
    "string",
    "duration",
    "resource"
  ],
  "title": "AnalyticsScalarType",
  "x-readme-ref-name": "AnalyticsScalarType",
  "examples": [
    "number"
  ],
  "description": "`number` `percentage` `string` `duration` `resource`"
} as const;
export default AnalyticsScalarType
