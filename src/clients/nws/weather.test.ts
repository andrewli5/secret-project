import { describe, expect, it } from 'vitest';
import { WMO_CODE_TO_TEXT } from '@/assets/weather/weatherText';
import {
  adjustWeatherCode,
  gridWeatherToWmoCode,
  parseDurationMs,
  resolveWmoCode,
  skyCoverToWmoCode,
  valueAt,
} from './weather';

describe('parseDurationMs', () => {
  it('parses hour-only durations', () => {
    expect(parseDurationMs('PT1H')).toBe(3600_000);
    expect(parseDurationMs('PT13H')).toBe(13 * 3600_000);
  });
  it('parses day + hour durations', () => {
    expect(parseDurationMs('P1D')).toBe(24 * 3600_000);
    expect(parseDurationMs('P1DT6H')).toBe(30 * 3600_000);
  });
  it('returns 0 for unparseable input', () => {
    expect(parseDurationMs('garbage')).toBe(0);
  });
});

describe('valueAt', () => {
  const t = (iso: string) => new Date(iso).getTime();
  const series = [
    { validTime: '2026-06-27T00:00:00+00:00/PT6H', value: 'a' },
    { validTime: '2026-06-27T06:00:00+00:00/PT6H', value: 'b' },
    { validTime: '2026-06-27T12:00:00+00:00/PT6H', value: 'c' },
  ];

  it('returns the value whose window contains the instant', () => {
    expect(valueAt(series, t('2026-06-27T07:30:00+00:00'))).toBe('b');
    expect(valueAt(series, t('2026-06-27T12:00:00+00:00'))).toBe('c');
  });
  it('is end-exclusive at the boundary', () => {
    expect(valueAt(series, t('2026-06-27T06:00:00+00:00'))).toBe('b');
  });
  it('falls back to the last window before the instant when in a gap', () => {
    expect(valueAt(series, t('2026-06-28T00:00:00+00:00'))).toBe('c');
  });
  it('falls back to first value when before all windows', () => {
    expect(valueAt(series, t('2026-06-26T00:00:00+00:00'))).toBe('a');
  });
});

describe('gridWeatherToWmoCode', () => {
  const cell = (weather: string | null, intensity: string | null = 'moderate') => [
    { weather, intensity },
  ];

  it('maps base enum values', () => {
    expect(gridWeatherToWmoCode(cell('rain'))).toBe(63);
    expect(gridWeatherToWmoCode(cell('snow'))).toBe(73);
    expect(gridWeatherToWmoCode(cell('thunderstorms'))).toBe(95);
    expect(gridWeatherToWmoCode(cell('fog'))).toBe(45);
    expect(gridWeatherToWmoCode(cell('rain_showers'))).toBe(81);
    expect(gridWeatherToWmoCode(cell('freezing_rain'))).toBe(66);
  });

  it('maps enum values that are easy to mis-route', () => {
    expect(gridWeatherToWmoCode(cell('hail'))).toBe(89);
    expect(gridWeatherToWmoCode(cell('sleet'))).toBe(79);
    expect(gridWeatherToWmoCode(cell('freezing_drizzle'))).toBe(56);
    expect(gridWeatherToWmoCode(cell('freezing_fog'))).toBe(48);
    expect(gridWeatherToWmoCode(cell('frost'))).toBe(48);
    expect(gridWeatherToWmoCode(cell('smoke'))).toBe(4);
    expect(gridWeatherToWmoCode(cell('haze'))).toBe(5);
    expect(gridWeatherToWmoCode(cell('blowing_dust'))).toBe(6);
  });

  it('escalates by intensity consistently across precip types', () => {
    expect(gridWeatherToWmoCode(cell('rain', 'heavy'))).toBe(65);
    expect(gridWeatherToWmoCode(cell('rain', 'light'))).toBe(61);
    expect(gridWeatherToWmoCode(cell('snow', 'heavy'))).toBe(75);
    expect(gridWeatherToWmoCode(cell('snow', 'light'))).toBe(71);
    expect(gridWeatherToWmoCode(cell('drizzle', 'light'))).toBe(51);
    expect(gridWeatherToWmoCode(cell('drizzle', 'heavy'))).toBe(55);
    expect(gridWeatherToWmoCode(cell('rain_showers', 'light'))).toBe(80);
    expect(gridWeatherToWmoCode(cell('rain_showers', 'heavy'))).toBe(82);
    expect(gridWeatherToWmoCode(cell('snow_showers', 'heavy'))).toBe(86);
  });

  it('ignores intensity for codes with no level distinction', () => {
    expect(gridWeatherToWmoCode(cell('thunderstorms', 'heavy'))).toBe(95);
    expect(gridWeatherToWmoCode(cell('hail', 'light'))).toBe(89);
  });

  it('treats null/empty weather as clear (0)', () => {
    expect(gridWeatherToWmoCode(cell(null))).toBe(0);
    expect(gridWeatherToWmoCode([])).toBe(0);
    expect(gridWeatherToWmoCode(null)).toBe(0);
  });

  it('picks the first non-null cell when multiple are present', () => {
    expect(
      gridWeatherToWmoCode([
        { weather: null, intensity: null },
        { weather: 'snow', intensity: 'light' },
      ]),
    ).toBe(71);
  });
});

describe('skyCoverToWmoCode', () => {
  it('maps cloud-cover percent to clear/partly/overcast', () => {
    expect(skyCoverToWmoCode(0)).toBe(0);
    expect(skyCoverToWmoCode(11)).toBe(0);
    expect(skyCoverToWmoCode(20)).toBe(1);
    expect(skyCoverToWmoCode(50)).toBe(2);
    expect(skyCoverToWmoCode(95)).toBe(3);
  });
  it('defaults missing cover to clear', () => {
    expect(skyCoverToWmoCode(null)).toBe(0);
    expect(skyCoverToWmoCode(undefined)).toBe(0);
  });
});

describe('resolveWmoCode', () => {
  const cells = (w: string | null) => [{ weather: w, intensity: 'moderate' }];

  it('uses precip weather when present (overrides sky)', () => {
    expect(resolveWmoCode(cells('rain'), 95)).toBe(63);
  });
  it('falls back to sky cover on a dry day', () => {
    expect(resolveWmoCode(cells(null), 95)).toBe(3);
    expect(resolveWmoCode(cells(null), 50)).toBe(2);
    expect(resolveWmoCode([], 5)).toBe(0);
    expect(resolveWmoCode(null, 95)).toBe(3);
  });
});

describe('emitted codes have text entries', () => {
  const emittable = [
    0, 1, 2, 3, 4, 5, 6, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 79, 80, 81, 82,
    85, 86, 89, 95,
  ];
  it.each(emittable)('code %i is in WMO_CODE_TO_TEXT', (code) => {
    expect(WMO_CODE_TO_TEXT[code]).toBeDefined();
  });
});

describe('adjustWeatherCode', () => {
  it('upgrades a dry code to rain when precipitation is likely', () => {
    expect(adjustWeatherCode(0, 80)).toBe(61);
  });
  it('leaves a dry code alone when precipitation is unlikely', () => {
    expect(adjustWeatherCode(0, 10)).toBe(0);
  });
  it('leaves an actual precipitation code untouched', () => {
    expect(adjustWeatherCode(63, 90)).toBe(63);
  });
});
