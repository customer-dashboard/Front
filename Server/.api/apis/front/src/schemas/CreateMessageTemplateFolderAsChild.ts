const CreateMessageTemplateFolderAsChild = {
  "type": "object",
  "description": "A message template folder that is used to store message templates or other folders.",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the message template folder",
      "examples": [
        "PTO templates"
      ]
    }
  },
  "title": "CreateMessageTemplateFolderAsChild",
  "x-readme-ref-name": "CreateMessageTemplateFolderAsChild",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreateMessageTemplateFolderAsChild
