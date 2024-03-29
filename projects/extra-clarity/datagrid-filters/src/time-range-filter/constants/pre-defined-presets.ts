import { EcTimeRangePresetLabel as PresetLabel } from '../enums';
import { EcCustomTimeRange, EcTimeRangePreset } from '../interfaces';

const MS_IN_ONE_HOUR = 1000 * 60 * 60;
const MS_IN_ONE_DAY = MS_IN_ONE_HOUR * 24;

export const ALL_TIME: Readonly<EcCustomTimeRange> = { start: null, end: null };

export const TIME_RANGE_FN: Readonly<Record<PresetLabel, () => EcCustomTimeRange>> = {
  [PresetLabel.AllTime]: timeRangeFnAllTime,
  [PresetLabel.PastHour]: timeRangeFnPastHour,
  [PresetLabel.Past24Hours]: timeRangeFnPast24Hours,
  [PresetLabel.Past7Days]: timeRangeFnPast7Days,
  [PresetLabel.Past28Days]: timeRangeFnPast28Days,
  [PresetLabel.Today]: timeRangeFnToday,
  [PresetLabel.Yesterday]: timeRangeFnYesterday,
};

export const TIME_RANGE_PRESETS = {
  AllTime: getPresetByLabel(PresetLabel.AllTime),
  PastHour: getPresetByLabel(PresetLabel.PastHour),
  Past24Hours: getPresetByLabel(PresetLabel.Past24Hours),
  Past7Days: getPresetByLabel(PresetLabel.Past7Days),
  Past28Days: getPresetByLabel(PresetLabel.Past28Days),
  Today: getPresetByLabel(PresetLabel.Today),
  Yesterday: getPresetByLabel(PresetLabel.Yesterday),
} as const;

export function getPresetByLabel(label: PresetLabel): EcTimeRangePreset {
  return {
    label,
    timeRangeFn: TIME_RANGE_FN[label],
  };
}

export function timeRangeFnAllTime(): EcCustomTimeRange {
  return {
    start: null,
    end: null,
  };
}

export function timeRangeFnPastHour(): EcCustomTimeRange {
  return {
    start: new Date().getTime() - MS_IN_ONE_HOUR,
    end: null,
  };
}

function timeRangeFnPast24Hours(): EcCustomTimeRange {
  return {
    start: new Date().getTime() - MS_IN_ONE_DAY,
    end: null,
  };
}

function timeRangeFnPast7Days(): EcCustomTimeRange {
  return {
    start: new Date().getTime() - MS_IN_ONE_DAY * 7,
    end: null,
  };
}

function timeRangeFnPast28Days(): EcCustomTimeRange {
  return {
    start: new Date().getTime() - MS_IN_ONE_DAY * 28,
    end: null,
  };
}

function timeRangeFnToday(): EcCustomTimeRange {
  return {
    start: new Date().setHours(0, 0, 0, 0),
    end: null,
  };
}

function timeRangeFnYesterday(): EcCustomTimeRange {
  const todayStart = new Date().setHours(0, 0, 0, 0);
  return {
    start: todayStart - MS_IN_ONE_DAY,
    end: todayStart,
  };
}
