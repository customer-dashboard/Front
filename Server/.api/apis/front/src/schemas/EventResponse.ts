import CommentResponse from './CommentResponse.js';
import InboxResponse from './InboxResponse.js';
import LinkResponse from './LinkResponse.js';
import MessageResponse from './MessageResponse.js';
import Reminder from './Reminder.js';
import RuleResponse from './RuleResponse.js';
import TagResponse from './TagResponse.js';
import TeammateResponse from './TeammateResponse.js';

const EventResponse = {
  "type": "object",
  "description": "An event is created every time something interesting is happening in Front.",
  "properties": {
    "_links": {
      "type": "object",
      "properties": {
        "self": {
          "type": "string",
          "description": "Link to resource",
          "examples": [
            "https://yourCompany.api.frontapp.com/events/evt_4ckcra8e"
          ]
        }
      }
    },
    "id": {
      "type": "string",
      "description": "Unique identifier of the event",
      "examples": [
        "evt_4ckcra8e"
      ]
    },
    "type": {
      "type": "string",
      "description": "Type of event\n\n`assign` `unassign` `archive` `reopen` `trash` `restore` `reminder` `comment` `mention` `inbound` `outbound` `out_reply` `move` `forward` `tag` `untag` `sending_error` `message_bounce_error` `conversations_merged` `link_added` `link_removed` `custom_field_updated` `macro_triggered` `topic_identified` `ticket_status_update` `call_started` `call_abandoned` `call_queued` `call_on_hold` `call_resumed` `call_connected` `call_missed` `call_hangup` `call_transferred` `call_transcript_added` `call_voicemail_transcript_added`",
      "enum": [
        "assign",
        "unassign",
        "archive",
        "reopen",
        "trash",
        "restore",
        "reminder",
        "comment",
        "mention",
        "inbound",
        "outbound",
        "out_reply",
        "move",
        "forward",
        "tag",
        "untag",
        "sending_error",
        "message_bounce_error",
        "conversations_merged",
        "link_added",
        "link_removed",
        "custom_field_updated",
        "macro_triggered",
        "topic_identified",
        "ticket_status_update",
        "call_started",
        "call_abandoned",
        "call_queued",
        "call_on_hold",
        "call_resumed",
        "call_connected",
        "call_missed",
        "call_hangup",
        "call_transferred",
        "call_transcript_added",
        "call_voicemail_transcript_added"
      ],
      "examples": [
        "inbound"
      ]
    },
    "emitted_at": {
      "type": "number",
      "description": "The timestamp when the event has been emitted",
      "examples": [
        1703102616
      ]
    },
    "source": {
      "type": "object",
      "description": "Event source",
      "properties": {
        "_meta": {
          "type": "object",
          "description": "Metadata about the resource",
          "properties": {
            "type": {
              "description": "Type of resource",
              "enum": [
                "api",
                "oauth_client",
                "rule",
                "teammate",
                "imap",
                "gmail",
                "reminder",
                "inboxes",
                "recipient"
              ]
            }
          }
        },
        "data": {
          "description": "The resource which triggered the event",
          "oneOf": [
            RuleResponse,
            TeammateResponse,
            {
              "type": "array",
              "items": InboxResponse
            }
          ]
        }
      }
    },
    "target": {
      "type": "object",
      "description": "Partial representation (type & id) of the event's target",
      "properties": {
        "_meta": {
          "type": "object",
          "description": "Metadata about the resource",
          "properties": {
            "type": {
              "description": "Type of resource",
              "enum": [
                "teammate",
                "inboxes",
                "message",
                "comment",
                "tag",
                "deleted_conversation_ids",
                "link",
                "custom_field"
              ]
            }
          }
        },
        "data": {
          "description": "The resource which received the event",
          "oneOf": [
            TeammateResponse,
            InboxResponse,
            TagResponse,
            CommentResponse,
            MessageResponse,
            LinkResponse
          ]
        }
      }
    },
    "conversation": {
      "description": "The conversation on which the event happened",
      "type": "object",
      "required": [
        "_links",
        "id",
        "type",
        "subject",
        "status",
        "ticket_ids",
        "assignee",
        "recipient",
        "tags",
        "links",
        "custom_fields",
        "is_private",
        "scheduled_reminders",
        "metadata"
      ],
      "properties": {
        "_links": {
          "type": "object",
          "properties": {
            "self": {
              "type": "string",
              "description": "Link to resource",
              "examples": [
                "https://yourCompany.api.frontapp.com/conversations/cnv_yo1kg5q"
              ]
            },
            "related": {
              "type": "object",
              "properties": {
                "events": {
                  "type": "string",
                  "description": "Link to conversation events",
                  "examples": [
                    "https://yourCompany.api.frontapp.com/conversations/cnv_yo1kg5q/events"
                  ]
                },
                "followers": {
                  "type": "string",
                  "description": "Link to conversation followers",
                  "examples": [
                    "https://yourCompany.api.frontapp.com/conversations/cnv_yo1kg5q/followers"
                  ]
                },
                "messages": {
                  "type": "string",
                  "description": "Link to conversation messages",
                  "examples": [
                    "https://yourCompany.api.frontapp.com/conversations/cnv_yo1kg5q/messages"
                  ]
                },
                "comments": {
                  "type": "string",
                  "description": "Link to conversation comments",
                  "examples": [
                    "https://yourCompany.api.frontapp.com/conversations/cnv_yo1kg5q/comments"
                  ]
                },
                "inboxes": {
                  "type": "string",
                  "description": "Link to conversation inboxes",
                  "examples": [
                    "https://yourCompany.api.frontapp.com/conversations/cnv_yo1kg5q/inboxes"
                  ]
                },
                "last_message": {
                  "type": "string",
                  "description": "Link to last message of the conversation",
                  "examples": [
                    "https://yourCompany.api.frontapp.com/messages/msg_1q15qmtq?referer=conversation"
                  ]
                }
              }
            }
          }
        },
        "id": {
          "type": "string",
          "description": "Unique identifier of the conversation",
          "examples": [
            "cnv_yo1kg5q"
          ]
        },
        "type": {
          "type": "string",
          "description": "Type of the conversation\n\n`conversation` `discussion` `task`",
          "enum": [
            "conversation",
            "discussion",
            "task"
          ],
          "examples": [
            "discussion"
          ]
        },
        "subject": {
          "type": "string",
          "description": "Subject of the message for email message",
          "examples": [
            "How to prank Dwight Schrute"
          ]
        },
        "status": {
          "type": "string",
          "description": "Status of the conversation\n\n`archived` `unassigned` `deleted` `assigned`",
          "enum": [
            "archived",
            "unassigned",
            "deleted",
            "assigned"
          ],
          "examples": [
            "assigned"
          ]
        },
        "status_id": {
          "type": "string",
          "description": "Unique identifier of the conversation status category, only present if ticketing is enabled",
          "examples": [
            "sts_5x"
          ]
        },
        "status_category": {
          "type": "string",
          "description": "Status category of the conversation\n\n`open` `waiting` `resolved`",
          "enum": [
            "open",
            "waiting",
            "resolved"
          ],
          "examples": [
            "resolved"
          ]
        },
        "ticket_ids": {
          "type": "array",
          "description": "List of ticket ids associated with the conversation",
          "items": {
            "type": "string"
          },
          "examples": [
            "TICKET-1"
          ]
        },
        "assignee": {
          "description": "Partial representation of the teammate assigned to the conversation",
          "type": [
            "object",
            "null"
          ],
          "required": [
            "_links",
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "license_type",
            "is_admin",
            "is_available",
            "is_blocked",
            "type",
            "custom_fields"
          ],
          "properties": {
            "_links": {
              "type": "object",
              "properties": {
                "self": {
                  "type": "string",
                  "description": "Link to resource",
                  "examples": [
                    "https://yourCompany.api.frontapp.com/teammates/tea_6r55a"
                  ]
                },
                "related": {
                  "type": "object",
                  "properties": {
                    "inboxes": {
                      "type": "string",
                      "description": "Link to teammate's inboxes",
                      "examples": [
                        "https://yourCompany.api.frontapp.com/teammates/tea_6r55a/inboxes"
                      ]
                    },
                    "conversations": {
                      "type": "string",
                      "description": "Link to teammate's conversations",
                      "examples": [
                        "https://yourCompany.api.frontapp.com/teammates/tea_6r55a/conversations"
                      ]
                    },
                    "botSource": {
                      "type": "string",
                      "description": "Link to the source resource of the bot (e.g. rule)",
                      "examples": [
                        "https://yourCompany.api.frontapp.com/rules/rul_6r55a"
                      ]
                    }
                  }
                }
              }
            },
            "id": {
              "type": "string",
              "description": "Unique identifier of the teammate",
              "examples": [
                "tea_6r55a"
              ]
            },
            "email": {
              "type": "string",
              "description": "Email address of the teammate",
              "examples": [
                "michael.scott@dundermifflin.com"
              ]
            },
            "username": {
              "type": "string",
              "description": "Username of the teammate (used for \"@\" mentions)",
              "examples": [
                "PrisonMike"
              ]
            },
            "first_name": {
              "type": "string",
              "description": "First name of the teammate",
              "examples": [
                "Michael"
              ]
            },
            "last_name": {
              "type": "string",
              "description": "Last name of the teammate",
              "examples": [
                "Scott"
              ]
            },
            "is_admin": {
              "type": "boolean",
              "description": "Whether or not the teammate is an admin in your company",
              "examples": [
                true
              ]
            },
            "is_available": {
              "type": "boolean",
              "description": "Whether or not the teammate is available",
              "examples": [
                false
              ]
            },
            "is_blocked": {
              "type": "boolean",
              "description": "Whether or not the teammate account has been blocked",
              "examples": [
                false
              ]
            },
            "type": {
              "type": "string",
              "description": "Type of the teammate, normal teammates are denoted as \"user\", while visitors are denoted as \"visitor\".\nBot users are denoted by their parent resource type.\nThe following bot types are available:\n  * ai: acting on behalf of an AI\n  * api: acting on behalf of OAuth clients\n  * application: acting on behalf of an Application\n  * bulk_reply: acting on behalf of a Bulk Reply\n  * csat: used for authoring CSAT response comments\n  * integration: acting on behalf of an Integration\n  * macro: acting on behalf of a Macro, author of comments and drafts\n  * rule: acting on behalf of a Rule, author of comments and drafts\n  * smart_csat: acting on behalf of a Smart CSAT\n\n\n`user` `visitor` `ai` `api` `application` `bulk_reply` `csat` `integration` `macro` `rule` `smart_csat`",
              "enum": [
                "user",
                "visitor",
                "ai",
                "api",
                "application",
                "bulk_reply",
                "csat",
                "integration",
                "macro",
                "rule",
                "smart_csat"
              ]
            },
            "custom_fields": {
              "description": "Custom fields for this teammate",
              "type": "object",
              "additionalProperties": true
            }
          }
        },
        "recipient": {
          "description": "Main recipient of the conversation",
          "type": [
            "object",
            "null"
          ],
          "required": [
            "_links",
            "name",
            "handle",
            "role"
          ],
          "properties": {
            "_links": {
              "type": "object",
              "properties": {
                "related": {
                  "type": "object",
                  "properties": {
                    "contact": {
                      "type": [
                        "string",
                        "null"
                      ],
                      "description": "Link to recipient contact",
                      "examples": [
                        "https://yourCompany.api.frontapp.com/contacts/crd_2njtoem"
                      ]
                    }
                  }
                }
              }
            },
            "name": {
              "type": [
                "string",
                "null"
              ],
              "description": "Name of the recipient.",
              "examples": [
                "Phyllis Lapin-Vance"
              ]
            },
            "handle": {
              "type": "string",
              "description": "Handle of the contact. Can be any string used to uniquely identify the contact",
              "examples": [
                "purpleboss@limitlesspaper.com"
              ]
            },
            "role": {
              "type": "string",
              "description": "Role of the recipient\n\n`from` `to` `cc` `bcc` `reply-to`",
              "enum": [
                "from",
                "to",
                "cc",
                "bcc",
                "reply-to"
              ],
              "examples": [
                "cc"
              ]
            }
          }
        },
        "tags": {
          "type": "array",
          "description": "List of the tags for this conversation",
          "items": TagResponse
        },
        "links": {
          "type": "array",
          "description": "List of the links for this conversation",
          "items": LinkResponse
        },
        "custom_fields": {
          "description": "Custom fields for this conversation",
          "type": "object",
          "additionalProperties": true
        },
        "created_at": {
          "type": "number",
          "description": "Timestamp at which the conversation was created.",
          "examples": [
            1701292649.333
          ]
        },
        "updated_at": {
          "type": "number",
          "description": "Timestamp at which the conversation was last updated.",
          "examples": [
            1701292649.333
          ]
        },
        "waiting_since": {
          "type": "number",
          "description": "Timestamp of the oldest unreplied message.",
          "examples": [
            1701292649.333
          ]
        },
        "is_private": {
          "type": "boolean",
          "description": "Whether or not the conversation is private",
          "examples": [
            true
          ]
        },
        "scheduled_reminders": {
          "type": "array",
          "description": "List of scheduled (non-expired and non-canceled) reminders for this conversation",
          "items": Reminder
        },
        "description": {
          "type": [
            "string",
            "null"
          ],
          "description": "Description of the task. Only present on task conversations."
        },
        "due_at": {
          "type": [
            "number",
            "null"
          ],
          "description": "Unix timestamp in seconds when the task is due. Only present on task conversations.",
          "examples": [
            1701292649.333
          ]
        },
        "metadata": {
          "type": "object",
          "description": "Optional metadata about the conversation",
          "properties": {
            "external_conversation_ids": {
              "type": "array",
              "description": "List of external_ids for partner channel associated with the conversation. Only present for partner channel token authenticated requests.",
              "items": {
                "type": "string"
              },
              "examples": [
                "JS3949",
                "JS9403"
              ]
            }
          }
        }
      }
    }
  },
  "title": "EventResponse",
  "x-readme-ref-name": "EventResponse"
} as const;
export default EventResponse
