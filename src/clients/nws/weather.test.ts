import { describe, expect, it } from 'vitest';
import {
  adjustWeatherCode,
  gridWeatherToWmoCode,
  parseDurationMs,
  resolveWmoCode,
  valueAt,
} from './weather';

describe('parseDurationMs', () => {
  it('parses ISO-8601 durations used by NWS validTime windows', () => {
    expect(parseDurationMs('PT6H')).toBe(6 * 3600_000);
    expect(parseDurationMs('P1DT6H')).toBe(30 * 3600_000);
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

  it('matches end-exclusive window boundaries', () => {
    expect(valueAt(series, t('2026-06-27T06:00:00+00:00'))).toBe('b');
    expect(valueAt(series, t('2026-06-27T11:59:59+00:00'))).toBe('b');
    expect(valueAt(series, t('2026-06-27T12:00:00+00:00'))).toBe('c');
  });
});

describe('gridWeatherToWmoCode', () => {
  it('maps mis-routed enums and escalates by intensity', () => {
    expect(gridWeatherToWmoCode([{ weather: 'hail', intensity: 'moderate' }])).toBe(89);
    expect(gridWeatherToWmoCode([{ weather: 'rain', intensity: 'heavy' }])).toBe(65);
    expect(gridWeatherToWmoCode([{ weather: 'rain', intensity: 'light' }])).toBe(61);
  });
});

describe('resolveWmoCode', () => {
  it('prefers precip weather over sky cover', () => {
    expect(resolveWmoCode([{ weather: 'rain', intensity: 'moderate' }], 95)).toBe(63);
  });
});

describe('adjustWeatherCode', () => {
  it('upgrades clear sky to rain when PoP is high', () => {
    expect(adjustWeatherCode(0, 80)).toBe(61);
  });
});
