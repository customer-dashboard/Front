const CreateTag = {
  "type": "object",
  "description": "A tag is a label that can be used to classify conversations.",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the tag",
      "maxLength": 64
    },
    "description": {
      "type": "string",
      "description": "Description of the tag"
    },
    "highlight": {
      "type": "string",
      "description": "Highlight color of the tag.",
      "enum": [
        "grey",
        "pink",
        "red",
        "orange",
        "yellow",
        "green",
        "light-blue",
        "blue",
        "purple"
      ]
    },
    "is_visible_in_conversation_lists": {
      "type": "boolean",
      "description": "Whether the tag is visible in conversation lists.",
      "default": false
    }
  },
  "title": "CreateTag",
  "x-readme-ref-name": "CreateTag",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreateTag
