const UpdateSignature = {
  "type": "object",
  "description": "A signature that can be used to sign messages.",
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
    "is_visible_for_all_teammate_channels": {
      "type": "boolean",
      "description": "Whether or not the signature is visible in all individual channels for teammates in the given team. Can only be set for shared signatures."
    },
    "is_default": {
      "type": "boolean",
      "description": "If true, the signature will be set as the default signature for the team or teammate.",
      "default": false
    },
    "channel_ids": {
      "type": "array",
      "description": "The specific shared channels this signature if available in. If null, then it will be available in all channels. If unspecified, will retain previous value. Alternatively, you can specify channels using a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
      "items": {
        "type": "string"
      }
    }
  },
  "title": "UpdateSignature",
  "x-readme-ref-name": "UpdateSignature",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "signature_id": {
            "type": "string",
            "default": "sig_123",
            "description": "The signature ID"
          }
        },
        "required": [
          "signature_id"
        ]
      }
    ]
  }
} as const;
export default UpdateSignature
