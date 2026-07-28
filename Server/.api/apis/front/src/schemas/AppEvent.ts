const AppEvent = {
  "required": [
    "event_type",
    "app_object"
  ],
  "properties": {
    "event_type": {
      "type": "string",
      "description": "The type of event this application should handle"
    },
    "app_object": {
      "type": "object",
      "description": "Identifier for the app object to which the event is related. Either an ID or an external link is required.\nIf both are provided, the ID will be favored.\n",
      "properties": {
        "id": {
          "type": "string",
          "description": "ID of the app object"
        },
        "ext_link": {
          "type": "string",
          "description": "External link of the app object"
        }
      }
    }
  },
  "title": "AppEvent",
  "x-readme-ref-name": "AppEvent",
  "type": "object",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default AppEvent
