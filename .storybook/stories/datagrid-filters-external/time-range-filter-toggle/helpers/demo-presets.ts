import {
  TIME_RANGE_PRESETS,
  type TimeRangePreset,
} from '../../../../../projects/extra-clarity/datagrid-filters';

export const demoPresets: TimeRangePreset[] = [
  {
    ...TIME_RANGE_PRESETS.PastHour,
    default: true,
  },
  TIME_RANGE_PRESETS.Past24Hours,
  TIME_RANGE_PRESETS.Today,
  TIME_RANGE_PRESETS.Yesterday,
  TIME_RANGE_PRESETS.AllTime,
];
