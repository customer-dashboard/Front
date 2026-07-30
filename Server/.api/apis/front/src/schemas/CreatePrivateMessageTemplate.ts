const CreatePrivateMessageTemplate = {
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
    "folder_id": {
      "type": "string",
      "description": "ID of the message template folder to place this message template in"
    }
  },
  "title": "CreatePrivateMessageTemplate",
  "x-readme-ref-name": "CreatePrivateMessageTemplate",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreatePrivateMessageTemplate
