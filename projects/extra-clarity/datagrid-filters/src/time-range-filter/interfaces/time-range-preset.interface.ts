import { CustomTimeRange } from './custom-time-range.interface';

export interface TimeRangePreset {
  label: string;
  timeRangeFn: () => CustomTimeRange;
  default?: true;
}
