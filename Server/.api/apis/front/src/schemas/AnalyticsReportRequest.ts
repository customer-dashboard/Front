import AnalyticsFilters from './AnalyticsFilters.js';
import AnalyticsMetricId from './AnalyticsMetricId.js';

const AnalyticsReportRequest = {
  "properties": {
    "start": {
      "type": "number",
      "description": "Start time of the data to include in the export (seconds since 1970-01-01T00:00:00+00). Will be rounded down to the start of the day."
    },
    "end": {
      "type": "number",
      "description": "End time of the data to include in the export (seconds since 1970-01-01T00:00:00+00). Will be rounded up to the end of the day."
    },
    "timezone": {
      "type": "string",
      "description": "[IANA name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) of the timezone to format the dates with. If omitted, the export will use Etc/UTC."
    },
    "filters": AnalyticsFilters,
    "metrics": {
      "type": "array",
      "description": "List of the metrics required.",
      "items": AnalyticsMetricId
    }
  },
  "required": [
    "start",
    "end",
    "metrics"
  ],
  "title": "AnalyticsReportRequest",
  "x-readme-ref-name": "AnalyticsReportRequest",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default AnalyticsReportRequest
