import ContactHandle from './ContactHandle.js';

const CreateContact = {
  "required": [
    "handles"
  ],
  "title": "CreateContact",
  "x-readme-ref-name": "CreateContact",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Contact name"
    },
    "description": {
      "type": "string",
      "description": "Contact description"
    },
    "avatar": {
      "type": "string",
      "description": "Binary data of avatar. Must use `Content-Type: multipart/form-data` if specified. See [example](https://gist.github.com/hdornier/e04d04921032e98271f46ff8a539a4cb) or read more about [Attachments](https://dev.frontapp.com/docs/attachments-1).  Max 25 MB.",
      "format": "binary"
    },
    "links": {
      "type": "array",
      "description": "List of all the links of the contact",
      "items": {
        "type": "string"
      }
    },
    "group_names": {
      "type": "array",
      "description": "List of all the group names the contact belongs to. It will automatically create missing groups. ⚠️ Deprecated. Use `list_names` instead.",
      "items": {
        "type": "string"
      }
    },
    "list_names": {
      "type": "array",
      "description": "List of all the contact list names the contact belongs to. It will automatically create missing groups",
      "items": {
        "type": "string"
      }
    },
    "custom_fields": {
      "description": "Custom fields for this contact. If you want to keep all custom fields the same when updating this resource, do not include any custom fields in the update. If you want to update custom fields, make sure to include all custom fields, not just the fields you want to add or update. If you send only the custom fields you want to update, the other custom fields will be erased. You can retrieve the existing custom fields before making the update to note the current fields.",
      "type": "object",
      "additionalProperties": true
    },
    "handles": {
      "type": "array",
      "description": "List of the handles for this contact. Each handle object should include `handle` and `source` fields.",
      "items": ContactHandle
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreateContact
