const Reminder = {
  "type": "object",
  "required": [
    "_links"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "related": {
          "type": "object",
          "properties": {
            "owner": {
              "type": "string",
              "description": "Link to conversation owner",
              "examples": [
                "https://yourCompany.api.frontapp.com/teammates/tea_6r55a"
              ]
            }
          }
        }
      }
    },
    "created_at": {
      "type": "number",
      "description": "Timestamp at which the conversation reminder has been created",
      "examples": [
        1701806790.536
      ]
    },
    "scheduled_at": {
      "type": "number",
      "description": "Timestamp that the conversation reminder has been scheduled for",
      "examples": [
        1701874800
      ]
    },
    "updated_at": {
      "type": "number",
      "description": "Timestamp at which the conversation reminder has been updated",
      "examples": [
        1701806790.536
      ]
    }
  },
  "title": "Reminder",
  "x-readme-ref-name": "Reminder"
} as const;
export default Reminder
