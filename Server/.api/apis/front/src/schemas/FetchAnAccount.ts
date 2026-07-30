const FetchAnAccount = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "account_id": {
            "type": "string",
            "default": "acc_123",
            "description": "The Account ID. Alternatively, you can supply the account domain or external ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
          }
        },
        "required": [
          "account_id"
        ]
      }
    ]
  }
} as const;
export default FetchAnAccount
