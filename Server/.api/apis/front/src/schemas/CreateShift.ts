import ResourceId from './ResourceId.js';
import ShiftInterval from './ShiftInterval.js';

const CreateShift = {
  "required": [
    "name",
    "color",
    "timezone",
    "times",
    "teammate_ids"
  ],
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
  "title": "CreateShift",
  "x-readme-ref-name": "CreateShift",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreateShift
