import AnalyticsActivitiesExportsColumns from './AnalyticsActivitiesExportsColumns.js';
import AnalyticsMessagesExportColumns from './AnalyticsMessagesExportColumns.js';

const AnalyticsExportRequest = {
  "discriminator": {
    "propertyName": "type",
    "mapping": {
      "messages": "#/components/schemas/AnalyticsMessagesExportColumns",
      "events": "#/components/schemas/AnalyticsActivitiesExportsColumns"
    }
  },
  "oneOf": [
    AnalyticsMessagesExportColumns,
    AnalyticsActivitiesExportsColumns
  ],
  "required": [
    "start",
    "end",
    "type"
  ],
  "title": "AnalyticsExportRequest",
  "x-readme-ref-name": "AnalyticsExportRequest",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default AnalyticsExportRequest
