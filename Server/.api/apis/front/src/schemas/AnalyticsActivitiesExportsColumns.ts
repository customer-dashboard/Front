import AnalyticsActivitiesColumns from './AnalyticsActivitiesColumns.js';
import AnalyticsActivitiesNumericParameterizedColumn from './AnalyticsActivitiesNumericParameterizedColumn.js';
import AnalyticsActivitiesSmartQaParameterizedColumn from './AnalyticsActivitiesSmartQaParameterizedColumn.js';
import AnalyticsFilters from './AnalyticsFilters.js';

const AnalyticsActivitiesExportsColumns = {
  "required": [
    "columns",
    "end",
    "start",
    "type"
  ],
  "type": "object",
  "title": "AnalyticsActivitiesExportsColumns",
  "x-readme-ref-name": "AnalyticsActivitiesExportsColumns",
  "properties": {
    "columns": {
      "type": "array",
      "description": "List of the columns to include in the export.\n\n**Fixed columns** are plain strings selected from the predefined list (e.g., `\"Message ID\"`).\n\n**Parameterized columns** require an additional parameter and must be specified as an object\nwith `name` and `id` fields. Supported parameterized prefixes:\n  - `Time spent in Ticket Status` — `id` is the ticket status public API ID (e.g., `sts_123`)\n  - `Transitions to Ticket Status` — `id` is the ticket status public API ID (e.g., `sts_123`)\n  - `Smart QA score` — `id` is the Smart QA criteria name (e.g., `Comprehension`)\n  - `Custom Field` — `id` is the custom field public API ID (e.g., `fld_456`)\n  - `Updated Custom Field` — `id` is the custom field public API ID (e.g., `fld_456`)\n\nExample: `[\"Message ID\", {\"name\": \"Time spent in Ticket Status\", \"id\": \"sts_123\"}, {\"name\": \"Smart QA score\", \"id\": \"Comprehension\"}]`\n",
      "default": [
        "Activity ID",
        "Type",
        "Source",
        "Message ID",
        "Segment ID",
        "Conversation ID",
        "Ticket IDs",
        "Segment",
        "Segment start",
        "Segment end",
        "Direction",
        "Status",
        "Status at activity time",
        "Inbox",
        "Inbox API ID",
        "Inbox at activity time",
        "Inbox API IDs at activity time",
        "Previous inbox IDs",
        "Message date",
        "Autoreply",
        "Reaction time",
        "Total reply time",
        "Handle time",
        "Response time",
        "Ticket resolution time",
        "Ticket replies to resolution",
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
        "Tags at activity time",
        "Tag API IDs at activity time",
        "Tag application duration",
        "Activity API ID",
        "Message API ID",
        "Comment API ID",
        "Conversation API ID",
        "Message original ID",
        "New Conversation",
        "First response",
        "Business hours",
        "Subject",
        "Account name",
        "Survey rating",
        "Survey comment",
        "Segment closed",
        "Segment contains messages",
        "Last segment activity",
        "Added tag",
        "Added tag API ID",
        "Removed tag",
        "Removed tag API ID",
        "Segment cumulative teammates"
      ],
      "items": {
        "oneOf": [
          AnalyticsActivitiesColumns,
          AnalyticsActivitiesSmartQaParameterizedColumn,
          AnalyticsActivitiesNumericParameterizedColumn
        ]
      }
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
export default AnalyticsActivitiesExportsColumns
