const CreateComment = {
  "required": [
    "body"
  ],
  "properties": {
    "author_id": {
      "type": "string",
      "description": "ID of the teammate creating the comment. Alternatively, you can supply the author as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). If omitted, will post as the API Token or OAuth client of the requester."
    },
    "body": {
      "type": "string",
      "description": "Content of the comment. Can include markdown formatting."
    },
    "is_pinned": {
      "type": "boolean",
      "description": "Whether or not the comment is pinned in its conversation."
    },
    "attachments": {
      "description": "Binary data of attached files. Must use `Content-Type: multipart/form-data` if specified. See [example](https://gist.github.com/hdornier/e04d04921032e98271f46ff8a539a4cb) or read more about [Attachments](https://dev.frontapp.com/docs/attachments-1).  Max 25 MB.",
      "type": "array",
      "items": {
        "type": "string",
        "format": "binary"
      }
    }
  },
  "title": "CreateComment",
  "x-readme-ref-name": "CreateComment",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreateComment
