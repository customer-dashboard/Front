const TagResponse = {
  "type": "object",
  "description": "A tag is a label that can be used to classify conversations.",
  "required": [
    "_links",
    "id",
    "name",
    "description",
    "highlight",
    "is_private",
    "is_visible_in_conversation_lists"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/tags/tag_2oxhvy"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "conversations": {
              "type": "string",
              "description": "Link to tag conversations",
              "examples": [
                "https://yourCompany.api.frontapp.com/tags/tag_2oxhvy/conversations"
              ]
            },
            "owner": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to tag owner",
              "examples": [
                "https://yourCompany.api.frontapp.com/teammates/tea_6jydq"
              ]
            },
            "parent_tag": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to parent tag",
              "examples": [
                "https://yourCompany.api.frontapp.com/tags/tag_3h07ym"
              ]
            },
            "children": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to tag children",
              "examples": [
                "https://yourCompany.api.frontapp.com/tags/tag_2oxhvy/children"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the tag",
      "examples": [
        "tag_2oxhvy"
      ]
    },
    "name": {
      "type": "string",
      "description": "Name of the tag",
      "examples": [
        "Warehouse task"
      ]
    },
    "description": {
      "type": [
        "string",
        "null"
      ],
      "description": "Description of the tag",
      "examples": [
        "Sitting on your biscuit, never having to risk it"
      ]
    },
    "highlight": {
      "type": [
        "string",
        "null"
      ],
      "description": "Highlight color or emoji of the tag. Null if the tag does not have a highlight."
    },
    "is_private": {
      "type": "boolean",
      "description": "Whether or not the tag is individual",
      "examples": [
        false
      ]
    },
    "is_visible_in_conversation_lists": {
      "type": "boolean",
      "description": "Whether the tag is visible in conversation lists.",
      "examples": [
        true
      ]
    },
    "created_at": {
      "type": "number",
      "description": "Timestamp of tag create creation",
      "examples": [
        1682538996.583
      ]
    },
    "updated_at": {
      "type": "number",
      "description": "Timestamp of the last tag update",
      "examples": [
        1699575875.186
      ]
    }
  },
  "title": "TagResponse",
  "x-readme-ref-name": "TagResponse"
} as const;
export default TagResponse
