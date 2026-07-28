const SignatureResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "name",
    "body",
    "sender_info",
    "is_private",
    "is_visible_for_all_teammate_channels",
    "is_default",
    "channel_ids"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/signatures/sig_6rrv2"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "owner": {
              "type": "string",
              "description": "Link to signature's owner (either a team or teammate)",
              "examples": [
                "https://yourCompany.api.frontapp.com/teams/tim_k30"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the signature",
      "examples": [
        "sig_6rrv2"
      ]
    },
    "name": {
      "type": [
        "string",
        "null"
      ],
      "description": "Name of the signature",
      "examples": [
        "Finer Things Club signature"
      ]
    },
    "body": {
      "type": "string",
      "description": "Body of the signature",
      "examples": [
        "<div>—<br />{{user.name}}<br />No paper, no plastic, and no work talk allowed<br /></div>"
      ]
    },
    "sender_info": {
      "type": [
        "string",
        "null"
      ],
      "description": "Sender info of the signature"
    },
    "is_visible_for_all_teammate_channels": {
      "type": "boolean",
      "description": "Whether or not the signature is available in teammate channels.",
      "examples": [
        true
      ]
    },
    "is_default": {
      "type": "boolean",
      "description": "Whether the signature is the default signature for the team or teammate.",
      "examples": [
        false
      ]
    },
    "is_private": {
      "type": "boolean",
      "description": "Whether the signature is private to the teammate.",
      "examples": [
        true
      ]
    },
    "channel_ids": {
      "type": [
        "array",
        "null"
      ],
      "items": {
        "type": "string",
        "description": "List of channels the signature is available in. If belonging to a teammate, represents all channels this can be used in. If belonging to a team, represents all team channels this can be used in. If null, there are no restrictions."
      }
    }
  },
  "title": "SignatureResponse",
  "x-readme-ref-name": "SignatureResponse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default SignatureResponse
