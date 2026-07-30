import StatusResponse from './StatusResponse.js';

const ListCompanyTicketStatuses = {
  "response": {
    "200": {
      "type": "object",
      "properties": {
        "_links": {
          "type": "object",
          "properties": {
            "self": {
              "type": "string",
              "description": "Link to resource",
              "examples": [
                "https://yourCompany.api.frontapp.com/company/statuses"
              ]
            }
          }
        },
        "_results": {
          "type": "array",
          "items": StatusResponse
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default ListCompanyTicketStatuses
