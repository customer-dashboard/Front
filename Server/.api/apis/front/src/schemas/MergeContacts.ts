const MergeContacts = {
  "required": [
    "contact_ids"
  ],
  "properties": {
    "target_contact_id": {
      "type": "string",
      "description": "Optional contact ID to merge the other contacts into."
    },
    "contact_ids": {
      "type": "array",
      "description": "Array of all the contact IDs of the contacts to be merged.  If a target contact id is provided and that contact id is not in this array, the length of this array must be between 1 and 49.  If no target contact id is provided or it is contained in this array, the length must be between 2 and 50.",
      "items": {
        "type": "string"
      }
    }
  },
  "title": "MergeContacts",
  "x-readme-ref-name": "MergeContacts",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default MergeContacts
