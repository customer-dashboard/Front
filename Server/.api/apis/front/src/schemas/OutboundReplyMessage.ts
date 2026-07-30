const OutboundReplyMessage = {
  "required": [
    "body"
  ],
  "properties": {
    "to": {
      "type": "array",
      "description": "List of the recipient handles who will receive this message",
      "items": {
        "type": "string"
      }
    },
    "cc": {
      "type": "array",
      "description": "List of the recipient handles who will receive a copy of this message",
      "items": {
        "type": "string"
      }
    },
    "bcc": {
      "type": "array",
      "description": "List of the recipient handles who will receive a copy of this message",
      "items": {
        "type": "string"
      }
    },
    "sender_name": {
      "type": "string",
      "description": "Name used for the sender info of the message"
    },
    "subject": {
      "type": "string",
      "description": "Subject of the message for email message"
    },
    "author_id": {
      "type": "string",
      "description": "ID of the teammate on behalf of whom the answer is sent"
    },
    "channel_id": {
      "type": "string",
      "description": "Channel ID the message is sent from"
    },
    "body": {
      "type": "string",
      "description": "Body of the message"
    },
    "text": {
      "type": "string",
      "description": "Text version of the body for email messages"
    },
    "quote_body": {
      "type": "string",
      "description": "Body for the quote that the message is referencing. Only available on email channels."
    },
    "options": {
      "type": "object",
      "properties": {
        "tag_ids": {
          "type": "array",
          "description": "List of tag IDs to add to the conversation",
          "items": {
            "type": "string"
          }
        },
        "archive": {
          "type": "boolean",
          "default": true,
          "description": "Archive the conversation right when sending the message. `true` by default"
        }
      }
    },
    "attachments": {
      "description": "Binary data of attached files. Must use `Content-Type: multipart/form-data` if specified. See [example](https://gist.github.com/hdornier/e04d04921032e98271f46ff8a539a4cb) or read more about [Attachments](https://dev.frontapp.com/docs/attachments-1).  Max 25 MB.",
      "type": "array",
      "items": {
        "type": "string",
        "format": "binary"
      }
    },
    "signature_id": {
      "type": "string",
      "description": "ID of the signature to attach to this draft. Only supported for email channels; using this on other channel types returns a 403 forbidden error. If null, no signature is attached."
    },
    "should_add_default_signature": {
      "type": "boolean",
      "description": "Whether or not Front should try to resolve a signature for the message. Only applies to email channels and is ignored if signature_id is included or if author_id is omitted. Default false;"
    }
  },
  "title": "OutboundReplyMessage",
  "x-readme-ref-name": "OutboundReplyMessage",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default OutboundReplyMessage
