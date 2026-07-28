const UpdateTag = {
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
    "parent_tag_id": {
      "type": "string",
      "description": "ID of the parent of this tag. Set to `null` to remove  the parent tag."
    },
    "is_visible_in_conversation_lists": {
      "type": "boolean",
      "description": "Whether the tag is visible in conversation lists."
    }
  },
  "title": "UpdateTag",
  "x-readme-ref-name": "UpdateTag",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default UpdateTag
