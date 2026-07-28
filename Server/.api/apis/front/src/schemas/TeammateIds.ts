import ResourceId from './ResourceId.js';

const TeammateIds = {
  "type": "object",
  "required": [
    "teammate_ids"
  ],
  "properties": {
    "teammate_ids": {
      "type": "array",
      "items": ResourceId
    }
  },
  "title": "TeammateIds",
  "x-readme-ref-name": "TeammateIds"
} as const;
export default TeammateIds
