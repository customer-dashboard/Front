import ResourceId from './ResourceId.js';

const ContactIds = {
  "type": "object",
  "required": [
    "contact_ids"
  ],
  "properties": {
    "contact_ids": {
      "type": "array",
      "description": "The contact IDs to include. Alternatively, you can supply the contact source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
      "items": ResourceId
    }
  },
  "title": "ContactIds",
  "x-readme-ref-name": "ContactIds",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default ContactIds
