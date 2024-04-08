import { EcCustomTimeRange } from './custom-time-range.interface';

export interface EcTimeRangeFilterValue {
  preset: string | null;
  label: string | null;
  custom: EcCustomTimeRange;
}
