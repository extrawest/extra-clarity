import { EcCustomTimeRange, EcTimeRangePreset } from '../interfaces';

const MS_IN_ONE_HOUR = 1000 * 60 * 60;
const MS_IN_ONE_DAY = MS_IN_ONE_HOUR * 24;

export const ALL_TIME: Readonly<EcCustomTimeRange> = {
  start: null,
  end: null,
};

export const ALL_TIME_PRESET: Readonly<EcTimeRangePreset> = {
  id: 'allTime',
  label: 'All time',
  timeRangeFn: () => ({
    start: null,
    end: null,
  }),
};

export const PAST_HOUR_PRESET: Readonly<EcTimeRangePreset> = {
  id: 'pastHour',
  label: 'Past hour',
  timeRangeFn: () => ({
    start: new Date().getTime() - MS_IN_ONE_HOUR,
    end: null,
  }),
};

export const PAST_24_HOURS_PRESET: Readonly<EcTimeRangePreset> = {
  id: 'past24h',
  label: 'Past 24 hours',
  timeRangeFn: () => ({
    start: new Date().getTime() - MS_IN_ONE_DAY,
    end: null,
  }),
};

export const PAST_7_DAYS_PRESET: Readonly<EcTimeRangePreset> = {
  id: 'past7d',
  label: 'Past 7 days',
  timeRangeFn: () => ({
    start: new Date().getTime() - MS_IN_ONE_DAY * 7,
    end: null,
  }),
};

export const PAST_28_DAYS_PRESET: Readonly<EcTimeRangePreset> = {
  id: 'past28d',
  label: 'Past 28 days',
  timeRangeFn: () => ({
    start: new Date().getTime() - MS_IN_ONE_DAY * 28,
    end: null,
  }),
};

export const TODAY_PRESET: Readonly<EcTimeRangePreset> = {
  id: 'today',
  label: 'Today',
  timeRangeFn: () => ({
    start: new Date().setHours(0, 0, 0, 0),
    end: null,
  }),
};

export const YESTERDAY_PRESET: Readonly<EcTimeRangePreset> = {
  id: 'yesterday',
  label: 'Yesterday',
  timeRangeFn: () => {
    const todayStart = new Date().setHours(0, 0, 0, 0);
    return {
      start: todayStart - MS_IN_ONE_DAY,
      end: todayStart,
    };
  },
};

export const TIME_RANGE_PRESETS = {
  AllTime: ALL_TIME_PRESET,
  PastHour: PAST_HOUR_PRESET,
  Past24Hours: PAST_24_HOURS_PRESET,
  Past7Days: PAST_7_DAYS_PRESET,
  Past28Days: PAST_28_DAYS_PRESET,
  Today: TODAY_PRESET,
  Yesterday: YESTERDAY_PRESET,
} as const;
