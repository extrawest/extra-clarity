import { ALL_TIME } from '../constants';
import { EcTimeRangePreset } from '../interfaces';

export function containsAllTimePreset(presets: EcTimeRangePreset[]): boolean {
  return presets.some((preset) => {
    const { start, end } = preset.timeRangeFn();
    return start === ALL_TIME.start && end === ALL_TIME.end;
  });
}
