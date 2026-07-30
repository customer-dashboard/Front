import ResourceId from './ResourceId.js';

const TeamIds = {
  "type": "object",
  "required": [
    "team_ids"
  ],
  "properties": {
    "team_ids": {
      "type": "array",
      "items": ResourceId
    }
  },
  "title": "TeamIds",
  "x-readme-ref-name": "TeamIds"
} as const;
export default TeamIds
