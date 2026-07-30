const AnalyticsMetricId = {
  "type": "string",
  "enum": [
    "avg_csat_survey_response",
    "avg_first_response_time",
    "avg_handle_time",
    "avg_replies_to_resolution",
    "avg_resolution_time",
    "avg_response_time",
    "avg_sla_breach_time",
    "avg_total_reply_time",
    "new_segments_count",
    "num_active_segments_full",
    "num_archived_segments",
    "num_archived_segments_with_reply",
    "num_csat_survey_response",
    "num_messages_received",
    "num_messages_sent",
    "num_sla_breach",
    "pct_csat_survey_satisfaction",
    "pct_resolved_on_first_reply",
    "pct_tagged_conversations",
    "num_closed_segments",
    "num_open_segments_start",
    "num_open_segments_end",
    "num_resolved_segments",
    "num_unresolved_active_segments",
    "num_workload_segments"
  ],
  "title": "AnalyticsMetricId",
  "x-readme-ref-name": "AnalyticsMetricId"
} as const;
export default AnalyticsMetricId
