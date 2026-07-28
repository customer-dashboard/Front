import AnalyticsFilters from './AnalyticsFilters.js';

const AnalyticsExportResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "status",
    "progress",
    "filters"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to analytics export",
          "examples": [
            "https://yourCompany.api.frontapp.com/analytics/exports/exp_o9y1a"
          ]
        }
      }
    },
    "id": {
      "type": "string",
      "description": "The public ID of the analytics export",
      "examples": [
        "exp_o9y1a"
      ]
    },
    "status": {
      "type": "string",
      "enum": [
        "running",
        "done",
        "too_big",
        "failed"
      ],
      "description": "Status of the analytics\n\n`running` `done` `too_big` `failed`",
      "examples": [
        "running"
      ]
    },
    "progress": {
      "type": "integer",
      "minimum": 0,
      "maximum": 100,
      "description": "Number ranging from 0 to 100 corresponding to the percentage of the analytics processed.",
      "examples": [
        20
      ]
    },
    "url": {
      "type": "string",
      "description": "The URL from which the export data can be downloaded. Only displays after you make a GET request to the link included in the POST response.",
      "examples": [
        "https://api.frontapp.com/analytics/exports/exp_o9y1a/download"
      ]
    },
    "filename": {
      "type": "string",
      "description": "The filename of the export with extension included. Only displays after you make a GET request to the link included in the POST response.",
      "examples": [
        "export-messages-yourCompany-2023-07-19-212d-e55df0.csv"
      ]
    },
    "size": {
      "type": [
        "number",
        "null"
      ],
      "description": "Size (in bytes) of the export data. Only displays after you make a GET request to the link included in the POST response.",
      "examples": [
        26639
      ]
    },
    "created_at": {
      "type": "number",
      "description": "Timestamp (in seconds) at which the export was requested.",
      "examples": [
        1703103649.159
      ]
    },
    "filters": AnalyticsFilters
  },
  "title": "AnalyticsExportResponse",
  "x-readme-ref-name": "AnalyticsExportResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default AnalyticsExportResponse
