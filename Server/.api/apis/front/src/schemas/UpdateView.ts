import ResourceId from './ResourceId.js';

const UpdateView = {
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the view"
    },
    "inbox_ids": {
      "type": "array",
      "description": "List of inbox IDs to filter by",
      "items": ResourceId
    },
    "tag_ids": {
      "type": "array",
      "description": "List of tag IDs to filter by",
      "items": ResourceId
    },
    "not_tag_ids": {
      "type": "array",
      "description": "List of tag IDs to exclude",
      "items": ResourceId
    },
    "no_tags": {
      "type": "boolean",
      "description": "Whether to filter for conversations without tags"
    },
    "assignee_ids": {
      "type": "array",
      "description": "List of assignee IDs to filter by",
      "items": ResourceId
    },
    "not_assignee_ids": {
      "type": "array",
      "description": "List of assignee IDs to exclude",
      "items": ResourceId
    },
    "highlight": {
      "type": "string",
      "description": "Color highlight for the view"
    }
  },
  "title": "UpdateView",
  "x-readme-ref-name": "UpdateView",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "view_id": {
            "type": "string",
            "default": "lns_abc123",
            "description": "The view ID"
          }
        },
        "required": [
          "view_id"
        ]
      }
    ]
  }
} as const;
export default UpdateView
