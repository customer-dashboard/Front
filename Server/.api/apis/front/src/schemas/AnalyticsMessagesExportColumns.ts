import AnalyticsFilters from './AnalyticsFilters.js';
import AnalyticsMessagesColumns from './AnalyticsMessagesColumns.js';

const AnalyticsMessagesExportColumns = {
  "required": [
    "columns",
    "end",
    "start",
    "type"
  ],
  "type": "object",
  "title": "AnalyticsMessagesExportColumns",
  "x-readme-ref-name": "AnalyticsMessagesExportColumns",
  "properties": {
    "columns": {
      "type": "array",
      "description": "List of the columns to include in the export.\n",
      "default": [
        "Message ID",
        "Segment ID",
        "Conversation ID",
        "Ticket IDs",
        "Segment",
        "Direction",
        "Status",
        "Inbox",
        "Inbox API ID",
        "Inbox at activity time",
        "Inbox API IDs at activity time",
        "Message date",
        "Autoreply",
        "Reaction time",
        "Total reply time",
        "Handle time",
        "Response time",
        "Attributed to",
        "Assignee",
        "Author",
        "Contact name",
        "Contact handle",
        "Account names",
        "From",
        "To",
        "Cc",
        "Bcc",
        "Extract",
        "Tags",
        "Tag API IDs",
        "Message API ID",
        "Conversation API ID",
        "New Conversation",
        "First response",
        "Business hours",
        "Subject",
        "Segment start",
        "Segment end",
        "Segment closed",
        "Last segment activity",
        "Segment cumulative teammates"
      ],
      "items": AnalyticsMessagesColumns
    },
    "type": {
      "type": "string",
      "description": "The type of export to create. The type you specify determines which columns are available for the export.",
      "enum": [
        "messages",
        "events"
      ]
    },
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
    "filters": AnalyticsFilters
  }
} as const;
export default AnalyticsMessagesExportColumns
