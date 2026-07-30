import type * as types from './types.js';
import type { ConfigOptions, FetchResponse } from '@readme/api-core/types';
import APICore from '@readme/api-core';
import definition from '../openapi.json' with {
  type: 'json'
};

export default class SDK {
  core: APICore;

  constructor() {
    this.core = new APICore(definition, 'front/1.0.0 (api/7.0.0)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * List the accounts of the company.
   *
   * Required scope: `accounts:read`
   *
   * @summary List Accounts
   */
  listAccounts(metadata?: types.ListAccountsMetadataParam): Promise<FetchResponse<200, types.ListAccountsResponse200>> {
    return this.core.fetch('/accounts', 'get', metadata);
  }

  /**
   * Create a new account.
   *
   * Required scope: `accounts:write`
   *
   * @summary Create account
   */
  createAccount(body: types.CreateAccountBodyParam): Promise<FetchResponse<201, types.AccountResponse>> {
    return this.core.fetch('/accounts', 'post', body);
  }

  /**
   * Lists the custom fields that can be attached to an Account.
   *
   * Required scope: `custom_fields:read`
   *
   * @summary List Account's custom fields
   */
  listAccountCustomFields(): Promise<FetchResponse<200, types.ListAccountCustomFieldsResponse200>> {
    return this.core.fetch('/accounts/custom_fields', 'get');
  }

  /**
   * Fetches an account
   *
   * Required scope: `accounts:read`
   *
   * @summary Fetch an account
   */
  fetchAnAccount(metadata: types.FetchAnAccountMetadataParam): Promise<FetchResponse<200, types.AccountResponse>> {
    return this.core.fetch('/accounts/{account_id}', 'get', metadata);
  }

  /**
   * Updates an account.
   *
   * Required scope: `accounts:write`
   *
   * @summary Update account
   */
  updateAccount(body: types.AccountPatch, metadata: types.UpdateAccountMetadataParam): Promise<FetchResponse<200, types.AccountResponse>>;
  updateAccount(metadata: types.UpdateAccountMetadataParam): Promise<FetchResponse<200, types.AccountResponse>>;
  updateAccount(body?: types.AccountPatch | types.UpdateAccountMetadataParam, metadata?: types.UpdateAccountMetadataParam): Promise<FetchResponse<200, types.AccountResponse>> {
    return this.core.fetch('/accounts/{account_id}', 'patch', body, metadata);
  }

  /**
   * Deletes an account
   *
   * Required scope: `accounts:delete`
   *
   * @summary Delete an account
   */
  deleteAnAccount(metadata: types.DeleteAnAccountMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/accounts/{account_id}', 'delete', metadata);
  }

  /**
   * Lists the contacts associated with an Account
   *
   * Required scope: `contacts:read`
   *
   * @summary List account contacts
   */
  listAccountContacts(metadata: types.ListAccountContactsMetadataParam): Promise<FetchResponse<200, types.ListAccountContactsResponse200>> {
    return this.core.fetch('/accounts/{account_id}/contacts', 'get', metadata);
  }

  /**
   * Adds a list of contacts to an Account
   *
   * Required scope: `accounts:write`
   *
   * @summary Add contact to Account
   */
  addContactToAccount(body: types.ContactIds, metadata: types.AddContactToAccountMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/accounts/{account_id}/contacts', 'post', body, metadata);
  }

  /**
   * Removes a list of contacts from an Account
   *
   * Required scope: `accounts:write`
   *
   * @summary Remove contact from Account
   */
  removeContactFromAccount(body: types.ContactIds, metadata: types.RemoveContactFromAccountMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/accounts/{account_id}/contacts', 'delete', body, metadata);
  }

  /**
   * Create a new analytics export of messages or events (activities) over a specific time
   * span.
   * The export will be executed asynchronously. The response will include a link that can be
   * used to retrieve the export status & result. Refer to the
   * [Analytics](https://dev.frontapp.com/reference/analytics) topic for details about
   * specific metrics.
   *
   *
   * Required scope: `analytics:read`
   *
   * @summary Create a new analytics export
   */
  createAnalyticsExport(body: types.AnalyticsExportRequest): Promise<FetchResponse<201, types.AnalyticsExportResponse>> {
    return this.core.fetch('/analytics/exports', 'post', body);
  }

  /**
   * Fetch an analytics exports. Refer to the
   * [Analytics](https://dev.frontapp.com/reference/analytics) topic for details about
   * specific metrics.
   *
   * Required scope: `analytics:read`
   *
   * @summary Fetch an analytics export
   */
  getAnalyticsExport(metadata: types.GetAnalyticsExportMetadataParam): Promise<FetchResponse<200, types.AnalyticsExportResponse>> {
    return this.core.fetch('/analytics/exports/{export_id}', 'get', metadata);
  }

  /**
   * Create a new analytics report for a set of metrics over a specific time span. Different
   * filters (e.g. Inbox v Tag v Teammates) will be joined with AND logic, but the IDs within
   * a filter will be joined with OR logic (e.g. Inbox A or Inbox B, Tag A or Tag B).
   * The report will be executed asynchronously. The response will include a link that can be
   * used to retrieve the
   * report status & result. Refer to the
   * [Analytics](https://dev.frontapp.com/reference/analytics) topic for details about
   * specific metrics.
   *
   *
   * Required scope: `analytics:read`
   *
   * @summary Create a new analytics report
   */
  createAnalyticsReport(body: types.AnalyticsReportRequest): Promise<FetchResponse<201, types.AnalyticsReportResponse>> {
    return this.core.fetch('/analytics/reports', 'post', body);
  }

  /**
   * Fetch an analytics report. Refer to the
   * [Analytics](https://dev.frontapp.com/reference/analytics) topic for details about
   * specific metrics.
   *
   * Required scope: `analytics:read`
   *
   * @summary Fetch an analytics report
   */
  getAnalyticsReport(metadata: types.GetAnalyticsReportMetadataParam): Promise<FetchResponse<200, types.AnalyticsReportResponse>> {
    return this.core.fetch('/analytics/reports/{report_uid}', 'get', metadata);
  }

  /**
   * Triggers an event on behalf of an application. These events can trigger Front workflows,
   * like rules.
   * For more information, see the [developer
   * docs](https://dev.frontapp.com/docs/application-triggers#/).
   *
   *
   * Required scope: `feature:app_trigger`
   *
   * @summary Trigger application event
   */
  triggerAppEvent(body: types.AppEvent, metadata: types.TriggerAppEventMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/applications/{application_uid}/events', 'post', body, metadata);
  }

  /**
   * List the channels of the company.
   *
   * Required scope: `channels:read`
   *
   * @summary List channels
   */
  listChannels(): Promise<FetchResponse<200, types.ListChannelsResponse200>> {
    return this.core.fetch('/channels', 'get');
  }

  /**
   * Fetch a channel.
   *
   * Required scope: `channels:read`
   *
   * @summary Get channel
   */
  getChannel(metadata: types.GetChannelMetadataParam): Promise<FetchResponse<200, types.ChannelResponse>> {
    return this.core.fetch('/channels/{channel_id}', 'get', metadata);
  }

  /**
   * Update a channel.
   *
   * Required scope: `channels:write`
   *
   * @summary Update Channel
   */
  updateChannel(body: types.UpdateChannel, metadata: types.UpdateChannelMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateChannel(metadata: types.UpdateChannelMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateChannel(body?: types.UpdateChannel | types.UpdateChannelMetadataParam, metadata?: types.UpdateChannelMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/channels/{channel_id}', 'patch', body, metadata);
  }

  /**
   * Create a draft message which is the first message of a new
   * [conversation](https://dev.frontapp.com/reference/conversations).
   *
   * Required scope: `drafts:write`
   *
   * @summary Create draft
   */
  createDraft(body: types.CreateDraft, metadata: types.CreateDraftMetadataParam): Promise<FetchResponse<200, types.MessageResponse>> {
    return this.core.fetch('/channels/{channel_id}/drafts', 'post', body, metadata);
  }

  /**
   * Receive a custom message in Front. This endpoint is available for custom channels
   * **ONLY**.
   *
   * Required scope: `messages:write`
   *
   * @summary Receive custom messages
   */
  receiveCustomMessages(body: types.CustomMessage, metadata: types.ReceiveCustomMessagesMetadataParam): Promise<FetchResponse<202, types.ReceiveCustomMessagesResponse202>> {
    return this.core.fetch('/channels/{channel_id}/incoming_messages', 'post', body, metadata);
  }

  /**
   * Send a new message from a channel. This is one of the ways to create a new
   * [conversation](https://dev.frontapp.com/reference/conversations#creating-a-new-conversation).
   * The new conversation will support both messages and comments (discussions).
   *
   * Required scope: `messages:send`
   *
   * @summary Create message
   */
  createMessage(body: types.OutboundMessage, metadata: types.CreateMessageMetadataParam): Promise<FetchResponse<202, types.CreateMessageResponse202>> {
    return this.core.fetch('/channels/{channel_id}/messages', 'post', body, metadata);
  }

  /**
   * Asynchronously validate an SMTP channel (this endpoint is irrelevant to other channel
   * types). When you create an SMTP channel via the API, [create a
   * channel](https://dev.frontapp.com/reference/post_inboxes-inbox-id-channels) with type
   * smtp and the send_as set to the needed email address. You then [configure the email
   * provider](https://help.front.com/en/articles/2081), after which you use this endpoint to
   * asynchronously validate the SMTP settings.
   *
   * Required scope: `channels:write`
   *
   * @summary Validate channel
   */
  validateChannel(metadata: types.ValidateChannelMetadataParam): Promise<FetchResponse<202, types.ValidateChannelResponse202>> {
    return this.core.fetch('/channels/{channel_id}/validate', 'post', metadata);
  }

  /**
   * Fetches a comment.
   *
   * Required scope: `comments:read`
   *
   * @summary Get comment
   */
  getComment(metadata: types.GetCommentMetadataParam): Promise<FetchResponse<200, types.CommentResponse>> {
    return this.core.fetch('/comments/{comment_id}', 'get', metadata);
  }

  /**
   * Update a comment in a [conversation](https://dev.frontapp.com/reference/conversations).
   *
   * Required scope: `comments:write`
   *
   * @summary Update comment
   */
  updateComment(body: types.UpdateComment, metadata: types.UpdateCommentMetadataParam): Promise<FetchResponse<200, types.CommentResponse>>;
  updateComment(metadata: types.UpdateCommentMetadataParam): Promise<FetchResponse<200, types.CommentResponse>>;
  updateComment(body?: types.UpdateComment | types.UpdateCommentMetadataParam, metadata?: types.UpdateCommentMetadataParam): Promise<FetchResponse<200, types.CommentResponse>> {
    return this.core.fetch('/comments/{comment_id}/', 'patch', body, metadata);
  }

  /**
   * Download an attachment file for a given comment ID
   *
   * Required scope: `attachments:read`
   *
   * @summary Download attachment for a comment
   */
  downloadAttachmentForAComment(metadata: types.DownloadAttachmentForACommentMetadataParam): Promise<FetchResponse<200, types.DownloadAttachmentForACommentResponse200>> {
    return this.core.fetch('/comments/{comment_id}/download/{attachment_link_id}', 'get', metadata);
  }

  /**
   * List the teammates mentioned in a comment.
   *
   * Required scope: `teammates:read`
   *
   * @summary List comment mentions
   */
  listCommentMentions(metadata: types.ListCommentMentionsMetadataParam): Promise<FetchResponse<200, types.ListCommentMentionsResponse200>> {
    return this.core.fetch('/comments/{comment_id}/mentions', 'get', metadata);
  }

  /**
   * Add a reply to a comment on a
   * [conversation](https://dev.frontapp.com/reference/conversations). Comment replies
   * visually indicate which comment is being responded to, helping users follow the
   * conversation.
   *
   * Required scope: `comments:write`
   *
   * @summary Add comment reply
   */
  addCommentReply(body: types.CreateComment, metadata: types.AddCommentReplyMetadataParam): Promise<FetchResponse<201, types.CommentResponse>> {
    return this.core.fetch('/comments/{comment_id}/replies', 'post', body, metadata);
  }

  /**
   * List the company rules.
   *
   * Required scope: `rules:read`
   *
   * @summary List all company rules
   */
  listAllCompanyRules(): Promise<FetchResponse<200, types.ListAllCompanyRulesResponse200>> {
    return this.core.fetch('/company/rules', 'get');
  }

  /**
   * List the ticket statuses available for your company.
   *
   * Required scope: `statuses:read`
   *
   * @summary List company ticket statuses
   */
  listCompanyTicketStatuses(): Promise<FetchResponse<200, types.ListCompanyTicketStatusesResponse200>> {
    return this.core.fetch('/company/statuses', 'get');
  }

  /**
   * Fetch a ticket status.
   *
   * Required scope: `statuses:read`
   *
   * @summary Get ticket status
   */
  getTicketStatusById(metadata: types.GetTicketStatusByIdMetadataParam): Promise<FetchResponse<200, types.StatusResponse>> {
    return this.core.fetch('/company/statuses/{status_id}', 'get', metadata);
  }

  /**
   * List the company tags.
   *
   * Required scope: `tags:read`
   *
   * @summary List company tags
   */
  listCompanyTags(metadata?: types.ListCompanyTagsMetadataParam): Promise<FetchResponse<200, types.ListCompanyTagsResponse200>> {
    return this.core.fetch('/company/tags', 'get', metadata);
  }

  /**
   * Create a company tag.
   *
   * Required scope: `tags:write`
   *
   * @summary Create company tag
   */
  createCompanyTag(body: types.CreateTag): Promise<FetchResponse<201, types.TagResponse>> {
    return this.core.fetch('/company/tags', 'post', body);
  }

  /**
   * List the contact groups.
   *
   * > ⚠️ Deprecated endpoint
   * >
   * > This endpoint has been deprecated. Please use the compatible contact list endpoints
   * instead.
   * > - `GET /contact_lists`.
   *
   *
   * Required scope: `contacts:read`
   *
   * @summary List groups
   */
  listGroups(): Promise<FetchResponse<200, types.ListGroupsResponse200>> {
    return this.core.fetch('/contact_groups', 'get');
  }

  /**
   * Create a new contact group in the default team (workspace).
   *
   * > ⚠️ Deprecated endpoint
   * >
   * > This endpoint has been deprecated. Please use the compatible contact list endpoints
   * instead.
   * > - `POST /contact_lists`.
   *
   *
   * Required scope: `contacts:write`
   *
   * @summary Create group
   */
  createGroup(body: types.CreateContactList): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/contact_groups', 'post', body);
  }

  /**
   * Delete a contact group.
   *
   * > ⚠️ Deprecated endpoint
   * >
   * > This endpoint has been deprecated. Please use the compatible contact list endpoints
   * instead.
   * > - `DELETE /contact_lists/{contact_list_id}`.
   *
   *
   * Required scope: `contacts:delete`
   *
   * @summary Delete group
   */
  deleteGroup(metadata: types.DeleteGroupMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/contact_groups/{contact_group_id}', 'delete', metadata);
  }

  /**
   * List the contacts belonging to the requested group.
   *
   * > ⚠️ Deprecated endpoint
   * >
   * > This endpoint has been deprecated. Please use the compatible contact list endpoints
   * instead.
   * > - `GET /contact_lists/{contact_list_id}/contacts`.
   *
   *
   * Required scope: `contacts:read`
   *
   * @summary List contacts in group
   */
  listContactsInGroup(metadata: types.ListContactsInGroupMetadataParam): Promise<FetchResponse<200, types.ListContactsInGroupResponse200>> {
    return this.core.fetch('/contact_groups/{contact_group_id}/contacts', 'get', metadata);
  }

  /**
   * Add contacts to the requested group.
   *
   * > ⚠️ Deprecated endpoint
   * >
   * > This endpoint has been deprecated. Please use the compatible contact list endpoints
   * instead.
   * > - `POST /contact_lists/{contact_list_id}/contacts`.
   *
   *
   * Required scope: `contacts:write`
   *
   * @summary Add contacts to group
   */
  addContactsToGroup(body: types.AddContactsToList, metadata: types.AddContactsToGroupMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/contact_groups/{contact_group_id}/contacts', 'post', body, metadata);
  }

  /**
   * Remove contacts from the requested group.
   *
   * > ⚠️ Deprecated endpoint
   * >
   * > This endpoint has been deprecated. Please use the compatible contact list endpoints
   * instead.
   * > - `DELETE /contact_lists/{contact_list_id}/contacts`.
   *
   *
   * Required scope: `contacts:write`
   *
   * @summary Remove contacts from group
   */
  removeContactsFromGroup(body: types.RemoveContactsFromList, metadata: types.RemoveContactsFromGroupMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/contact_groups/{contact_group_id}/contacts', 'delete', body, metadata);
  }

  /**
   * List contact lists.
   *
   * Required scope: `contacts:read`
   *
   * @summary List contact lists
   */
  listContactLists(): Promise<FetchResponse<200, types.ListContactListsResponse200>> {
    return this.core.fetch('/contact_lists', 'get');
  }

  /**
   * Create a new contact list in the oldest active workspace that the token has access to.
   * If you need to specify the workspace, we recommend using the [Create team contact
   * list](https://dev.frontapp.com/reference/create-team-contact-list) endpoint instead.
   *
   * Required scope: `contacts:write`
   *
   * @summary Create contact list
   */
  createContactList(body: types.CreateContactList): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/contact_lists', 'post', body);
  }

  /**
   * Delete a contact lists.
   *
   * Required scope: `contacts:delete`
   *
   * @summary Delete contact list
   */
  deleteContactList(metadata: types.DeleteContactListMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/contact_lists/{contact_list_id}', 'delete', metadata);
  }

  /**
   * List the contacts belonging to the requested contact list.
   *
   * Required scope: `contacts:read`
   *
   * @summary List contacts in contact list
   */
  listContactsInContactList(metadata: types.ListContactsInContactListMetadataParam): Promise<FetchResponse<200, types.ListContactsInContactListResponse200>> {
    return this.core.fetch('/contact_lists/{contact_list_id}/contacts', 'get', metadata);
  }

  /**
   * Add contacts to the requested contact list.
   *
   * Required scope: `contacts:write`
   *
   * @summary Add contacts to contact list
   */
  addContactsToContactList(body: types.AddContactsToList, metadata: types.AddContactsToContactListMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/contact_lists/{contact_list_id}/contacts', 'post', body, metadata);
  }

  /**
   * Remove contacts from the requested contact list.
   *
   * Required scope: `contacts:write`
   *
   * @summary Remove contacts from contact list
   */
  removeContactsFromContactList(body: types.RemoveContactsFromList, metadata: types.RemoveContactsFromContactListMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/contact_lists/{contact_list_id}/contacts', 'delete', body, metadata);
  }

  /**
   * List the contacts of the company.
   *
   * Required scope: `contacts:read`
   *
   * @summary List contacts
   */
  listContacts(metadata?: types.ListContactsMetadataParam): Promise<FetchResponse<200, types.ListContactsResponse200>> {
    return this.core.fetch('/contacts', 'get', metadata);
  }

  /**
   * Create a new contact at the company level.
   *
   * Required scope: `contacts:write`
   *
   * @summary Create contact
   */
  createContact(body: types.CreateContact): Promise<FetchResponse<201, types.ContactResponse>> {
    return this.core.fetch('/contacts', 'post', body);
  }

  /**
   * Lists the custom fields that can be attached to a Contact.
   *
   * Required scope: `custom_fields:read`
   *
   * @summary List Contact's custom fields
   */
  listContactCustomFields(): Promise<FetchResponse<200, types.ListContactCustomFieldsResponse200>> {
    return this.core.fetch('/contacts/custom_fields', 'get');
  }

  /**
   * Merges the contacts specified into a single contact, deleting the merged-in contacts.
   * If a target contact ID is supplied, the other contacts will be merged into that one.
   * Otherwise, some contact in the contact ID list will be treated as the target contact.
   * Merge conflicts will be resolved in the following ways:
   *   * name will prioritize manually-updated and non-private contact names
   *   * descriptions will be concatenated and separated by newlines in order from
   *     oldest to newest with the (optional) target contact's description first
   *   * all handles, groups, links, and notes will be preserved
   *   * other conflicts will use the most recently updated contact's value
   *
   *
   * Required scope: `contacts:write`
   *
   * @summary Merge contacts
   */
  mergeContacts(body: types.MergeContacts): Promise<FetchResponse<200, types.ContactResponse>> {
    return this.core.fetch('/contacts/merge', 'post', body);
  }

  /**
   * Fetch a contact.
   *
   * Required scope: `contacts:read`
   *
   * @summary Get contact
   */
  getContact(metadata: types.GetContactMetadataParam): Promise<FetchResponse<200, types.ContactResponse>> {
    return this.core.fetch('/contacts/{contact_id}', 'get', metadata);
  }

  /**
   * Updates a contact.
   *
   * Required scope: `contacts:write`
   *
   * @summary Update a contact
   */
  updateAContact(body: types.Contact, metadata: types.UpdateAContactMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateAContact(metadata: types.UpdateAContactMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateAContact(body?: types.Contact | types.UpdateAContactMetadataParam, metadata?: types.UpdateAContactMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/contacts/{contact_id}', 'patch', body, metadata);
  }

  /**
   * Delete a contact.
   *
   * Required scope: `contacts:delete`
   *
   * @summary Delete a contact
   */
  deleteAContact(metadata: types.DeleteAContactMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/contacts/{contact_id}', 'delete', metadata);
  }

  /**
   * List the conversations for a contact in reverse chronological order (newest first). For
   * more advanced filtering, see the [search
   * endpoint](https://dev.frontapp.com/reference/conversations#search-conversations).
   *
   *
   * Required scope: `conversations:read`
   *
   * @summary List contact conversations
   */
  listContactConversations(metadata: types.ListContactConversationsMetadataParam): Promise<FetchResponse<200, types.ListContactConversationsResponse200>> {
    return this.core.fetch('/contacts/{contact_id}/conversations', 'get', metadata);
  }

  /**
   * Adds a new handle to a contact.
   *
   * Required scope: `contacts:write`
   *
   * @summary Add contact handle
   */
  addContactHandle(body: types.ContactHandle, metadata: types.AddContactHandleMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/contacts/{contact_id}/handles', 'post', body, metadata);
  }

  /**
   * Remove a handle from a contact.
   *
   * Required scope: `contacts:write`
   *
   * @summary Delete contact handle
   */
  deleteContactHandle(body: types.DeleteContactHandle, metadata: types.DeleteContactHandleMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/contacts/{contact_id}/handles', 'delete', body, metadata);
  }

  /**
   * List the notes added to a contact.
   *
   * Required scope: `contacts:read`
   *
   * @summary List notes
   */
  listNotes(metadata: types.ListNotesMetadataParam): Promise<FetchResponse<202, types.ListNotesResponse202>> {
    return this.core.fetch('/contacts/{contact_id}/notes', 'get', metadata);
  }

  /**
   * Create a new note on a contact.
   *
   * Required scope: `contacts:write`
   *
   * @summary Add note
   */
  addNote(body: types.CreateContactNote, metadata: types.AddNoteMetadataParam): Promise<FetchResponse<201, types.ContactNoteResponses>> {
    return this.core.fetch('/contacts/{contact_id}/notes', 'post', body, metadata);
  }

  /**
   * List the conversations in the company in reverse chronological order (most recently
   * updated first). The order will respect your company's [bump
   * settings](https://help.front.com/t/y729th/customize-when-conversations-bump-up), which
   * determine when conversations bump to the top. For more advanced filtering, see the
   * [search
   * endpoint](https://dev.frontapp.com/reference/conversations#search-conversations).
   *
   *
   * Required scope: `conversations:read`
   *
   * @summary List conversations
   */
  listConversations(metadata?: types.ListConversationsMetadataParam): Promise<FetchResponse<200, types.ListConversationsResponse200>> {
    return this.core.fetch('/conversations', 'get', metadata);
  }

  /**
   * Create a new
   * [conversation](https://dev.frontapp.com/reference/conversations#creating-a-new-conversation)
   * of type discussion or task. Both types only support comments. If you want to create a
   * conversation that supports messages, use the [Create
   * message](https://dev.frontapp.com/reference/post_channels-channel-id-messages) endpoint.
   * If you want to add a comment to an existing conversation, use the [Add
   * comment](https://dev.frontapp.com/reference/post_conversations-conversation-id-comments)
   * endpoint.
   *
   * Required scope: `conversations:write`
   *
   * @summary Create discussion/task conversation
   */
  createConversation(body: types.CreateConversation): Promise<FetchResponse<201, types.ConversationResponse>> {
    return this.core.fetch('/conversations', 'post', body);
  }

  /**
   * Lists the custom fields that can be attached to a Conversation.
   *
   * Required scope: `custom_fields:read`
   *
   * @summary List Conversation's custom fields
   */
  listConversationCustomFields(): Promise<FetchResponse<200, types.ListConversationCustomFieldsResponse200>> {
    return this.core.fetch('/conversations/custom_fields', 'get');
  }

  /**
   * Search for conversations. Response will include a count of total matches and an array of
   * conversations in descending order by last activity.
   * See the [search syntax documentation](https://dev.frontapp.com/docs/search-1) for usage
   * examples.
   * **Note:** This endpoint is subject to [proportional rate
   * limiting](https://dev.frontapp.com/docs/rate-limiting#additional-proportional-limiting)
   * at 40% of your company's rate limit.
   *
   *
   * Required scope: `conversations:read`
   *
   * @summary Search conversations
   */
  searchConversations(metadata: types.SearchConversationsMetadataParam): Promise<FetchResponse<200, types.SearchConversationsResponse200>> {
    return this.core.fetch('/conversations/search/{query}', 'get', metadata);
  }

  /**
   * Fetch a conversation.
   *
   *
   * Required scope: `conversations:read`
   *
   * @summary Get conversation
   */
  getConversationById(metadata: types.GetConversationByIdMetadataParam): Promise<FetchResponse<200, types.ConversationResponse>> {
    return this.core.fetch('/conversations/{conversation_id}', 'get', metadata);
  }

  /**
   * Update a conversation.
   *
   * Required scope: `conversations:write`
   *
   * @summary Update conversation
   */
  updateConversation(body: types.UpdateConversation, metadata: types.UpdateConversationMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateConversation(metadata: types.UpdateConversationMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateConversation(body?: types.UpdateConversation | types.UpdateConversationMetadataParam, metadata?: types.UpdateConversationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/conversations/{conversation_id}', 'patch', body, metadata);
  }

  /**
   * Permanently delete a conversation. The conversation must have status "trashed"
   * (in the trash) before it can be permanently deleted. This action cannot be undone.
   *
   *
   * Required scope: `conversations:delete`
   *
   * @summary Delete conversation
   */
  deleteConversation(metadata: types.DeleteConversationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/conversations/{conversation_id}', 'delete', metadata);
  }

  /**
   * Assign or unassign a conversation.
   *
   * Required scope: `conversations:write`
   *
   * @summary Update conversation assignee
   */
  updateConversationAssignee(body: types.UpdateConversationAssignee, metadata: types.UpdateConversationAssigneeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/conversations/{conversation_id}/assignee', 'put', body, metadata);
  }

  /**
   * List the comments in a conversation in reverse chronological order (newest first).
   *
   * Required scope: `comments:read`
   *
   * @summary List conversation comments
   */
  listConversationComments(metadata: types.ListConversationCommentsMetadataParam): Promise<FetchResponse<200, types.ListConversationCommentsResponse200>> {
    return this.core.fetch('/conversations/{conversation_id}/comments', 'get', metadata);
  }

  /**
   * Add a comment to a [conversation](https://dev.frontapp.com/reference/conversations). If
   * you want to create a new comment-only conversation, use the [Create discussion
   * conversation](https://dev.frontapp.com/reference/create-conversation) endpoint.
   *
   * Required scope: `comments:write`
   *
   * @summary Add comment
   */
  addComment(body: types.CreateComment, metadata: types.AddCommentMetadataParam): Promise<FetchResponse<201, types.CommentResponse>> {
    return this.core.fetch('/conversations/{conversation_id}/comments', 'post', body, metadata);
  }

  /**
   * List the drafts in a conversation.
   *
   * Required scope: `drafts:read`
   *
   * @summary List conversation drafts
   */
  listConversationDrafts(metadata: types.ListConversationDraftsMetadataParam): Promise<FetchResponse<200, types.ListConversationDraftsResponse200>> {
    return this.core.fetch('/conversations/{conversation_id}/drafts', 'get', metadata);
  }

  /**
   * Create a new draft as a reply to the last message in the conversation.
   *
   * Required scope: `drafts:write`
   *
   * @summary Create draft reply
   */
  createDraftReply(body: types.ReplyDraft, metadata: types.CreateDraftReplyMetadataParam): Promise<FetchResponse<200, types.MessageResponse>> {
    return this.core.fetch('/conversations/{conversation_id}/drafts', 'post', body, metadata);
  }

  /**
   * List the events that occured for a conversation in reverse chronological order (newest
   * first). The order will respect your company's [bump
   * settings](https://help.front.com/t/y729th/customize-when-conversations-bump-up), which
   * determine when conversations bump to the top.
   *
   * Required scope: `events:*:read`
   *
   * @summary List conversation events
   */
  listConversationEvents(metadata: types.ListConversationEventsMetadataParam): Promise<FetchResponse<200, types.ListConversationEventsResponse200>> {
    return this.core.fetch('/conversations/{conversation_id}/events', 'get', metadata);
  }

  /**
   * List the teammates following a conversation.
   *
   * Required scope: `teammates:read`
   *
   * @summary List conversation followers
   */
  listConversationFollowers(metadata: types.ListConversationFollowersMetadataParam): Promise<FetchResponse<200, types.ListConversationFollowersResponse200>> {
    return this.core.fetch('/conversations/{conversation_id}/followers', 'get', metadata);
  }

  /**
   * Adds teammates to the list of followers of a conversation.
   *
   * Required scope: `conversations:write`
   *
   * @summary Add conversation followers
   */
  addConversationFollowers(body: types.AddConversationFollowersBodyParam, metadata: types.AddConversationFollowersMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/conversations/{conversation_id}/followers', 'post', body, metadata);
  }

  /**
   * Removes teammates from the list of followers of a conversation.
   *
   * Required scope: `conversations:write`
   *
   * @summary Delete conversation followers
   */
  deleteConversationFollowers(body: types.DeleteConversationFollowersBodyParam, metadata: types.DeleteConversationFollowersMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/conversations/{conversation_id}/followers', 'delete', body, metadata);
  }

  /**
   * List the inboxes in which a conversation is listed.
   *
   * Required scope: `inboxes:read`
   *
   * @summary List conversation inboxes
   */
  listConversationInboxes(metadata: types.ListConversationInboxesMetadataParam): Promise<FetchResponse<200, types.ListConversationInboxesResponse200>> {
    return this.core.fetch('/conversations/{conversation_id}/inboxes', 'get', metadata);
  }

  /**
   * Adds one or more links to a conversation
   * For more information on links, see the [Links](https://dev.frontapp.com/reference/links)
   * topic.
   *
   *
   * Required scope: `conversations:write`
   *
   * @summary Add conversation link
   */
  addConversationLink(body: types.AddConversationLinkBodyParam, metadata: types.AddConversationLinkMetadataParam): Promise<FetchResponse<number, unknown>>;
  addConversationLink(metadata: types.AddConversationLinkMetadataParam): Promise<FetchResponse<number, unknown>>;
  addConversationLink(body?: types.AddConversationLinkBodyParam | types.AddConversationLinkMetadataParam, metadata?: types.AddConversationLinkMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/conversations/{conversation_id}/links', 'post', body, metadata);
  }

  /**
   * Removes one or more links to a conversation.
   * For more information on links, see the [Links](https://dev.frontapp.com/reference/links)
   * topic.
   *
   *
   * Required scope: `conversations:write`
   *
   * @summary Remove conversation links
   */
  removeConversationLinks(body: types.RemoveConversationLinksBodyParam, metadata: types.RemoveConversationLinksMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/conversations/{conversation_id}/links', 'delete', body, metadata);
  }

  /**
   * List the messages in a conversation in reverse chronological order (newest first).
   *
   * Required scope: `messages:read`
   *
   * @summary List conversation messages
   */
  listConversationMessages(metadata: types.ListConversationMessagesMetadataParam): Promise<FetchResponse<200, types.ListConversationMessagesResponse200>> {
    return this.core.fetch('/conversations/{conversation_id}/messages', 'get', metadata);
  }

  /**
   * Reply to a conversation by sending a message and appending it to the conversation.
   *
   * Required scope: `messages:send`
   *
   * @summary Create message reply
   */
  createMessageReply(body: types.OutboundReplyMessage, metadata: types.CreateMessageReplyMetadataParam): Promise<FetchResponse<202, types.CreateMessageReplyResponse202>> {
    return this.core.fetch('/conversations/{conversation_id}/messages', 'post', body, metadata);
  }

  /**
   * Snooze or unsnooze a conversation for the provided user.
   * For private conversations, reminders can only be created and edited through the API for
   * teammates that own the conversation.
   * For shared conversations, reminders created and edited through the API are shared for
   * all teammates within the shared inbox(es) that the conversation belongs to.
   *
   *
   * Required scope: `conversations:write`
   *
   * @summary Update conversation reminders
   */
  updateConversationReminders(body: types.UpdateConversationReminders, metadata: types.UpdateConversationRemindersMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/conversations/{conversation_id}/reminders', 'patch', body, metadata);
  }

  /**
   * Adds one or more tags to a conversation
   *
   * Required scope: `conversations:write`
   *
   * @summary Add conversation tag
   */
  addConversationTag(body: types.TagIds, metadata: types.AddConversationTagMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/conversations/{conversation_id}/tags', 'post', body, metadata);
  }

  /**
   * Removes one or more tags to a conversation
   *
   * Required scope: `conversations:write`
   *
   * @summary Remove conversation tag
   */
  removeConversationTag(body: types.TagIds, metadata: types.RemoveConversationTagMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/conversations/{conversation_id}/tags', 'delete', body, metadata);
  }

  /**
   * Lists the custom fields that can be attached to a Contact.
   *
   * > ⚠️ Deprecated endpoint
   * >
   * > This endpoint has been deprecated. Please use the fully compatible `GET
   * /contacts/custom_fields` endpoint instead.
   *
   *
   * Required scope: `custom_fields:read`
   *
   * @summary List Contact's custom fields
   */
  listCustomFields(): Promise<FetchResponse<200, types.ListCustomFieldsResponse200>> {
    return this.core.fetch('/custom_fields', 'get');
  }

  /**
   * Download an attachment file.
   *
   * Required scope: `attachments:read`
   *
   * @summary Download attachment
   */
  downloadAttachment(metadata: types.DownloadAttachmentMetadataParam): Promise<FetchResponse<200, types.DownloadAttachmentResponse200>> {
    return this.core.fetch('/download/{attachment_link_id}', 'get', metadata);
  }

  /**
   * Delete a draft message.
   *
   * Required scope: `drafts:delete`
   *
   * @summary Delete draft
   */
  deleteDraft(body: types.DeleteDraft, metadata: types.DeleteDraftMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/drafts/{draft_id}', 'delete', body, metadata);
  }

  /**
   * Edit a draft message.
   *
   * Required scope: `drafts:write`
   *
   * @summary Edit draft
   */
  editDraft(body: types.EditDraft, metadata: types.EditDraftMetadataParam): Promise<FetchResponse<200, types.MessageResponse>> {
    return this.core.fetch('/drafts/{message_id}/', 'patch', body, metadata);
  }

  /**
   * Lists all the detailed events which occurred in the inboxes of the company ordered in
   * reverse chronological order (newest first).
   * Refer to the [Events](https://dev.frontapp.com/reference/events) topic for more
   * information, including sorting and filtering.
   *
   *
   * Required scope: `events:*:read`
   *
   * @summary List events
   */
  listEvents(metadata?: types.ListEventsMetadataParam): Promise<FetchResponse<200, types.ListEventsResponse200>> {
    return this.core.fetch('/events', 'get', metadata);
  }

  /**
   * Fetch an event.
   * Refer to the [Events](https://dev.frontapp.com/reference/events) topic for more
   * information, including sorting and filtering.
   *
   *
   * Required scope: `events:*:read`
   *
   * @summary Get event
   */
  getEvent(metadata: types.GetEventMetadataParam): Promise<FetchResponse<200, types.EventResponse>> {
    return this.core.fetch('/events/{event_id}', 'get', metadata);
  }

  /**
   * List the inboxes of the company.
   *
   * Required scope: `inboxes:read`
   *
   * @summary List inboxes
   */
  listInboxes(): Promise<FetchResponse<200, types.ListInboxesResponse200>> {
    return this.core.fetch('/inboxes', 'get');
  }

  /**
   * Create an inbox in the oldest active workspace that the token has access to. If you need
   * to specify the workspace, we recommend using the [Create team
   * inbox](https://dev.frontapp.com/reference/create-team-inbox) endpoint instead.
   *
   * Required scope: `inboxes:write`
   *
   * @summary Create inbox
   */
  createInbox(body: types.CreateInbox): Promise<FetchResponse<201, types.InboxResponse>> {
    return this.core.fetch('/inboxes', 'post', body);
  }

  /**
   * Lists the custom fields that can be attached to an Inbox.
   *
   * Required scope: `custom_fields:read`
   *
   * @summary List Inbox's custom fields
   */
  listInboxCustomFields(): Promise<FetchResponse<200, types.ListInboxCustomFieldsResponse200>> {
    return this.core.fetch('/inboxes/custom_fields', 'get');
  }

  /**
   * Fetch an inbox.
   *
   * Required scope: `inboxes:read`
   *
   * @summary Get inbox
   */
  getInbox(metadata: types.GetInboxMetadataParam): Promise<FetchResponse<200, types.InboxResponse>> {
    return this.core.fetch('/inboxes/{inbox_id}', 'get', metadata);
  }

  /**
   * List the channels in an inbox.
   *
   * Required scope: `channels:read`
   *
   * @summary List inbox channels
   */
  listInboxChannels(metadata: types.ListInboxChannelsMetadataParam): Promise<FetchResponse<200, types.ListInboxChannelsResponse200>> {
    return this.core.fetch('/inboxes/{inbox_id}/channels', 'get', metadata);
  }

  /**
   * Create a channel in an inbox.
   *
   * Required scope: `channels:write`
   *
   * @summary Create a channel
   */
  createAChannel(body: types.CreateChannel, metadata: types.CreateAChannelMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/inboxes/{inbox_id}/channels', 'post', body, metadata);
  }

  /**
   * List the conversations in an inbox. For more advanced filtering, see the [search
   * endpoint](https://dev.frontapp.com/reference/conversations#search-conversations).
   *
   *
   * Required scope: `conversations:read`
   *
   * @summary List inbox conversations
   */
  listInboxConversations(metadata: types.ListInboxConversationsMetadataParam): Promise<FetchResponse<200, types.ListInboxConversationsResponse200>> {
    return this.core.fetch('/inboxes/{inbox_id}/conversations', 'get', metadata);
  }

  /**
   * Use this endpoint to import conversations into Front without sending data through a
   * channel. Typical use cases include importing historical conversations or creating new
   * conversations from non-standard sources, such as web form submissions that can't use the
   * default Form channel (for example, forms that don't have static URLs or form providers
   * that send email notifications after submission). Avoid using this endpoint for
   * conversations that can be handled by a dedicated Front channel—instead, use the [Create
   * message](https://dev.frontapp.com/reference/create-message) endpoint to send (rather
   * than import) a new message.
   *
   * Required scope: `messages:write`
   *
   * @summary Import message
   */
  importInboxMessage(body: types.ImportMessage, metadata: types.ImportInboxMessageMetadataParam): Promise<FetchResponse<202, types.ImportInboxMessageResponse202>> {
    return this.core.fetch('/inboxes/{inbox_id}/imported_messages', 'post', body, metadata);
  }

  /**
   * List the teammates with access to an inbox.
   *
   * Required scope: `teammates:read`
   *
   * @summary List inbox access
   */
  listInboxAccess(metadata: types.ListInboxAccessMetadataParam): Promise<FetchResponse<200, types.ListInboxAccessResponse200>> {
    return this.core.fetch('/inboxes/{inbox_id}/teammates', 'get', metadata);
  }

  /**
   * Give access to one or more teammates to an inbox.
   *
   * Required scope: `inboxes:write`
   *
   * @summary Add inbox access
   */
  addInboxAccess(body: types.TeammateIds, metadata: types.AddInboxAccessMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/inboxes/{inbox_id}/teammates', 'post', body, metadata);
  }

  /**
   * Remove access of one or more teammates from an inbox.
   *
   * Required scope: `inboxes:write`
   *
   * @summary Removes inbox access
   */
  removesInboxAccess(body: types.TeammateIds, metadata: types.RemovesInboxAccessMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/inboxes/{inbox_id}/teammates', 'delete', body, metadata);
  }

  /**
   * Fetches a knowledge base article.
   *
   * Required scope: `knowledge_bases:read`
   *
   * @summary Get a knowledge base article
   */
  getAKnowledgeBaseArticle(metadata: types.GetAKnowledgeBaseArticleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseArticleSlimResponse>> {
    return this.core.fetch('/knowledge_base_articles/{article_id}', 'get', metadata);
  }

  /**
   * Deletes an article and all its content and translations.
   *
   * Required scope: `knowledge_bases:delete`
   *
   * @summary Delete an article
   */
  deleteAnArticle(metadata: types.DeleteAnArticleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseArticleSlimResponse>> {
    return this.core.fetch('/knowledge_base_articles/{article_id}', 'delete', metadata);
  }

  /**
   * Fetches a knowledge base article with content in the default locale.
   *
   * Required scope: `knowledge_bases:read`
   *
   * @summary Get knowledge base article with content in default locale
   */
  getKnowledgeBaseArticleWithContentInDefaultLocale(metadata: types.GetKnowledgeBaseArticleWithContentInDefaultLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseArticleResponse>> {
    return this.core.fetch('/knowledge_base_articles/{article_id}/content', 'get', metadata);
  }

  /**
   * Updates an article's content in the default locale
   *
   * Required scope: `knowledge_bases:write`
   *
   * @summary Update article content in default locale.
   */
  updateArticleContentInDefaultLocale(body: types.UpdateArticleContentInDefaultLocaleBodyParam, metadata: types.UpdateArticleContentInDefaultLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseArticleResponse>> {
    return this.core.fetch('/knowledge_base_articles/{article_id}/content', 'patch', body, metadata);
  }

  /**
   * Downloads the attachment from an article.
   *
   * Required scope: `knowledge_bases:read`
   *
   * @summary Download attachment from an article
   */
  downloadAttachmentFromAnArticle(metadata: types.DownloadAttachmentFromAnArticleMetadataParam): Promise<FetchResponse<200, types.DownloadAttachmentFromAnArticleResponse200>> {
    return this.core.fetch('/knowledge_base_articles/{article_id}/download/{attachment_id}', 'get', metadata);
  }

  /**
   * Fetches a knowledge base article with content for a given locale.
   *
   * Required scope: `knowledge_bases:read`
   *
   * @summary Get knowledge base article with content in specified locale
   */
  getKnowledgeBaseArticleWithContentInSpecifiedLocale(metadata: types.GetKnowledgeBaseArticleWithContentInSpecifiedLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseArticleResponse>> {
    return this.core.fetch('/knowledge_base_articles/{article_id}/locales/{locale}/content', 'get', metadata);
  }

  /**
   * Updates an article's content for a given locale.
   *
   * Required scope: `knowledge_bases:write`
   *
   * @summary Update article content in specified locale
   */
  updateArticleContentInSpecifiedLocale(body: types.UpdateArticleContentInSpecifiedLocaleBodyParam, metadata: types.UpdateArticleContentInSpecifiedLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseArticleResponse>> {
    return this.core.fetch('/knowledge_base_articles/{article_id}/locales/{locale}/content', 'patch', body, metadata);
  }

  /**
   * Fetches a knowledge base category.
   *
   * Required scope: `knowledge_bases:read`
   *
   * @summary Get a knowledge base category
   */
  getAKnowledgeBaseCategory(metadata: types.GetAKnowledgeBaseCategoryMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseCategorySlimResponse>> {
    return this.core.fetch('/knowledge_base_categories/{category_id}', 'get', metadata);
  }

  /**
   * Deletes a knowledge base category.
   *
   * > ⚠️ Warning
   * >
   * > When a category is deleted, all articles in the category are also deleted.
   *
   *
   * Required scope: `knowledge_bases:delete`
   *
   * @summary Delete a knowledge base category
   */
  deleteAKnowledgeBaseCategory(metadata: types.DeleteAKnowledgeBaseCategoryMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/knowledge_base_categories/{category_id}', 'delete', metadata);
  }

  /**
   * List articles in a category.
   *
   * Required scope: `knowledge_bases:read`
   *
   * @summary List articles in a category
   */
  listArticlesInACategory(metadata: types.ListArticlesInACategoryMetadataParam): Promise<FetchResponse<200, types.ListArticlesInACategoryResponse200>> {
    return this.core.fetch('/knowledge_base_categories/{category_id}/articles', 'get', metadata);
  }

  /**
   * Fetches a knowledge base category with content in the default locale.
   *
   * Required scope: `knowledge_bases:read`
   *
   * @summary Get knowledge base category content in default locale
   */
  getKnowledgeBaseCategoryContentInDefaultLocale(metadata: types.GetKnowledgeBaseCategoryContentInDefaultLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseCategoryResponse>> {
    return this.core.fetch('/knowledge_base_categories/{category_id}/content', 'get', metadata);
  }

  /**
   * Updates a knowledge base category in the default locale. Will republish the knowledge
   * base if the knowledge base is currently published.
   *
   * Required scope: `knowledge_bases:write`
   *
   * @summary Update knowledge base category in default locale
   */
  updateKnowledgeBaseCategoryInDefaultLocale(body: types.KnowledgeBaseCategoryPatch, metadata: types.UpdateKnowledgeBaseCategoryInDefaultLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseCategoryResponse>>;
  updateKnowledgeBaseCategoryInDefaultLocale(metadata: types.UpdateKnowledgeBaseCategoryInDefaultLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseCategoryResponse>>;
  updateKnowledgeBaseCategoryInDefaultLocale(body?: types.KnowledgeBaseCategoryPatch | types.UpdateKnowledgeBaseCategoryInDefaultLocaleMetadataParam, metadata?: types.UpdateKnowledgeBaseCategoryInDefaultLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseCategoryResponse>> {
    return this.core.fetch('/knowledge_base_categories/{category_id}/content', 'patch', body, metadata);
  }

  /**
   * Fetches a knowledge base category with content for a given locale.
   *
   * Required scope: `knowledge_bases:read`
   *
   * @summary Get knowledge base category with content in specified locale
   */
  getKnowledgeBaseCategoryWithContentInSpecifiedLocale(metadata: types.GetKnowledgeBaseCategoryWithContentInSpecifiedLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseCategoryResponse>> {
    return this.core.fetch('/knowledge_base_categories/{category_id}/locales/{locale}/content', 'get', metadata);
  }

  /**
   * Updates a knowledge base category for a given locale. Will republish the knowledge base
   * if the knowledge base is currently published.
   *
   * Required scope: `knowledge_bases:write`
   *
   * @summary Update knowledge base category in specified locale
   */
  updateKnowledgeBaseCategoryInSpecifiedLocale(body: types.KnowledgeBaseCategoryPatch, metadata: types.UpdateKnowledgeBaseCategoryInSpecifiedLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseCategoryResponse>>;
  updateKnowledgeBaseCategoryInSpecifiedLocale(metadata: types.UpdateKnowledgeBaseCategoryInSpecifiedLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseCategoryResponse>>;
  updateKnowledgeBaseCategoryInSpecifiedLocale(body?: types.KnowledgeBaseCategoryPatch | types.UpdateKnowledgeBaseCategoryInSpecifiedLocaleMetadataParam, metadata?: types.UpdateKnowledgeBaseCategoryInSpecifiedLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseCategoryResponse>> {
    return this.core.fetch('/knowledge_base_categories/{category_id}/locales/{locale}/content', 'patch', body, metadata);
  }

  /**
   * List the knowledge bases of the company.
   *
   * Required scope: `knowledge_bases:read`
   *
   * @summary List knowledge bases
   */
  listKnowledgeBases(): Promise<FetchResponse<200, types.ListKnowledgeBasesResponse200>> {
    return this.core.fetch('/knowledge_bases', 'get');
  }

  /**
   * Creates a knowledge base.
   *
   * Required scope: `knowledge_bases:write`
   *
   * @summary Create a knowledge base
   */
  createAKnowledgeBase(body: types.CreateAKnowledgeBaseBodyParam): Promise<FetchResponse<201, types.KnowledgeBaseResponse>> {
    return this.core.fetch('/knowledge_bases', 'post', body);
  }

  /**
   * Fetches a knowledge base.
   *
   * Required scope: `knowledge_bases:read`
   *
   * @summary Get a knowledge base
   */
  getAKnowledgeBase(metadata: types.GetAKnowledgeBaseMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseSlimResponse>> {
    return this.core.fetch('/knowledge_bases/{knowledge_base_id}', 'get', metadata);
  }

  /**
   * List articles in a knowledge base
   *
   * Required scope: `knowledge_bases:read`
   *
   * @summary List articles in a knowledge base
   */
  listArticlesInAKnowledgeBase(metadata: types.ListArticlesInAKnowledgeBaseMetadataParam): Promise<FetchResponse<200, types.ListArticlesInAKnowledgeBaseResponse200>> {
    return this.core.fetch('/knowledge_bases/{knowledge_base_id}/articles', 'get', metadata);
  }

  /**
   * Creates an article in a knowledge base in the default locale.
   *
   * Required scope: `knowledge_bases:write`
   *
   * @summary Create article in a knowledge base in default locale
   */
  createArticleInAKnowledgeBaseInDefaultLocale(body: types.CreateArticleInAKnowledgeBaseInDefaultLocaleBodyParam, metadata: types.CreateArticleInAKnowledgeBaseInDefaultLocaleMetadataParam): Promise<FetchResponse<201, types.KnowledgeBaseArticleResponse>> {
    return this.core.fetch('/knowledge_bases/{knowledge_base_id}/articles', 'post', body, metadata);
  }

  /**
   * List categories in a knowledge base.
   *
   * Required scope: `knowledge_bases:read`
   *
   * @summary List categories in a knowledge base
   */
  listCategoriesInAKnowledgeBase(metadata: types.ListCategoriesInAKnowledgeBaseMetadataParam): Promise<FetchResponse<200, types.ListCategoriesInAKnowledgeBaseResponse200>> {
    return this.core.fetch('/knowledge_bases/{knowledge_base_id}/categories', 'get', metadata);
  }

  /**
   * Creates a knowledge base category in the default locale.
   *
   * Required scope: `knowledge_bases:write`
   *
   * @summary Create knowledge base category in default locale
   */
  createKnowledgeBaseCategoryInDefaultLocale(body: types.CreateKnowledgeBaseCategoryInDefaultLocaleBodyParam, metadata: types.CreateKnowledgeBaseCategoryInDefaultLocaleMetadataParam): Promise<FetchResponse<201, types.KnowledgeBaseCategoryResponse>> {
    return this.core.fetch('/knowledge_bases/{knowledge_base_id}/categories', 'post', body, metadata);
  }

  /**
   * Fetches a knowledge base with its content in the default locale.
   *
   * Required scope: `knowledge_bases:read`
   *
   * @summary Get a knowledge base with content in default locale
   */
  getAKnowledgeBaseWithContentInDefaultLocale(metadata: types.GetAKnowledgeBaseWithContentInDefaultLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseResponse>> {
    return this.core.fetch('/knowledge_bases/{knowledge_base_id}/content', 'get', metadata);
  }

  /**
   * Updates a knowledge base in the default locale. Will republish the knowledge base if the
   * knowledge base is currently published.
   *
   * Required scope: `knowledge_bases:write`
   *
   * @summary Update knowledge base in default locale
   */
  updateKnowledgeBaseInDefaultLocale(body: types.UpdateKnowledgeBaseInDefaultLocaleBodyParam, metadata: types.UpdateKnowledgeBaseInDefaultLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseResponse>> {
    return this.core.fetch('/knowledge_bases/{knowledge_base_id}/content', 'patch', body, metadata);
  }

  /**
   * Create an article for a given locale in a knowledge base.
   *
   * Required scope: `knowledge_bases:write`
   *
   * @summary Create article in a knowledge base in specified locale
   */
  createArticleInAKnowledgeBaseInSpecifiedLocale(body: types.CreateArticleInAKnowledgeBaseInSpecifiedLocaleBodyParam, metadata: types.CreateArticleInAKnowledgeBaseInSpecifiedLocaleMetadataParam): Promise<FetchResponse<201, types.KnowledgeBaseArticleResponse>> {
    return this.core.fetch('/knowledge_bases/{knowledge_base_id}/locales/{locale}/articles', 'post', body, metadata);
  }

  /**
   * Creates a knowledge base category for a given locale.
   *
   * Required scope: `knowledge_bases:write`
   *
   * @summary Create knowledge base category in specified locale
   */
  createKnowledgeBaseCategoryInSpecifiedLocale(body: types.CreateKnowledgeBaseCategoryInSpecifiedLocaleBodyParam, metadata: types.CreateKnowledgeBaseCategoryInSpecifiedLocaleMetadataParam): Promise<FetchResponse<201, types.KnowledgeBaseCategoryResponse>> {
    return this.core.fetch('/knowledge_bases/{knowledge_base_id}/locales/{locale}/categories', 'post', body, metadata);
  }

  /**
   * Fetches a knowledge base with its content for a given locale.
   *
   * Required scope: `knowledge_bases:read`
   *
   * @summary Get a knowledge base with content in specified locale
   */
  getAKnowledgeBaseWithContentInSpecifiedLocale(metadata: types.GetAKnowledgeBaseWithContentInSpecifiedLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseResponse>> {
    return this.core.fetch('/knowledge_bases/{knowledge_base_id}/locales/{locale}/content', 'get', metadata);
  }

  /**
   * Updates a knowledge base for a given locale. Will republish the knowledge base if the
   * knowledge base is currently published.
   *
   * Required scope: `knowledge_bases:write`
   *
   * @summary Update knowledge base in specified locale
   */
  updateKnowledgeBaseInSpecifiedLocale(body: types.UpdateKnowledgeBaseInSpecifiedLocaleBodyParam, metadata: types.UpdateKnowledgeBaseInSpecifiedLocaleMetadataParam): Promise<FetchResponse<200, types.KnowledgeBaseResponse>> {
    return this.core.fetch('/knowledge_bases/{knowledge_base_id}/locales/{locale}/content', 'patch', body, metadata);
  }

  /**
   * List the links of the company paginated by id. Allows filtering by link type via the
   * q.types param.
   * These links include application objects; for more details, see the
   * [Links](https://dev.frontapp.com/reference/links) topic.
   *
   *
   * Required scope: `links:read`
   *
   * @summary List links
   */
  listLinks(metadata?: types.ListLinksMetadataParam): Promise<FetchResponse<200, types.ListLinksResponse200>> {
    return this.core.fetch('/links', 'get', metadata);
  }

  /**
   * Create a link. You must supply either `pattern` or `external_url` in the request, but
   * not both (`pattern` is for application objects while `external_url` is for standard
   * links). If `pattern` is provided, the API call updates the application objects matching
   * the exact pattern. Keep in mind this endpoint only creates or updates an existing link
   * from an application object. It does not create new application objects. If the link is
   * resolved to an installed links integration, any name retrieved from the integration will
   * override the provided name in the request.
   *
   * Required scope: `links:write`
   *
   * @summary Create link
   */
  createLink(body?: types.CreateLink): Promise<FetchResponse<201, types.LinkResponse>> {
    return this.core.fetch('/links', 'post', body);
  }

  /**
   * Lists the custom fields that can be attached to a Link.
   * For more information on links, see the [Links](https://dev.frontapp.com/reference/links)
   * topic.
   *
   *
   * Required scope: `custom_fields:read`
   *
   * @summary List Link's custom fields
   */
  listLinkCustomFields(): Promise<FetchResponse<200, types.ListLinkCustomFieldsResponse200>> {
    return this.core.fetch('/links/custom_fields', 'get');
  }

  /**
   * Fetch a link.
   * For more information on links, see the [Links](https://dev.frontapp.com/reference/links)
   * topic.
   *
   *
   * Required scope: `links:read`
   *
   * @summary Get link
   */
  getLink(metadata: types.GetLinkMetadataParam): Promise<FetchResponse<200, types.LinkResponse>> {
    return this.core.fetch('/links/{link_id}', 'get', metadata);
  }

  /**
   * Update a link.
   * For more information on links, see the [Links](https://dev.frontapp.com/reference/links)
   * topic.
   *
   *
   * Required scope: `links:write`
   *
   * @summary Update a link
   */
  updateALink(body: types.UpdateLink, metadata: types.UpdateALinkMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateALink(metadata: types.UpdateALinkMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateALink(body?: types.UpdateLink | types.UpdateALinkMetadataParam, metadata?: types.UpdateALinkMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/links/{link_id}', 'patch', body, metadata);
  }

  /**
   * List the conversations linked to a specific link. For more advanced filtering, see the
   * [search
   * endpoint](https://dev.frontapp.com/reference/conversations#search-conversations).
   * For more information on links, see the [Links](https://dev.frontapp.com/reference/links)
   * topic.
   *
   *
   * Required scope: `conversations:read`
   *
   * @summary List link conversations
   */
  listLinkConversations(metadata: types.ListLinkConversationsMetadataParam): Promise<FetchResponse<200, types.ListLinkConversationsResponse200>> {
    return this.core.fetch('/links/{link_id}/conversations', 'get', metadata);
  }

  /**
   * Fetch the details of the API token.
   *
   * @summary API Token details
   */
  apiTokenDetails(): Promise<FetchResponse<200, types.IdentityResponse>> {
    return this.core.fetch('/me', 'get');
  }

  /**
   * List the message template folders.
   *
   * Required scope: `message_templates:read`
   *
   * @summary List folders
   */
  listFolders(metadata?: types.ListFoldersMetadataParam): Promise<FetchResponse<200, types.ListFoldersResponse200>> {
    return this.core.fetch('/message_template_folders', 'get', metadata);
  }

  /**
   * Create a new message template folder in the oldest active workspace that the token has
   * access to. If you need to specify the workspace, we recommend using the [Create team
   * folder](https://dev.frontapp.com/reference/create-team-folder) endpoint instead.
   *
   * Required scope: `message_templates:write`
   *
   * @summary Create folder
   */
  createFolder(body: types.CreateMessageTemplateFolder): Promise<FetchResponse<201, types.MessageTemplateFolderResponse>> {
    return this.core.fetch('/message_template_folders', 'post', body);
  }

  /**
   * Fetch a message template folder.
   *
   * Required scope: `message_templates:read`
   *
   * @summary Get folder
   */
  getFolder(metadata: types.GetFolderMetadataParam): Promise<FetchResponse<200, types.MessageTemplateFolderResponse>> {
    return this.core.fetch('/message_template_folders/{message_template_folder_id}', 'get', metadata);
  }

  /**
   * Update message template folder
   *
   * Required scope: `message_templates:write`
   *
   * @summary Update folder
   */
  updateFolder(body: types.UpdateMessageTemplateFolder, metadata: types.UpdateFolderMetadataParam): Promise<FetchResponse<200, types.MessageTemplateFolderResponse>>;
  updateFolder(metadata: types.UpdateFolderMetadataParam): Promise<FetchResponse<200, types.MessageTemplateFolderResponse>>;
  updateFolder(body?: types.UpdateMessageTemplateFolder | types.UpdateFolderMetadataParam, metadata?: types.UpdateFolderMetadataParam): Promise<FetchResponse<200, types.MessageTemplateFolderResponse>> {
    return this.core.fetch('/message_template_folders/{message_template_folder_id}', 'patch', body, metadata);
  }

  /**
   * Delete a message template folder and child folders/templates
   *
   * Required scope: `message_templates:delete`
   *
   * @summary Delete folder
   */
  deleteFolder(metadata: types.DeleteFolderMetadataParam): Promise<FetchResponse<202, types.DeleteFolderResponse202>> {
    return this.core.fetch('/message_template_folders/{message_template_folder_id}', 'delete', metadata);
  }

  /**
   * Fetch the child message templates folders of a message template folder.
   *
   * Required scope: `message_templates:read`
   *
   * @summary Get child folders
   */
  getChildFolders(metadata: types.GetChildFoldersMetadataParam): Promise<FetchResponse<200, types.GetChildFoldersResponse200>> {
    return this.core.fetch('/message_template_folders/{message_template_folder_id}/message_template_folders', 'get', metadata);
  }

  /**
   * Create a new message template folder as a child of the given folder
   *
   * Required scope: `message_templates:write`
   *
   * @summary Create child folder
   */
  createChildFolder(body: types.CreateMessageTemplateFolderAsChild, metadata: types.CreateChildFolderMetadataParam): Promise<FetchResponse<201, types.MessageTemplateFolderResponse>> {
    return this.core.fetch('/message_template_folders/{message_template_folder_id}/message_template_folders', 'post', body, metadata);
  }

  /**
   * Fetch the child message templates of a message template folder.
   *
   * Required scope: `message_templates:read`
   *
   * @summary Get child templates
   */
  getChildTemplates(metadata: types.GetChildTemplatesMetadataParam): Promise<FetchResponse<200, types.GetChildTemplatesResponse200>> {
    return this.core.fetch('/message_template_folders/{message_template_folder_id}/message_templates', 'get', metadata);
  }

  /**
   * Create a new message template as a child of the given folder
   *
   * Required scope: `message_templates:write`
   *
   * @summary Create child template
   */
  createChildTemplate(body: types.CreateMessageTemplateAsChild, metadata: types.CreateChildTemplateMetadataParam): Promise<FetchResponse<201, types.MessageTemplateResponse>> {
    return this.core.fetch('/message_template_folders/{message_template_folder_id}/message_templates', 'post', body, metadata);
  }

  /**
   * List the message templates.
   *
   * Required scope: `message_templates:read`
   *
   * @summary List message templates
   */
  listMessageTemplates(metadata?: types.ListMessageTemplatesMetadataParam): Promise<FetchResponse<200, types.ListMessageTemplatesResponse200>> {
    return this.core.fetch('/message_templates', 'get', metadata);
  }

  /**
   * Create a new message template in the oldest active workspace that the token has access
   * to. If you need to specify the workspace, we recommend using the [Create team message
   * template](https://dev.frontapp.com/reference/create-team-message-template) endpoint
   * instead.
   *
   * Required scope: `message_templates:write`
   *
   * @summary Create message template
   */
  createMessageTemplate(body: types.CreateSharedMessageTemplate): Promise<FetchResponse<201, types.MessageTemplateResponse>> {
    return this.core.fetch('/message_templates', 'post', body);
  }

  /**
   * Fetch a message template.
   *
   * Required scope: `message_templates:read`
   *
   * @summary Get message template
   */
  getMessageTemplate(metadata: types.GetMessageTemplateMetadataParam): Promise<FetchResponse<200, types.MessageTemplateResponse>> {
    return this.core.fetch('/message_templates/{message_template_id}', 'get', metadata);
  }

  /**
   * Update a message template.
   *
   * Required scope: `message_templates:write`
   *
   * @summary Update message template
   */
  updateMessageTemplate(metadata: types.UpdateMessageTemplateMetadataParam): Promise<FetchResponse<200, types.MessageTemplateResponse>> {
    return this.core.fetch('/message_templates/{message_template_id}', 'patch', metadata);
  }

  /**
   * Delete a message template
   *
   * Required scope: `message_templates:delete`
   *
   * @summary Delete message template
   */
  deleteMessageTemplate(metadata: types.DeleteMessageTemplateMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/message_templates/{message_template_id}', 'delete', metadata);
  }

  /**
   * Download an attachment file for a given message template ID
   *
   * Required scope: `attachments:read`
   *
   * @summary Download attachment for a message template
   */
  downloadAttachmentForAMessageTemplate(metadata: types.DownloadAttachmentForAMessageTemplateMetadataParam): Promise<FetchResponse<200, types.DownloadAttachmentForAMessageTemplateResponse200>> {
    return this.core.fetch('/message_templates/{message_template_id}/download/{attachment_link_id}', 'get', metadata);
  }

  /**
   * Fetch a message.
   *
   * > ℹ️ The HTTP Header `Accept` can be used to request the message in a different format.
   * > By default, Front will return the documented JSON response. By requesting
   * `message/rfc822`, the response will contain the message in the EML format (for email
   * messages only).
   *
   *
   * Required scope: `messages:read`
   *
   * @summary Get message
   */
  getMessage(metadata: types.GetMessageMetadataParam): Promise<FetchResponse<200, types.MessageResponse>> {
    return this.core.fetch('/messages/{message_id}', 'get', metadata);
  }

  /**
   * Download an attachment file for a given message id. Should be used by partner channels.
   *
   * Required scope: `attachments:read`
   *
   * @summary Download attachment for a message
   */
  downloadAttachmentForAMessage(metadata: types.DownloadAttachmentForAMessageMetadataParam): Promise<FetchResponse<200, types.DownloadAttachmentForAMessageResponse200>> {
    return this.core.fetch('/messages/{message_id}/download/{attachment_link_id}', 'get', metadata);
  }

  /**
   * Get the seen receipts for the given message. If no seen-by information is available,
   * there will be a single entry for the first time the message was seen by any recipient.
   * If seen-by information is available, there will be an entry for each recipient who has
   * seen the message.
   *
   * Required scope: `messages:read`
   *
   * @summary Get message seen status
   */
  getMessageSeenStatus(metadata: types.GetMessageSeenStatusMetadataParam): Promise<FetchResponse<200, types.GetMessageSeenStatusResponse200>> {
    return this.core.fetch('/messages/{message_id}/seen', 'get', metadata);
  }

  /**
   * Mark an outbound message from Front as seen. Note, the message seen route should only be
   * called in response to an actual end-user's message-seen action. In accordance with this
   * behavior, the route is rate limited to 10 requests per message per hour.
   *
   * Required scope: `messages:write`
   *
   * @summary Mark message seen
   */
  markMessageSeen(body: types.MarkMessageSeenBodyParam, metadata: types.MarkMessageSeenMetadataParam): Promise<FetchResponse<number, unknown>>;
  markMessageSeen(metadata: types.MarkMessageSeenMetadataParam): Promise<FetchResponse<number, unknown>>;
  markMessageSeen(body?: types.MarkMessageSeenBodyParam | types.MarkMessageSeenMetadataParam, metadata?: types.MarkMessageSeenMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/messages/{message_id}/seen', 'post', body, metadata);
  }

  /**
   * List the rules of the company.
   *
   * Required scope: `rules:read`
   *
   * @summary List rules
   */
  listRules(): Promise<FetchResponse<200, types.ListRulesResponse200>> {
    return this.core.fetch('/rules', 'get');
  }

  /**
   * Fetch a rule.
   *
   * Required scope: `rules:read`
   *
   * @summary Get rule
   */
  getRule(metadata: types.GetRuleMetadataParam): Promise<FetchResponse<200, types.RuleResponse>> {
    return this.core.fetch('/rules/{rule_id}', 'get', metadata);
  }

  /**
   * List the shifts.
   *
   * Required scope: `shifts:read`
   *
   * @summary List Shifts
   */
  listShifts(): Promise<FetchResponse<200, types.ListShiftsResponse200>> {
    return this.core.fetch('/shifts', 'get');
  }

  /**
   * Create a shift in the oldest active workspace that the token has access to. If you need
   * to specify the workspace, we recommend using the [Create team
   * shift](https://dev.frontapp.com/reference/create-team-shift) endpoint instead.
   *
   * Required scope: `shifts:write`
   *
   * @summary Create shift
   */
  createShift(body: types.CreateShift): Promise<FetchResponse<201, types.ShiftResponse>> {
    return this.core.fetch('/shifts', 'post', body);
  }

  /**
   * Fetch a shift.
   *
   * Required scope: `shifts:read`
   *
   * @summary Get shift
   */
  getShift(metadata: types.GetShiftMetadataParam): Promise<FetchResponse<200, types.ShiftResponse>> {
    return this.core.fetch('/shifts/{shift_id}', 'get', metadata);
  }

  /**
   * Update a shift.
   *
   * Required scope: `shifts:write`
   *
   * @summary Update shift
   */
  updateShift(body: types.UpdateShift, metadata: types.UpdateShiftMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateShift(metadata: types.UpdateShiftMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateShift(body?: types.UpdateShift | types.UpdateShiftMetadataParam, metadata?: types.UpdateShiftMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shifts/{shift_id}', 'patch', body, metadata);
  }

  /**
   * List the teammates assigned to a shift.
   *
   * Required scope: `teammates:read`
   *
   * @summary List shift's teammates
   */
  listShiftsTeammates(metadata: types.ListShiftsTeammatesMetadataParam): Promise<FetchResponse<200, types.ListShiftsTeammatesResponse200>> {
    return this.core.fetch('/shifts/{shift_id}/teammates', 'get', metadata);
  }

  /**
   * Add teammates to a shift. The selected teammates must be in the team that owns the
   * shift.
   *
   * Required scope: `shifts:write`
   *
   * @summary Add teammates to shift
   */
  addTeammatesToShift(body: types.TeammateIds, metadata: types.AddTeammatesToShiftMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shifts/{shift_id}/teammates', 'post', body, metadata);
  }

  /**
   * Remove teammates from a shift.
   *
   * Required scope: `shifts:write`
   *
   * @summary Remove teammates from shift
   */
  removeTeammatesFromShift(body: types.TeammateIds, metadata: types.RemoveTeammatesFromShiftMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/shifts/{shift_id}/teammates', 'delete', body, metadata);
  }

  /**
   * Get the given signature.
   *
   * Required scope: `signatures:read`
   *
   * @summary Get signatures
   */
  getSignatures(metadata: types.GetSignaturesMetadataParam): Promise<FetchResponse<200, types.SignatureResponse>> {
    return this.core.fetch('/signatures/{signature_id}', 'get', metadata);
  }

  /**
   * Update signature
   *
   * Required scope: `signatures:write`
   *
   * @summary Update signature
   */
  updateSignature(body: types.UpdateSignature, metadata: types.UpdateSignatureMetadataParam): Promise<FetchResponse<200, types.SignatureResponse>>;
  updateSignature(metadata: types.UpdateSignatureMetadataParam): Promise<FetchResponse<200, types.SignatureResponse>>;
  updateSignature(body?: types.UpdateSignature | types.UpdateSignatureMetadataParam, metadata?: types.UpdateSignatureMetadataParam): Promise<FetchResponse<200, types.SignatureResponse>> {
    return this.core.fetch('/signatures/{signature_id}', 'patch', body, metadata);
  }

  /**
   * Delete signature
   *
   * Required scope: `signatures:delete`
   *
   * @summary Delete signature
   */
  deleteSignature(metadata: types.DeleteSignatureMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/signatures/{signature_id}', 'delete', metadata);
  }

  /**
   * List all the tags of the company that the API token has access to, whether they be
   * company tags, team tags, or teammate tags.
   *
   * Required scope: `tags:read`
   *
   * @summary List tags
   */
  listTags(metadata?: types.ListTagsMetadataParam): Promise<FetchResponse<200, types.ListTagsResponse200>> {
    return this.core.fetch('/tags', 'get', metadata);
  }

  /**
   * Create a tag in the oldest team (workspace). This is a legacy endpoint. Use the Create
   * company tag, Create team tag, or Create teammate tag endpoints instead.
   *
   * Required scope: `tags:write`
   *
   * @summary Create tag
   */
  createTag(body: types.CreateTag): Promise<FetchResponse<201, types.TagResponse>> {
    return this.core.fetch('/tags', 'post', body);
  }

  /**
   * Fetch a tag.
   *
   * Required scope: `tags:read`
   *
   * @summary Get tag
   */
  getTag(metadata: types.GetTagMetadataParam): Promise<FetchResponse<200, types.TagResponse>> {
    return this.core.fetch('/tags/{tag_id}', 'get', metadata);
  }

  /**
   * Update a tag.
   *
   * Required scope: `tags:write`
   *
   * @summary Update a tag
   */
  updateATag(body: types.UpdateTag, metadata: types.UpdateATagMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateATag(metadata: types.UpdateATagMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateATag(body?: types.UpdateTag | types.UpdateATagMetadataParam, metadata?: types.UpdateATagMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/tags/{tag_id}', 'patch', body, metadata);
  }

  /**
   * Delete a tag.
   *
   * Required scope: `tags:delete`
   *
   * @summary Delete tag
   */
  deleteTag(metadata: types.DeleteTagMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/tags/{tag_id}', 'delete', metadata);
  }

  /**
   * List the children of a specific tag.
   *
   * Required scope: `tags:read`
   *
   * @summary List tag children
   */
  listTagChildren(metadata: types.ListTagChildrenMetadataParam): Promise<FetchResponse<200, types.ListTagChildrenResponse200>> {
    return this.core.fetch('/tags/{tag_id}/children', 'get', metadata);
  }

  /**
   * Creates a child tag.
   *
   * Required scope: `tags:write`
   *
   * @summary Create child tag
   */
  createChildTag(body: types.CreateTag, metadata: types.CreateChildTagMetadataParam): Promise<FetchResponse<201, types.TagResponse>> {
    return this.core.fetch('/tags/{tag_id}/children', 'post', body, metadata);
  }

  /**
   * List the conversations tagged with a tag. For more advanced filtering, see the [search
   * endpoint](https://dev.frontapp.com/reference/conversations#search-conversations).
   *
   *
   * Required scope: `conversations:read`
   *
   * @summary List tagged conversations
   */
  listTaggedConversations(metadata: types.ListTaggedConversationsMetadataParam): Promise<FetchResponse<200, types.ListTaggedConversationsResponse200>> {
    return this.core.fetch('/tags/{tag_id}/conversations', 'get', metadata);
  }

  /**
   * List the teammate groups in the company.
   *
   * Required scope: `teammate_groups:read`
   *
   * @summary List teammate groups
   */
  listCompanyTeammateGroups(): Promise<FetchResponse<200, types.ListCompanyTeammateGroupsResponse200>> {
    return this.core.fetch('/teammate_groups', 'get');
  }

  /**
   * Create a new teammate group.
   *
   * Required scope: `teammate_groups:write`
   *
   * @summary Create teammate group
   */
  createCompanyTeammateGroup(body: types.CreateTeammateGroup): Promise<FetchResponse<201, types.TeammateGroupResponse>> {
    return this.core.fetch('/teammate_groups', 'post', body);
  }

  /**
   * Fetch a teammate group.
   *
   * Required scope: `teammate_groups:read`
   *
   * @summary Get teammate group
   */
  getCompanyTeammateGroup(metadata: types.GetCompanyTeammateGroupMetadataParam): Promise<FetchResponse<200, types.TeammateGroupResponse>> {
    return this.core.fetch('/teammate_groups/{teammate_group_id}', 'get', metadata);
  }

  /**
   * Updates a teammate group. Note - You cannot modify a teammate group that is managed by
   * SCIM.
   *
   * Required scope: `teammate_groups:write`
   *
   * @summary Update a teammate group
   */
  updateACompanyTeammateGroup(body: types.UpdateTeammateGroup, metadata: types.UpdateACompanyTeammateGroupMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateACompanyTeammateGroup(metadata: types.UpdateACompanyTeammateGroupMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateACompanyTeammateGroup(body?: types.UpdateTeammateGroup | types.UpdateACompanyTeammateGroupMetadataParam, metadata?: types.UpdateACompanyTeammateGroupMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teammate_groups/{teammate_group_id}', 'patch', body, metadata);
  }

  /**
   * Deletes a teammate group. Note - You cannot delete a teammate group that is managed by
   * SCIM.
   *
   * Required scope: `teammate_groups:delete`
   *
   * @summary Delete teammate group
   */
  deleteCompanyTeammateGroup(metadata: types.DeleteCompanyTeammateGroupMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teammate_groups/{teammate_group_id}', 'delete', metadata);
  }

  /**
   * List inboxes that the teammate group has access to via its associated teams.
   *
   * Required scope: `inboxes:read`
   *
   * @summary List teammate group team inboxes
   */
  listCompanyTeammateGroupTeamInboxes(metadata: types.ListCompanyTeammateGroupTeamInboxesMetadataParam): Promise<FetchResponse<200, types.ListCompanyTeammateGroupTeamInboxesResponse200>> {
    return this.core.fetch('/teammate_groups/{teammate_group_id}/inboxes', 'get', metadata);
  }

  /**
   * Links non-public inboxes to the teammate group. The inbox must be part of a team that
   * has been added to the teammate group.
   *
   * Required scope: `teammate_groups:write`
   *
   * @summary Add teammate group team inboxes
   */
  addCompanyTeammateGroupTeamInboxes(body: types.InboxIds, metadata: types.AddCompanyTeammateGroupTeamInboxesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teammate_groups/{teammate_group_id}/inboxes', 'post', body, metadata);
  }

  /**
   * Unlinks non-public inboxes from the teammate group.
   *
   * Required scope: `teammate_groups:write`
   *
   * @summary Remove teammate group team inboxes
   */
  removeCompanyTeammateGroupTeamInboxes(body: types.InboxIds, metadata: types.RemoveCompanyTeammateGroupTeamInboxesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teammate_groups/{teammate_group_id}/inboxes', 'delete', body, metadata);
  }

  /**
   * List teammate group teammates.
   *
   * Required scope: `teammates:read`
   *
   * @summary List teammate group teammates
   */
  listCompanyTeammateGroupTeammates(metadata: types.ListCompanyTeammateGroupTeammatesMetadataParam): Promise<FetchResponse<200, types.ListCompanyTeammateGroupTeammatesResponse200>> {
    return this.core.fetch('/teammate_groups/{teammate_group_id}/teammates', 'get', metadata);
  }

  /**
   * Add teammate group teammates. Note - You cannot modify a teammate group that is managed
   * by SCIM.
   *
   * Required scope: `teammate_groups:write`
   *
   * @summary Add teammate group teammates
   */
  addCompanyTeammateGroupTeammates(body: types.TeammateIds, metadata: types.AddCompanyTeammateGroupTeammatesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teammate_groups/{teammate_group_id}/teammates', 'post', body, metadata);
  }

  /**
   * Remove teammate group teammates. Note - You cannot modify a teammate group that is
   * managed by SCIM.
   *
   * Required scope: `teammate_groups:write`
   *
   * @summary Remove teammate group teammates
   */
  removeCompanyTeammateGroupTeammates(body: types.TeammateIds, metadata: types.RemoveCompanyTeammateGroupTeammatesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teammate_groups/{teammate_group_id}/teammates', 'delete', body, metadata);
  }

  /**
   * List teams added to the teammate group. Any teams added to the teammate group will
   * automatically link public inboxes.
   *
   * Required scope: `teams:read`
   *
   * @summary List teammate group teams
   */
  listCompanyTeammateGroupTeams(metadata: types.ListCompanyTeammateGroupTeamsMetadataParam): Promise<FetchResponse<200, types.ListCompanyTeammateGroupTeamsResponse200>> {
    return this.core.fetch('/teammate_groups/{teammate_group_id}/teams', 'get', metadata);
  }

  /**
   * Adds teams to the teammate group. Any teams added to the teammate group will
   * automatically link public inboxes. Non-public inboxes can be added to the teammate group
   * separately.
   *
   * Required scope: `teammate_groups:write`
   *
   * @summary Add teammate group teams
   */
  addCompanyTeammateGroupTeams(body: types.TeamIds, metadata: types.AddCompanyTeammateGroupTeamsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teammate_groups/{teammate_group_id}/teams', 'post', body, metadata);
  }

  /**
   * Remove teams from the teammate group. Unlinks to any associated team inboxes.
   *
   * Required scope: `teammate_groups:write`
   *
   * @summary Remove teammate group teams
   */
  removeCompanyTeammateGroupTeams(body: types.TeamIds, metadata: types.RemoveCompanyTeammateGroupTeamsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teammate_groups/{teammate_group_id}/teams', 'delete', body, metadata);
  }

  /**
   * List the teammates in the company.
   *
   * Required scope: `teammates:read`
   *
   * @summary List teammates
   */
  listTeammates(): Promise<FetchResponse<200, types.ListTeammatesResponse200>> {
    return this.core.fetch('/teammates', 'get');
  }

  /**
   * Lists the custom fields that can be attached to a Teammate.
   *
   * Required scope: `custom_fields:read`
   *
   * @summary List Teammate's custom fields
   */
  listTeammateCustomFields(): Promise<FetchResponse<200, types.ListTeammateCustomFieldsResponse200>> {
    return this.core.fetch('/teammates/custom_fields', 'get');
  }

  /**
   * Fetch a teammate.
   *
   * Required scope: `teammates:read`
   *
   * @summary Get teammate
   */
  getTeammate(metadata: types.GetTeammateMetadataParam): Promise<FetchResponse<200, types.TeammateResponse>> {
    return this.core.fetch('/teammates/{teammate_id}', 'get', metadata);
  }

  /**
   * Update a teammate.
   *
   * Required scope: `teammates:write`
   *
   * @summary Update teammate
   */
  updateTeammate(body: types.UpdateTeammate, metadata: types.UpdateTeammateMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateTeammate(metadata: types.UpdateTeammateMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateTeammate(body?: types.UpdateTeammate | types.UpdateTeammateMetadataParam, metadata?: types.UpdateTeammateMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teammates/{teammate_id}', 'patch', body, metadata);
  }

  /**
   * List the channels of a teammate.
   *
   * Required scope: `channels:read`
   *
   * @summary List teammate channels
   */
  listTeammateChannels(metadata: types.ListTeammateChannelsMetadataParam): Promise<FetchResponse<200, types.ListTeammateChannelsResponse200>> {
    return this.core.fetch('/teammates/{teammate_id}/channels', 'get', metadata);
  }

  /**
   * List the contact groups belonging to the requested teammate.
   *
   * > ⚠️ Deprecated endpoint
   * >
   * > This endpoint has been deprecated. Please use the compatible contact list endpoints
   * instead.
   * > - `GET /teammates/{teammate_id}/contact_lists`.
   *
   *
   * Required scope: `contacts:read`
   *
   * @summary List teammate groups
   */
  listTeammateGroups(metadata: types.ListTeammateGroupsMetadataParam): Promise<FetchResponse<200, types.ListTeammateGroupsResponse200>> {
    return this.core.fetch('/teammates/{teammate_id}/contact_groups', 'get', metadata);
  }

  /**
   * Create a new contact group for the requested teammate.
   *
   * > ⚠️ Deprecated endpoint
   * >
   * > This endpoint has been deprecated. Please use the compatible contact list endpoints
   * instead.
   * > - `POST /teammates/{teammate_id}/contact_lists`.
   *
   *
   * Required scope: `contacts:write`
   *
   * @summary Create teammate group
   */
  createTeammateGroup(body: types.CreateContactList, metadata: types.CreateTeammateGroupMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teammates/{teammate_id}/contact_groups', 'post', body, metadata);
  }

  /**
   * List the contact lists belonging to the requested teammate.
   *
   * Required scope: `contacts:read`
   *
   * @summary List teammate contact lists
   */
  listTeammateContactLists(metadata: types.ListTeammateContactListsMetadataParam): Promise<FetchResponse<200, types.ListTeammateContactListsResponse200>> {
    return this.core.fetch('/teammates/{teammate_id}/contact_lists', 'get', metadata);
  }

  /**
   * Create a new contact list for the requested teammate.
   *
   * Required scope: `contacts:write`
   *
   * @summary Create teammate contact list
   */
  createTeammateContactList(body: types.CreateContactList, metadata: types.CreateTeammateContactListMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teammates/{teammate_id}/contact_lists', 'post', body, metadata);
  }

  /**
   * List the contacts of a teammate.
   *
   * Required scope: `contacts:read`
   *
   * @summary List teammate contacts
   */
  listTeammateContacts(metadata: types.ListTeammateContactsMetadataParam): Promise<FetchResponse<200, types.ListTeammateContactsResponse200>> {
    return this.core.fetch('/teammates/{teammate_id}/contacts', 'get', metadata);
  }

  /**
   * Create a contact for a teammate.
   *
   * Required scope: `contacts:write`
   *
   * @summary Create teammate contact
   */
  createTeammateContact(body: types.CreateContact, metadata: types.CreateTeammateContactMetadataParam): Promise<FetchResponse<201, types.ContactResponse>> {
    return this.core.fetch('/teammates/{teammate_id}/contacts', 'post', body, metadata);
  }

  /**
   * List the conversations assigned to a teammate in reverse chronological order (most
   * recently updated first). For more advanced filtering, see the [search
   * endpoint](https://dev.frontapp.com/reference/conversations#search-conversations).
   *
   *
   * Required scope: `conversations:read`
   *
   * @summary List assigned conversations
   */
  listAssignedConversations(metadata: types.ListAssignedConversationsMetadataParam): Promise<FetchResponse<200, types.ListAssignedConversationsResponse200>> {
    return this.core.fetch('/teammates/{teammate_id}/conversations', 'get', metadata);
  }

  /**
   * Returns list of inboxes the teammate has access to.
   *
   * Required scope: `inboxes:read`
   *
   * @summary List teammate inboxes
   */
  listTeammateInboxes(metadata: types.ListTeammateInboxesMetadataParam): Promise<FetchResponse<200, types.ListTeammateInboxesResponse200>> {
    return this.core.fetch('/teammates/{teammate_id}/inboxes', 'get', metadata);
  }

  /**
   * List the message template folders belonging to the requested teammate.
   *
   * Required scope: `message_templates:read`
   *
   * @summary List teammate folders
   */
  listTeammateFolders(metadata: types.ListTeammateFoldersMetadataParam): Promise<FetchResponse<200, types.ListTeammateFoldersResponse200>> {
    return this.core.fetch('/teammates/{teammate_id}/message_template_folders', 'get', metadata);
  }

  /**
   * Create a new message template folder belonging to the requested teammate.
   *
   * Required scope: `message_templates:write`
   *
   * @summary Create teammate folder
   */
  createTeammateFolder(body: types.CreateMessageTemplateFolder, metadata: types.CreateTeammateFolderMetadataParam): Promise<FetchResponse<201, types.MessageTemplateFolderResponse>> {
    return this.core.fetch('/teammates/{teammate_id}/message_template_folders', 'post', body, metadata);
  }

  /**
   * List the message templates belonging to the requested teammate.
   *
   * Required scope: `message_templates:read`
   *
   * @summary List teammate message templates
   */
  listTeammateMessageTemplates(metadata: types.ListTeammateMessageTemplatesMetadataParam): Promise<FetchResponse<200, types.ListTeammateMessageTemplatesResponse200>> {
    return this.core.fetch('/teammates/{teammate_id}/message_templates', 'get', metadata);
  }

  /**
   * Create a new message template for the given teammate
   *
   * Required scope: `message_templates:write`
   *
   * @summary Create teammate message template
   */
  createTeammateMessageTemplate(body: types.CreatePrivateMessageTemplate, metadata: types.CreateTeammateMessageTemplateMetadataParam): Promise<FetchResponse<201, types.MessageTemplateResponse>> {
    return this.core.fetch('/teammates/{teammate_id}/message_templates', 'post', body, metadata);
  }

  /**
   * List the private inboxes of a teammate.
   *
   * Required scope: `inboxes:read`
   *
   * @summary List teammate private inboxes
   */
  listTeammatePrivateInboxes(metadata: types.ListTeammatePrivateInboxesMetadataParam): Promise<FetchResponse<200, types.ListTeammatePrivateInboxesResponse200>> {
    return this.core.fetch('/teammates/{teammate_id}/private_inboxes', 'get', metadata);
  }

  /**
   * Create a private inbox for a teammate.
   *
   * Required scope: `inboxes:write`
   *
   * @summary Create teammate private inbox
   */
  createTeammatePrivateInbox(body: types.CreatePrivateInbox, metadata: types.CreateTeammatePrivateInboxMetadataParam): Promise<FetchResponse<201, types.InboxResponse>> {
    return this.core.fetch('/teammates/{teammate_id}/private_inboxes', 'post', body, metadata);
  }

  /**
   * List the rules of a teammate.
   *
   * Required scope: `rules:read`
   *
   * @summary List teammate rules
   */
  listTeammateRules(metadata: types.ListTeammateRulesMetadataParam): Promise<FetchResponse<200, types.ListTeammateRulesResponse200>> {
    return this.core.fetch('/teammates/{teammate_id}/rules', 'get', metadata);
  }

  /**
   * Lists all the shifts for the teammate.
   *
   * Required scope: `shifts:read`
   *
   * @summary List Teammate Shifts
   */
  listTeammateShifts(metadata: types.ListTeammateShiftsMetadataParam): Promise<FetchResponse<200, types.ListTeammateShiftsResponse200>> {
    return this.core.fetch('/teammates/{teammate_id}/shifts', 'get', metadata);
  }

  /**
   * List the signatures belonging to the given teammate.
   *
   * Required scope: `signatures:read`
   *
   * @summary List teammate signatures
   */
  listTeammateSignatures(metadata: types.ListTeammateSignaturesMetadataParam): Promise<FetchResponse<200, types.ListTeammateSignaturesResponse200>> {
    return this.core.fetch('/teammates/{teammate_id}/signatures', 'get', metadata);
  }

  /**
   * Create a new signature for the given teammate
   *
   * Required scope: `signatures:write`
   *
   * @summary Create teammate signature
   */
  createTeammateSignature(body: types.CreatePrivateSignature, metadata: types.CreateTeammateSignatureMetadataParam): Promise<FetchResponse<201, types.SignatureResponse>> {
    return this.core.fetch('/teammates/{teammate_id}/signatures', 'post', body, metadata);
  }

  /**
   * List the tags for a teammate.
   *
   * Required scope: `tags:read`
   *
   * @summary List teammate tags
   */
  listTeammateTags(metadata: types.ListTeammateTagsMetadataParam): Promise<FetchResponse<200, types.ListTeammateTagsResponse200>> {
    return this.core.fetch('/teammates/{teammate_id}/tags', 'get', metadata);
  }

  /**
   * Create a tag for a teammate.
   *
   * Required scope: `tags:write`
   *
   * @summary Create teammate tag
   */
  createTeammateTag(body: types.CreateTag, metadata: types.CreateTeammateTagMetadataParam): Promise<FetchResponse<201, types.TagResponse>> {
    return this.core.fetch('/teammates/{teammate_id}/tags', 'post', body, metadata);
  }

  /**
   * List the time offs of a teammate.
   *
   * Required scope: `time_off:read`
   *
   * @summary List teammate time offs
   */
  listTeammateTimeOffs(metadata: types.ListTeammateTimeOffsMetadataParam): Promise<FetchResponse<200, types.ListTeammateTimeOffsResponse200>> {
    return this.core.fetch('/teammates/{teammate_id}/time_offs', 'get', metadata);
  }

  /**
   * Create a time off for a teammate.
   *
   * Required scope: `time_off:write`
   *
   * @summary Create time off
   */
  createTimeOff(body: types.CreateTimeOff, metadata: types.CreateTimeOffMetadataParam): Promise<FetchResponse<201, types.TimeOffResponse>> {
    return this.core.fetch('/teammates/{teammate_id}/time_offs', 'post', body, metadata);
  }

  /**
   * List the teams (workspaces) in the company.
   *
   * Required scope: `teams:read`
   *
   * @summary List teams
   */
  listTeams(): Promise<FetchResponse<200, types.ListTeamsResponse200>> {
    return this.core.fetch('/teams', 'get');
  }

  /**
   * Fetch a team (workspace).
   *
   * Required scope: `teams:read`
   *
   * @summary Get team
   */
  getTeam(metadata: types.GetTeamMetadataParam): Promise<FetchResponse<200, types.TeamResponse>> {
    return this.core.fetch('/teams/{team_id}', 'get', metadata);
  }

  /**
   * List the channels of a team (workspace).
   *
   * Required scope: `channels:read`
   *
   * @summary List team channels
   */
  listTeamChannels(metadata: types.ListTeamChannelsMetadataParam): Promise<FetchResponse<200, types.ListTeamChannelsResponse200>> {
    return this.core.fetch('/teams/{team_id}/channels', 'get', metadata);
  }

  /**
   * List contact groups belonging to the requested team (workspace).
   *
   * > ⚠️ Deprecated endpoint
   * >
   * > This endpoint has been deprecated. Please use the compatible contact list endpoints
   * instead.
   * > - `GET /teams/{team_id}/contact_lists`.
   *
   *
   * Required scope: `contacts:read`
   *
   * @summary List team groups
   */
  listTeamGroups(metadata: types.ListTeamGroupsMetadataParam): Promise<FetchResponse<200, types.ListTeamGroupsResponse200>> {
    return this.core.fetch('/teams/{team_id}/contact_groups', 'get', metadata);
  }

  /**
   * Create a new contact group for the requested team (workspace).
   *
   * > ⚠️ Deprecated endpoint
   * >
   * > This endpoint has been deprecated. Please use the compatible contact list endpoints
   * instead.
   * > - `POST /teams/{team_id}/contact_lists`.
   *
   *
   * Required scope: `contacts:write`
   *
   * @summary Create team group
   */
  createTeamGroup(body: types.CreateContactList, metadata: types.CreateTeamGroupMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teams/{team_id}/contact_groups', 'post', body, metadata);
  }

  /**
   * List contact lists belonging to the requested team (workspace).
   *
   * Required scope: `contacts:read`
   *
   * @summary List team contact lists
   */
  listTeamContactLists(metadata: types.ListTeamContactListsMetadataParam): Promise<FetchResponse<200, types.ListTeamContactListsResponse200>> {
    return this.core.fetch('/teams/{team_id}/contact_lists', 'get', metadata);
  }

  /**
   * Create a new contact list for the requested team (workspace).
   *
   * Required scope: `contacts:write`
   *
   * @summary Create team contact list
   */
  createTeamContactList(body: types.CreateContactList, metadata: types.CreateTeamContactListMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teams/{team_id}/contact_lists', 'post', body, metadata);
  }

  /**
   * List the contacts of a team (workspace).
   *
   * Required scope: `contacts:read`
   *
   * @summary List team contacts
   */
  listTeamContacts(metadata: types.ListTeamContactsMetadataParam): Promise<FetchResponse<200, types.ListTeamContactsResponse200>> {
    return this.core.fetch('/teams/{team_id}/contacts', 'get', metadata);
  }

  /**
   * Create a contact for a team (workspace).
   *
   * Required scope: `contacts:write`
   *
   * @summary Create team contact
   */
  createTeamContact(body: types.CreateContact, metadata: types.CreateTeamContactMetadataParam): Promise<FetchResponse<201, types.ContactResponse>> {
    return this.core.fetch('/teams/{team_id}/contacts', 'post', body, metadata);
  }

  /**
   * List the inboxes belonging to a team (workspace).
   *
   * Required scope: `inboxes:read`
   *
   * @summary List team inboxes
   */
  listTeamInboxes(metadata: types.ListTeamInboxesMetadataParam): Promise<FetchResponse<200, types.ListTeamInboxesResponse200>> {
    return this.core.fetch('/teams/{team_id}/inboxes', 'get', metadata);
  }

  /**
   * Create an inbox for a team (workspace).
   *
   * Required scope: `inboxes:write`
   *
   * @summary Create team inbox
   */
  createTeamInbox(body: types.CreateTeamInbox, metadata: types.CreateTeamInboxMetadataParam): Promise<FetchResponse<201, types.InboxResponse>> {
    return this.core.fetch('/teams/{team_id}/inboxes', 'post', body, metadata);
  }

  /**
   * List the message template folders belonging to the requested team (workspace).
   *
   * Required scope: `message_templates:read`
   *
   * @summary List team folders
   */
  listTeamFolders(metadata: types.ListTeamFoldersMetadataParam): Promise<FetchResponse<200, types.ListTeamFoldersResponse200>> {
    return this.core.fetch('/teams/{team_id}/message_template_folders', 'get', metadata);
  }

  /**
   * Create a new message template folder belonging to the requested team (workspace).
   *
   * Required scope: `message_templates:write`
   *
   * @summary Create team folder
   */
  createTeamFolder(body: types.CreateMessageTemplateFolder, metadata: types.CreateTeamFolderMetadataParam): Promise<FetchResponse<201, types.MessageTemplateFolderResponse>> {
    return this.core.fetch('/teams/{team_id}/message_template_folders', 'post', body, metadata);
  }

  /**
   * List the message templates belonging to the requested team (workspace).
   *
   * Required scope: `message_templates:read`
   *
   * @summary List team message templates
   */
  listTeamMessageTemplates(metadata: types.ListTeamMessageTemplatesMetadataParam): Promise<FetchResponse<200, types.ListTeamMessageTemplatesResponse200>> {
    return this.core.fetch('/teams/{team_id}/message_templates', 'get', metadata);
  }

  /**
   * Create a new message template for the given team (workspace).
   *
   * Required scope: `message_templates:write`
   *
   * @summary Create team message template
   */
  createTeamMessageTemplate(body: types.CreateSharedMessageTemplate, metadata: types.CreateTeamMessageTemplateMetadataParam): Promise<FetchResponse<201, types.MessageTemplateResponse>> {
    return this.core.fetch('/teams/{team_id}/message_templates', 'post', body, metadata);
  }

  /**
   * List the rules of a team (workspace).
   *
   * Required scope: `rules:read`
   *
   * @summary List team rules
   */
  listTeamRules(metadata: types.ListTeamRulesMetadataParam): Promise<FetchResponse<200, types.ListTeamRulesResponse200>> {
    return this.core.fetch('/teams/{team_id}/rules', 'get', metadata);
  }

  /**
   * List the shifts for a team (workspace).
   *
   * Required scope: `shifts:read`
   *
   * @summary List team Shifts
   */
  listTeamShifts(metadata: types.ListTeamShiftsMetadataParam): Promise<FetchResponse<200, types.ListTeamShiftsResponse200>> {
    return this.core.fetch('/teams/{team_id}/shifts', 'get', metadata);
  }

  /**
   * Create a shift for a team (workspace).
   *
   * Required scope: `shifts:write`
   *
   * @summary Create team shift
   */
  createTeamShift(body: types.CreateShift, metadata: types.CreateTeamShiftMetadataParam): Promise<FetchResponse<201, types.ShiftResponse>> {
    return this.core.fetch('/teams/{team_id}/shifts', 'post', body, metadata);
  }

  /**
   * List the signatures belonging to the given team (workspace).
   *
   * Required scope: `signatures:read`
   *
   * @summary List team signatures
   */
  listTeamSignatures(metadata: types.ListTeamSignaturesMetadataParam): Promise<FetchResponse<200, types.ListTeamSignaturesResponse200>> {
    return this.core.fetch('/teams/{team_id}/signatures', 'get', metadata);
  }

  /**
   * Create a new signature for the given team (workspace).
   *
   * Required scope: `signatures:write`
   *
   * @summary Create team signature
   */
  createTeamSignature(body: types.CreateSharedSignature, metadata: types.CreateTeamSignatureMetadataParam): Promise<FetchResponse<201, types.SignatureResponse>> {
    return this.core.fetch('/teams/{team_id}/signatures', 'post', body, metadata);
  }

  /**
   * List the tags for a team (workspace).
   *
   * Required scope: `tags:read`
   *
   * @summary List team tags
   */
  listTeamTags(metadata: types.ListTeamTagsMetadataParam): Promise<FetchResponse<200, types.ListTeamTagsResponse200>> {
    return this.core.fetch('/teams/{team_id}/tags', 'get', metadata);
  }

  /**
   * Create a tag for a team (workspace).
   *
   * Required scope: `tags:write`
   *
   * @summary Create team tag
   */
  createTeamTag(body: types.CreateTag, metadata: types.CreateTeamTagMetadataParam): Promise<FetchResponse<201, types.TagResponse>> {
    return this.core.fetch('/teams/{team_id}/tags', 'post', body, metadata);
  }

  /**
   * Add one or more teammates to a team (workspace).
   *
   * Required scope: `teams:write`
   *
   * @summary Add teammates to team
   */
  addTeammatesToTeam(body: types.TeammateIds, metadata: types.AddTeammatesToTeamMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teams/{team_id}/teammates', 'post', body, metadata);
  }

  /**
   * Remove one or more teammates from a team (workspace).
   *
   * Required scope: `teams:write`
   *
   * @summary Remove teammates from team
   */
  removeTeammatesFromTeam(body: types.TeammateIds, metadata: types.RemoveTeammatesFromTeamMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/teams/{team_id}/teammates', 'delete', body, metadata);
  }

  /**
   * List the time offs of all teammates in a team.
   *
   * Required scope: `time_off:read`
   *
   * @summary List team time offs
   */
  listTeamTimeOffs(metadata: types.ListTeamTimeOffsMetadataParam): Promise<FetchResponse<200, types.ListTeamTimeOffsResponse200>> {
    return this.core.fetch('/teams/{team_id}/time_offs', 'get', metadata);
  }

  /**
   * List the views of a team.
   *
   * Required scope: `views:read`
   *
   * @summary List team views
   */
  listTeamViews(metadata: types.ListTeamViewsMetadataParam): Promise<FetchResponse<200, types.ListTeamViewsResponse200>> {
    return this.core.fetch('/teams/{team_id}/views', 'get', metadata);
  }

  /**
   * Create a new view for a team.
   *
   * Required scope: `views:write`
   *
   * @summary Create team view
   */
  createTeamView(body: types.CreateView, metadata: types.CreateTeamViewMetadataParam): Promise<FetchResponse<201, types.SharedViewResponse>> {
    return this.core.fetch('/teams/{team_id}/views', 'post', body, metadata);
  }

  /**
   * Fetch a time off.
   *
   * Required scope: `time_off:read`
   *
   * @summary Get time off
   */
  getTimeOff(metadata: types.GetTimeOffMetadataParam): Promise<FetchResponse<200, types.TimeOffResponse>> {
    return this.core.fetch('/time_offs/{time_off_id}', 'get', metadata);
  }

  /**
   * Update a time off.
   *
   * Required scope: `time_off:write`
   *
   * @summary Update time off
   */
  updateTimeOff(body: types.UpdateTimeOff, metadata: types.UpdateTimeOffMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/time_offs/{time_off_id}', 'patch', body, metadata);
  }

  /**
   * Delete a time off.
   *
   * Required scope: `time_off:delete`
   *
   * @summary Delete time off
   */
  deleteTimeOff(metadata: types.DeleteTimeOffMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/time_offs/{time_off_id}', 'delete', metadata);
  }

  /**
   * List the views accessible to the authenticated token.
   *
   * Required scope: `views:read`
   *
   * @summary List views
   */
  listViews(metadata?: types.ListViewsMetadataParam): Promise<FetchResponse<200, types.ListViewsResponse200>> {
    return this.core.fetch('/views', 'get', metadata);
  }

  /**
   * Fetch a view.
   *
   * Required scope: `views:read`
   *
   * @summary Get view
   */
  getView(metadata: types.GetViewMetadataParam): Promise<FetchResponse<200, types.SharedViewResponse>> {
    return this.core.fetch('/views/{view_id}', 'get', metadata);
  }

  /**
   * Update a view.
   *
   * Required scope: `views:write`
   *
   * @summary Update view
   */
  updateView(body: types.UpdateView, metadata: types.UpdateViewMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateView(metadata: types.UpdateViewMetadataParam): Promise<FetchResponse<number, unknown>>;
  updateView(body?: types.UpdateView | types.UpdateViewMetadataParam, metadata?: types.UpdateViewMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/views/{view_id}', 'patch', body, metadata);
  }

  /**
   * Makes this view visible in specified teammates' sidebar navigation.
   *
   * Required scope: `views:write`
   *
   * @summary Add view to teammate sidebars
   */
  addViewTeammates(body: types.AddViewTeammatesBodyParam, metadata: types.AddViewTeammatesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/views/{view_id}/teammates', 'post', body, metadata);
  }
}
