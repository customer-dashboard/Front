const CreateContactNote = {
  "type": "object",
  "required": [
    "author_id",
    "body"
  ],
  "properties": {
    "author_id": {
      "type": "string",
      "description": "ID of teammate creating the note"
    },
    "body": {
      "type": "string",
      "description": "Content of the note"
    }
  },
  "title": "CreateContactNote",
  "x-readme-ref-name": "CreateContactNote",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreateContactNote
