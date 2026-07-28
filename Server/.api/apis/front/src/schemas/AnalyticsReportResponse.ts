import AnalyticsScalar from './AnalyticsScalar.js';

const AnalyticsReportResponse = {
  "type": "object",
  "required": [
    "_links",
    "uid",
    "status",
    "progress",
    "metrics"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to analytics job.",
          "examples": [
            "https://yourCompany.api.frontapp.com/analytics/reports/b45efa66237cc453252d9019449c7a64f5cfdb491b6c2c1d6df33c1050d60e33"
          ]
        }
      }
    },
    "uid": {
      "type": "string",
      "description": "The UID of the analytics report",
      "examples": [
        "b45efa66237cc453252d9019449c7a64f5cfdb491b6c2c1d6df33c1050d60e33"
      ]
    },
    "status": {
      "type": "string",
      "enum": [
        "running",
        "done",
        "failed"
      ],
      "description": "Status of the report.\n\n`running` `done` `failed`",
      "examples": [
        "done"
      ]
    },
    "progress": {
      "type": "integer",
      "minimum": 0,
      "maximum": 100,
      "description": "Number ranging from 0 to 100 corresponding to the percentage of the analytics processed.",
      "examples": [
        100
      ]
    },
    "metrics": {
      "type": "array",
      "description": "The metrics computed for the report.",
      "items": AnalyticsScalar
    }
  },
  "title": "AnalyticsReportResponse",
  "x-readme-ref-name": "AnalyticsReportResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default AnalyticsReportResponse
