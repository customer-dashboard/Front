import ResourceId from './ResourceId.js';

const RemoveContactsFromList = {
  "required": [
    "contact_ids"
  ],
  "properties": {
    "contact_ids": {
      "type": "array",
      "description": "List of IDs of the contacts to remove from the requested contact list. Alternatively, you can supply the contact source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
      "maxItems": 50,
      "items": ResourceId
    }
  },
  "title": "RemoveContactsFromList",
  "x-readme-ref-name": "RemoveContactsFromList",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default RemoveContactsFromList
