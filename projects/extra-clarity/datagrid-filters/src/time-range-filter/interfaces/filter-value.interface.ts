import { EcCustomTimeRange } from './custom-time-range.interface';

export interface EcTimeRangeFilterValue {
  preset: string | null;
  custom: EcCustomTimeRange;
}
