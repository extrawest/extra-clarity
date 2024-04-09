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
  if (filterValue && !filterValue.presetId) {
    return { ...filterValue.custom };
  }

  const selectedPresetId =
    filterValue?.presetId ??
    getDefaultPreset(presets)?.id ??
    null;

  if (selectedPresetId === null) {
    return ALL_TIME;
  }

  const timeRangeFn = presets.find(preset => preset.id === selectedPresetId)?.timeRangeFn;

  return typeof timeRangeFn === 'function'
    ? timeRangeFn()
    : ALL_TIME;
}
