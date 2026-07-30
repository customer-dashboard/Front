const CreateLink = {
  "type": "object",
  "description": "A link is used to connect a Front conversation to an external resource.",
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the link. If none is specified, the external_url is used as a default"
    },
    "external_url": {
      "type": "string",
      "description": "Underlying identifying url of the link"
    },
    "pattern": {
      "type": "string",
      "description": "The string that application object configurations will match on to update a specific application object. For example, if you've configured an application object to match on ORDER-{Digits}, and you want to specifically update the application objects for ORDER-777 to retrieve the latest information from external systems, send \"ORDER-777\". Repeat for other specific identifiers, such as \"ORDER-435\".",
      "examples": [
        "ORDER-123"
      ]
    }
  },
  "title": "CreateLink",
  "x-readme-ref-name": "CreateLink",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default CreateLink
