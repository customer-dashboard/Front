const ChannelResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "type",
    "settings",
    "is_private",
    "is_valid"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/channels/cha_1gv4"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "inbox": {
              "type": [
                "string",
                "null"
              ],
              "description": "Link to channel inbox",
              "examples": [
                "https://yourCompany.api.frontapp.com/inboxes/inb_1ix6"
              ]
            },
            "owner": {
              "type": "string",
              "description": "Link to channel owner",
              "examples": [
                "https://yourCompany.api.frontapp.com/teams/jen_k30"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier for the channel",
      "examples": [
        "cha_1gv4"
      ]
    },
    "name": {
      "type": "string",
      "description": "The name of the channel",
      "examples": [
        "Paper Sales Inbox"
      ]
    },
    "address": {
      "type": "string",
      "description": "Address receiving the messages",
      "examples": [
        "sales@dundermifflin.com"
      ]
    },
    "type": {
      "type": "string",
      "description": "Type of the channel\n\n`custom` `facebook` `gmail` `google_play` `imap` `intercom` `form` `office365` `layer_anon` `smtp` `talkdesk` `truly` `twilio` `twilio_whatsapp` `twitter` `twitter_dm` `yalo_wha` `front_chat` `front_mail`",
      "enum": [
        "custom",
        "facebook",
        "gmail",
        "google_play",
        "imap",
        "intercom",
        "form",
        "office365",
        "layer_anon",
        "smtp",
        "talkdesk",
        "truly",
        "twilio",
        "twilio_whatsapp",
        "twitter",
        "twitter_dm",
        "yalo_wha",
        "front_chat",
        "front_mail"
      ],
      "examples": [
        "gmail"
      ]
    },
    "send_as": {
      "type": "string",
      "description": "Address which appears as the sender for messages sent from Front",
      "examples": [
        "sales@dundermifflin.com"
      ]
    },
    "settings": {
      "type": "object",
      "description": "Channel settings",
      "properties": {
        "undo_send_time": {
          "type": "integer",
          "description": "The time (measured in seconds) that users have to undo a send operation in the channel.\n\n`0` `5` `10` `15` `30` `60`",
          "enum": [
            0,
            5,
            10,
            15,
            30,
            60
          ],
          "examples": [
            15
          ]
        },
        "all_teammates_can_reply": {
          "type": "boolean",
          "description": "Whether teammates without inbox access can reply on this channel. Only present for shared channels; omitted for private channels.",
          "examples": [
            false
          ]
        }
      }
    },
    "is_private": {
      "type": "boolean",
      "default": false,
      "description": "Whether or not the channel is individual",
      "examples": [
        false
      ]
    },
    "is_valid": {
      "type": "boolean",
      "default": false,
      "description": "Whether or not the channel configuration is valid",
      "examples": [
        true
      ]
    }
  },
  "title": "ChannelResponse",
  "x-readme-ref-name": "ChannelResponse"
} as const;
export default ChannelResponse
