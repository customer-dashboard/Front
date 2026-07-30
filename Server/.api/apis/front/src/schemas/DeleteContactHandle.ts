const DeleteContactHandle = {
  "title": "DeleteContactHandle",
  "x-readme-ref-name": "DeleteContactHandle",
  "type": "object",
  "required": [
    "handle",
    "source"
  ],
  "properties": {
    "handle": {
      "type": "string",
      "description": "Handle used to reach the contact.",
      "examples": [
        "dwight@limitlesspaper.com"
      ]
    },
    "source": {
      "type": "string",
      "enum": [
        "twitter",
        "email",
        "phone",
        "facebook",
        "intercom",
        "front_chat",
        "custom"
      ],
      "description": "Source of the handle. Can be `email`, `phone`, `twitter`, `facebook`, `intercom`, `front_chat`, or `custom`.",
      "examples": [
        "email"
      ]
    },
    "force": {
      "type": "boolean",
      "description": "Force the deletetion of the contact if the handle is the last one",
      "default": false
    }
  },
  "$schema": "http://json-schema.org/draft-04/schema#",
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "contact_id": {
            "type": "string",
            "default": "crd_123",
            "description": "The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
          }
        },
        "required": [
          "contact_id"
        ]
      }
    ]
  }
} as const;
export default DeleteContactHandle
