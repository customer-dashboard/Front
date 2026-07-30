const EditDraft = {
  "required": [
    "body",
    "channel_id"
  ],
  "title": "EditDraft",
  "x-readme-ref-name": "EditDraft",
  "type": "object",
  "properties": {
    "author_id": {
      "type": "string",
      "description": "ID of the teammate on behalf of whom the draft will be created. Alternatively, you can supply the author ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1). If omitted, will post as the API Token or Application making the request."
    },
    "to": {
      "type": "array",
      "description": "List of recipient handles who will receive the message once the draft is sent",
      "items": {
        "type": "string"
      }
    },
    "cc": {
      "type": "array",
      "description": "List of recipient handles who will receive a copy of the message once the draft is sent",
      "items": {
        "type": "string"
      }
    },
    "bcc": {
      "type": "array",
      "description": "List of the recipient handles who will receive a blind copy of the message once the draft is sent",
      "items": {
        "type": "string"
      }
    },
    "subject": {
      "type": "string",
      "description": "Subject of the draft."
    },
    "body": {
      "type": "string",
      "description": "Body of the draft"
    },
    "quote_body": {
      "type": "string",
      "description": "Body for the quote that the message is referencing. Only available on email channels."
    },
    "attachments": {
      "description": "Binary data of attached files. Must use `Content-Type: multipart/form-data` if specified. See [example](https://gist.github.com/hdornier/e04d04921032e98271f46ff8a539a4cb) or read more about [Attachments](https://dev.frontapp.com/docs/attachments-1). Max 25 MB.",
      "type": "array",
      "items": {
        "type": "string",
        "format": "binary"
      }
    },
    "mode": {
      "description": "Mode of the draft to update. Can only be 'shared' (draft is visible to all teammates with access to the conversation).",
      "type": "string",
      "enum": [
        "shared"
      ],
      "default": "private"
    },
    "signature_id": {
      "description": "ID of the signature to attach to this draft. If null, no signature is attached.",
      "type": "string"
    },
    "should_add_default_signature": {
      "type": "boolean",
      "description": "Whether or not Front should try to resolve a signature for the message. Is ignored if signature_id is included. Default false;"
    },
    "channel_id": {
      "type": "string",
      "description": "ID of the channel from which the draft will be sent. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    },
    "version": {
      "type": "string",
      "description": "Version of the draft"
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#",
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "message_id": {
            "type": "string",
            "default": "msg_123",
            "description": "The draft ID"
          }
        },
        "required": [
          "message_id"
        ]
      }
    ]
  }
} as const;
export default EditDraft
