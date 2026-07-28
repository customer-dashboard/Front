import AccountIds from './AccountIds.js';
import ChannelIds from './ChannelIds.js';
import InboxIds from './InboxIds.js';
import TagIds from './TagIds.js';
import TeamIds from './TeamIds.js';
import TeammateIds from './TeammateIds.js';

const AnalyticsFilters = {
  "description": "Resources to compute the analytics for. Defaults to all.",
  "anyOf": [
    TagIds,
    TeammateIds,
    ChannelIds,
    InboxIds,
    TeamIds,
    AccountIds
  ],
  "title": "AnalyticsFilters",
  "x-readme-ref-name": "AnalyticsFilters"
} as const;
export default AnalyticsFilters
