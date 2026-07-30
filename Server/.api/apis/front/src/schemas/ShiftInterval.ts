const ShiftInterval = {
  "type": "object",
  "required": [
    "start",
    "end"
  ],
  "properties": {
    "start": {
      "type": "string",
      "description": "Start of shift",
      "examples": [
        "09:00"
      ]
    },
    "end": {
      "type": "string",
      "description": "End of shift",
      "examples": [
        "17:00"
      ]
    }
  },
  "title": "ShiftInterval",
  "x-readme-ref-name": "ShiftInterval"
} as const;
export default ShiftInterval
