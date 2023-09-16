import { TimeRangePreset } from '../interfaces';

export function getDefaultPreset(presets: TimeRangePreset[]): TimeRangePreset | null {
  let defaultPreset: TimeRangePreset | null = null;
  for (const preset of presets) {
    if (!preset.default) {
      continue;
    }
    if (defaultPreset) {
      // multiple defaults are not allowed
      return null;
    }
    defaultPreset = preset;
  }
  return defaultPreset;
}
