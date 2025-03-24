import {
  type EcTimeRangePreset,
  TIME_RANGE_PRESETS,
} from '@extrawest/extra-clarity/datagrid-filters';

export const demoPresets: EcTimeRangePreset[] = [
  {
    ...TIME_RANGE_PRESETS.PastHour,
    default: true,
  },
  TIME_RANGE_PRESETS.Past24Hours,
  TIME_RANGE_PRESETS.Today,
  TIME_RANGE_PRESETS.Yesterday,
  TIME_RANGE_PRESETS.AllTime,
];
