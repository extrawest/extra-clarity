import { EcCustomTimeRange } from './custom-time-range.interface';

export interface EcTimeRangePreset {
  label: string;
  timeRangeFn: () => EcCustomTimeRange;
  default?: true;
}
