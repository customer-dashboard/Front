const UpdateChannel = {
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the channel",
      "examples": [
        "Your channel name"
      ]
    },
    "inbox_id": {
      "type": "string",
      "description": "ID of the inbox to move this channel to. Will also move corresponding conversations."
    },
    "settings": {
      "type": "object",
      "description": "Settings to replace.\nFor custom channels, all settings may be replaced.\nFor all other channels, only `undo_send_time` and `all_teammates_can_reply` may be replaced.\n",
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
        }
      }
    }
  },
  "title": "UpdateChannel",
  "x-readme-ref-name": "UpdateChannel",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "channel_id": {
            "type": "string",
            "default": "cha_123",
            "description": "The Channel ID. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
          }
        },
        "required": [
          "channel_id"
        ]
      }
    ]
  }
} as const;
export default UpdateChannel
