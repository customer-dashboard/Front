const CreateMessageTemplateFolder = {
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
    },
    "parent_folder_id": {
      "type": "string",
      "description": "ID of the parent folder to be placed into. Goes into the root folder if unspecified or if null."
    }
  },
  "title": "CreateMessageTemplateFolder",
  "x-readme-ref-name": "CreateMessageTemplateFolder",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreateMessageTemplateFolder
