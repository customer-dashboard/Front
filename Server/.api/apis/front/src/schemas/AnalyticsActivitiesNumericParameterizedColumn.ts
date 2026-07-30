const AnalyticsActivitiesNumericParameterizedColumn = {
  "title": "AnalyticsActivitiesNumericParameterizedColumn",
  "type": "object",
  "required": [
    "name",
    "id"
  ],
  "properties": {
    "name": {
      "type": "string",
      "enum": [
        "Time spent in Ticket Status",
        "Transitions to Ticket Status",
        "Custom Field",
        "Updated Custom Field"
      ]
    },
    "id": {
      "description": "Public API string ID (e.g., sts_123 for ticket statuses, fld_456 for custom fields) or legacy numeric ID",
      "oneOf": [
        {
          "type": "string"
        },
        {
          "type": "integer"
        }
      ]
    }
  },
  "x-readme-ref-name": "AnalyticsActivitiesNumericParameterizedColumn"
} as const;
export default AnalyticsActivitiesNumericParameterizedColumn
