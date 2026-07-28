const CreatePrivateSignature = {
  "type": "object",
  "description": "A signature that can be used to sign messages.",
  "required": [
    "name",
    "body"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the signature"
    },
    "sender_info": {
      "type": "string",
      "description": "Sender info of the signature that will appear in the From line of emails sent."
    },
    "body": {
      "type": "string",
      "description": "Body of the signature"
    },
    "is_default": {
      "type": "boolean",
      "description": "If true, the signature will be set as the default signature for the teammate.",
      "default": false
    },
    "channel_ids": {
      "type": "array",
      "description": "The specific channels this signature is available in. If omitted or null, the signature will be available in all channels the teammate has access to. Alternatively, you can specify channels using a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
      "items": {
        "type": "string"
      }
    }
  },
  "title": "CreatePrivateSignature",
  "x-readme-ref-name": "CreatePrivateSignature",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreatePrivateSignature
