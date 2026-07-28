const ContactHandle = {
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
      "description": "Source of the handle. Can be `email`, `phone`, `twitter`, `facebook`, `intercom`, `front_chat`, or `custom`.\n\n`twitter` `email` `phone` `facebook` `intercom` `front_chat` `custom`",
      "examples": [
        "email"
      ]
    }
  },
  "title": "ContactHandle",
  "x-readme-ref-name": "ContactHandle"
} as const;
export default ContactHandle
