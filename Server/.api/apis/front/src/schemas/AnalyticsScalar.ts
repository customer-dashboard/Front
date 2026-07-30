import AnalyticsMetricId from './AnalyticsMetricId.js';
import AnalyticsScalarType from './AnalyticsScalarType.js';
import AnalyticsScalarValue from './AnalyticsScalarValue.js';

const AnalyticsScalar = {
  "type": "object",
  "required": [
    "id",
    "type",
    "value"
  ],
  "properties": {
    "id": AnalyticsMetricId,
    "type": AnalyticsScalarType,
    "value": AnalyticsScalarValue
  },
  "title": "AnalyticsScalar",
  "x-readme-ref-name": "AnalyticsScalar"
} as const;
export default AnalyticsScalar
