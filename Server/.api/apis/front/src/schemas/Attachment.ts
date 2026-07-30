const Attachment = {
  "type": "object",
  "required": [
    "id",
    "url",
    "filename",
    "content_type",
    "size",
    "metadata"
  ],
  "properties": {
    "id": {
      "type": "string",
      "description": "The unique identifier of the attachment.",
      "examples": [
        "fil_3q8a7mby"
      ]
    },
    "filename": {
      "type": "string",
      "description": "Name of the attached file",
      "examples": [
        "Andy_Anger_Management_Certificate.png"
      ]
    },
    "url": {
      "type": "string",
      "description": "URL to download the attached file",
      "examples": [
        "https://yourCompany.api.frontapp.com/download/fil_3q8a7mby"
      ]
    },
    "content_type": {
      "type": "string",
      "description": "Content type of the attached file in [MIME format](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types). Note that some attachments types may not be supported.",
      "examples": [
        "image/png"
      ]
    },
    "size": {
      "type": "integer",
      "description": "Size (in byte) of the attached file",
      "examples": [
        4405
      ]
    },
    "metadata": {
      "description": "Attachment metadata",
      "type": "object",
      "properties": {
        "is_inline": {
          "type": "boolean",
          "description": "Whether or not the attachment is part of the message body",
          "examples": [
            true
          ]
        },
        "cid": {
          "type": "string",
          "description": "Unique identifier used to link an attachment to where it is used in the message body",
          "examples": [
            "526b45586d0e6b1c484afab63d1ef0be"
          ]
        }
      }
    }
  },
  "title": "Attachment",
  "x-readme-ref-name": "Attachment"
} as const;
export default Attachment
