const CreateChannel = {
  "required": [
    "type"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the channel"
    },
    "settings": {
      "type": "object",
      "description": "Settings of the channel",
      "properties": {
        "undo_send_time": {
          "type": "integer",
          "description": "The time (measured in seconds) that users have to undo a send operation in the channel.",
          "enum": [
            0,
            5,
            10,
            15,
            30,
            60
          ]
        },
        "all_teammates_can_reply": {
          "type": "boolean",
          "description": "Whether teammates without inbox access can reply on this channel. Only allowed for shared channels."
        },
        "webhook_url": {
          "type": "string",
          "description": "The webhook URL outbound messages should be sent to. Only allowed for \"custom\" type channels."
        },
        "sid": {
          "type": "string",
          "description": "The SID of the Twilio channel. Only allowed for \"twilio\" type channels."
        },
        "auth_token": {
          "type": "string",
          "description": "The auth token for the Twilio account. Only allowed for \"twilio\" type channels."
        }
      }
    },
    "type": {
      "type": "string",
      "description": "Type of the channel",
      "enum": [
        "custom",
        "smtp",
        "twilio"
      ]
    },
    "send_as": {
      "type": "string",
      "description": "Sending address of your channel. Required for SMTP and Twilio channels."
    }
  },
  "title": "CreateChannel",
  "x-readme-ref-name": "CreateChannel",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreateChannel
