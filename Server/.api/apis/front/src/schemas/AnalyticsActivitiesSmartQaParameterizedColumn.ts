import AnalyticsActivitiesSmartQaScoreParameters from './AnalyticsActivitiesSmartQaScoreParameters.js';

const AnalyticsActivitiesSmartQaParameterizedColumn = {
  "title": "AnalyticsActivitiesSmartQAParameterizedColumn",
  "type": "object",
  "required": [
    "name",
    "id"
  ],
  "properties": {
    "name": {
      "type": "string",
      "enum": [
        "Smart QA score"
      ]
    },
    "id": AnalyticsActivitiesSmartQaScoreParameters
  },
  "x-readme-ref-name": "AnalyticsActivitiesSmartQAParameterizedColumn"
} as const;
export default AnalyticsActivitiesSmartQaParameterizedColumn
