const CreateMessageTemplateAsChild = {
  "type": "object",
  "description": "A message template that is used for pre-written responses",
  "required": [
    "name",
    "body"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the message template",
      "examples": [
        "Out of Office"
      ]
    },
    "subject": {
      "type": "string",
      "description": "Subject of the message template.",
      "examples": [
        "Out of Office"
      ]
    },
    "body": {
      "type": "string",
      "description": "Body of the message template. You can supply HTML with inline CSS to structure and style your template.",
      "examples": [
        "<p>Sorry, I'm OOO until <span style=\"color: green;\">October 25th</span>.</p>\n"
      ]
    },
    "inbox_ids": {
      "type": "array",
      "description": "The specific inboxes this template is available in. If unspecified or null, then it will be available in all inboxes. Array should be non-empty.",
      "items": {
        "type": "string"
      }
    }
  },
  "title": "CreateMessageTemplateAsChild",
  "x-readme-ref-name": "CreateMessageTemplateAsChild",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreateMessageTemplateAsChild
