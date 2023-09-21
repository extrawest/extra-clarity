import { EcTimeRangePreset } from '../interfaces';

export function getDefaultPreset(presets: EcTimeRangePreset[]): EcTimeRangePreset | null {
  let defaultPreset: EcTimeRangePreset | null = null;
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
