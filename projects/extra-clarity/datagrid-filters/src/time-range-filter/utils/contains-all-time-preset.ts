import { ALL_TIME } from '../constants';
import { TimeRangePreset } from '../interfaces';

export function containsAllTimePreset(presets: TimeRangePreset[]): boolean {
  for (const preset of presets) {
    const { start, end } = preset.timeRangeFn();
    if (start === ALL_TIME.start && end === ALL_TIME.end) {
      return true;
    }
  }
  return false;
}
