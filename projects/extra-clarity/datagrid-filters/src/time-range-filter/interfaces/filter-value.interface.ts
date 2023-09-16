import { CustomTimeRange } from './custom-time-range.interface';

export interface FilterValue {
  preset: string | null;
  custom: CustomTimeRange;
}
