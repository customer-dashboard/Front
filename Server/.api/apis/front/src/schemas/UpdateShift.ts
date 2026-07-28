import ResourceId from './ResourceId.js';
import ShiftInterval from './ShiftInterval.js';

const UpdateShift = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the shift"
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
      "description": "Color of the shift"
    },
    "timezone": {
      "type": "string",
      "description": "A timezone name as defined in the IANA tz database"
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
    "teammate_ids": {
      "type": "array",
      "description": "List of all the teammate ids who will be part of this shift. Alternatively, you can supply emails as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
      "items": ResourceId
    }
  },
  "title": "UpdateShift",
  "x-readme-ref-name": "UpdateShift",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "shift_id": {
            "type": "string",
            "default": "shf_123",
            "description": "The Shift ID"
          }
        },
        "required": [
          "shift_id"
        ]
      }
    ]
  }
} as const;
export default UpdateShift
