const TeammateGroupResponse = {
  "type": "object",
  "description": "A teammate group is a group of teammates in Front.",
  "required": [
    "_links",
    "id",
    "name",
    "description",
    "is_managed_by_scim",
    "permissions"
  ],
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/teammate_groups/cir_123"
          ]
        },
        "related": {
          "type": "object",
          "properties": {
            "teammates": {
              "type": "string",
              "description": "Link to list of teammate members",
              "examples": [
                "https://yourCompany.api.frontapp.com/teammate_groups/cir_123/teammates"
              ]
            },
            "teams": {
              "type": "string",
              "description": "Link to list of associated teams",
              "examples": [
                "https://yourCompany.api.frontapp.com/teammate_groups/cir_123/teams"
              ]
            },
            "inboxes": {
              "type": "string",
              "description": "Link to list of inboxes that teammate members can access",
              "examples": [
                "https://yourCompany.api.frontapp.com/teammate_groups/cir_123/inboxes"
              ]
            }
          }
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the teammate group",
      "examples": [
        "cir_123"
      ]
    },
    "name": {
      "type": "string",
      "description": "The name of the teammate group",
      "examples": [
        "Sales team"
      ]
    },
    "description": {
      "type": [
        "string",
        "null"
      ],
      "description": "Description of the teammate group",
      "examples": [
        "Best sales team ever"
      ]
    },
    "is_managed_by_scim": {
      "type": "boolean",
      "description": "Is teammate group managed by SCIM or by Front",
      "examples": [
        false
      ]
    },
    "permissions": {
      "type": "object",
      "description": "Permissions for the teammate group",
      "properties": {
        "contacts": {
          "type": "object",
          "description": "Permissions for teammate group access to contact lists",
          "properties": {
            "access": {
              "type": "string",
              "description": "Level of access for the teammate group to contact lists. Must be one of 'all', 'contact_lists', or 'none'.",
              "examples": [
                "contact_lists"
              ]
            },
            "contact_list_ids": {
              "type": "array",
              "description": "List of contact lists the teammate group is allowed to access. May only be specified if 'access' is set to 'contact_lists'.",
              "items": {
                "type": "string",
                "examples": [
                  "grp_1"
                ]
              },
              "examples": [
                "grp_123",
                "grp_456"
              ]
            }
          }
        }
      }
    }
  },
  "title": "TeammateGroupResponse",
  "x-readme-ref-name": "TeammateGroupResponse"
} as const;
export default TeammateGroupResponse
