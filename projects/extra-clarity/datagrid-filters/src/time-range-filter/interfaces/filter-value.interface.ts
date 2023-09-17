import { CustomTimeRange } from './custom-time-range.interface';

export interface TimeRangeFilterValue {
  preset: string | null;
  custom: CustomTimeRange;
}
