import ResourceId from './ResourceId.js';

const AccountIds = {
  "type": "object",
  "required": [
    "account_ids"
  ],
  "properties": {
    "account_ids": {
      "type": "array",
      "items": ResourceId
    }
  },
  "title": "AccountIds",
  "x-readme-ref-name": "AccountIds"
} as const;
export default AccountIds
