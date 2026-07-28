import ResourceId from './ResourceId.js';

const TagIds = {
  "type": "object",
  "required": [
    "tag_ids"
  ],
  "properties": {
    "tag_ids": {
      "type": "array",
      "items": ResourceId
    }
  },
  "title": "TagIds",
  "x-readme-ref-name": "TagIds"
} as const;
export default TagIds
