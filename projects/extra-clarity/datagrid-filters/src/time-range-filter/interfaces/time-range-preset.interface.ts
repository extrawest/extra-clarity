import { EcCustomTimeRange } from './custom-time-range.interface';

export interface EcTimeRangePreset {
  key: string;
  label: string;
  timeRangeFn: () => EcCustomTimeRange;
  default?: true;
}
