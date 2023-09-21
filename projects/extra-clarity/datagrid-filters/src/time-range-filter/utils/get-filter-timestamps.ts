import { ALL_TIME } from '../constants';
import {
  EcCustomTimeRange,
  EcTimeRangePreset,
  EcTimeRangeFilterValue as FilterValue,
} from '../interfaces';

import { getDefaultPreset } from './get-default-preset';

export function getFilterTimestamps(
  filterValue: FilterValue | undefined,
  presets: EcTimeRangePreset[],
): EcCustomTimeRange {
  if (filterValue && !filterValue.preset) {
    return { ...filterValue.custom };
  }

  const selectedPreset =
    filterValue?.preset ??
    getDefaultPreset(presets)?.label ??
    null;

  if (selectedPreset === null) {
    return ALL_TIME;
  }

  const timeRangeFn = presets.find(preset => preset.label === selectedPreset)?.timeRangeFn;

  return typeof timeRangeFn === 'function'
    ? timeRangeFn()
    : ALL_TIME;
}
