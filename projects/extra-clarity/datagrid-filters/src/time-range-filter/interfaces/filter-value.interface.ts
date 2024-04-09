import { EcCustomTimeRange } from './custom-time-range.interface';

export interface EcTimeRangeFilterValue {
  presetId: string | null;
  custom: EcCustomTimeRange;
}
