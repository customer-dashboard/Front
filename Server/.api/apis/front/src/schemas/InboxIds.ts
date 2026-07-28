import ResourceId from './ResourceId.js';

const InboxIds = {
  "type": "object",
  "required": [
    "inbox_ids"
  ],
  "properties": {
    "inbox_ids": {
      "type": "array",
      "items": ResourceId
    }
  },
  "title": "InboxIds",
  "x-readme-ref-name": "InboxIds"
} as const;
export default InboxIds
