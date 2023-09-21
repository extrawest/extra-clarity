import { EcFilterState, EcTimeRangeFilterValue } from '@extrawest/extra-clarity/datagrid-filters';

export interface EcTimeRangeFilterToggleState {
  isActive: boolean;
  state: EcFilterState<EcTimeRangeFilterValue>;
}
