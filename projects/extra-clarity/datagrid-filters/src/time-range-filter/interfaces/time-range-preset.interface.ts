import { EcCustomTimeRange } from './custom-time-range.interface';

export interface EcTimeRangePreset {
  id: string;
  label: string;
  timeRangeFn: () => EcCustomTimeRange;
  default?: true;
}
