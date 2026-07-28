import ShiftInterval from './ShiftInterval.js';

const ShiftResponse = {
  "type": "object",
  "required": [
    "_links",
    "id",
    "name",
    "color",
    "timezone",
    "times"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/shifts/shf_1bri"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "teammates": {
              "type": "string",
              "description": "Link to shift teammates",
              "examples": [
                "https://yourCompany.api.frontapp.com/shifts/shf_1bri/teammates"
              ]
            },
            "owner": {
              "type": "string",
              "description": "Link to shift owner",
              "examples": [
                "https://yourCompany.api.frontapp.com/teams/tim_4kxji"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the shift",
      "examples": [
        "shf_1bri"
      ]
    },
    "name": {
      "type": "string",
      "description": "Name of the shift",
      "examples": [
        "Scranton Business Park shifts"
      ]
    },
    "color": {
      "type": "string",
      "enum": [
        "black",
        "grey",
        "pink",
        "purple",
        "blue",
        "teal",
        "green",
        "yellow",
        "orange",
        "red"
      ],
      "description": "Color of the shift\n\n`black` `grey` `pink` `purple` `blue` `teal` `green` `yellow` `orange` `red`",
      "examples": [
        "green"
      ]
    },
    "timezone": {
      "type": "string",
      "description": "A timezone name as defined in the IANA tz database",
      "examples": [
        "America/New_York"
      ]
    },
    "times": {
      "description": "The shift intervals per day of the week",
      "type": "object",
      "properties": {
        "mon": ShiftInterval,
        "tue": ShiftInterval,
        "wed": ShiftInterval,
        "thu": ShiftInterval,
        "fri": ShiftInterval,
        "sat": ShiftInterval,
        "sun": ShiftInterval
      }
    },
    "created_at": {
      "type": "number",
      "description": "The timestamp when the shift was created.",
      "examples": [
        1606943265.298
      ]
    },
    "updated_at": {
      "type": "number",
      "description": "The timestamp when the shift was updated.",
      "examples": [
        1701878404.43
      ]
    }
  },
  "title": "ShiftResponse",
  "x-readme-ref-name": "ShiftResponse"
} as const;
export default ShiftResponse
