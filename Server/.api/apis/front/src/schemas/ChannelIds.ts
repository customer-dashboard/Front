import ResourceId from './ResourceId.js';

const ChannelIds = {
  "type": "object",
  "required": [
    "channel_ids"
  ],
  "properties": {
    "channel_ids": {
      "type": "array",
      "items": ResourceId
    }
  },
  "title": "ChannelIds",
  "x-readme-ref-name": "ChannelIds"
} as const;
export default ChannelIds
