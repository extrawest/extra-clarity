import { FilterState, TimeRangeFilterValue } from '@extrawest/extra-clarity/datagrid-filters';

export interface TimeRangeFilterToggleState {
  isActive: boolean;
  state: FilterState<TimeRangeFilterValue>;
}
