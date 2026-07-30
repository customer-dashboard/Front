import ResourceId from './ResourceId.js';

const AddContactsToList = {
  "required": [
    "contact_ids"
  ],
  "properties": {
    "contact_ids": {
      "type": "array",
      "description": "List of IDs of the contacts to add in the requested contact list. Alternatively, you can supply the contact source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
      "items": ResourceId
    }
  },
  "title": "AddContactsToList",
  "x-readme-ref-name": "AddContactsToList",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default AddContactsToList
