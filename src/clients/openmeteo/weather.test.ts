import { describe, expect, it } from 'vitest';
import { adjustWeatherCode } from './weather';

const RAIN = 61;
const OVERCAST = 3;
const PARTLY_CLOUDY = 2;
const CLEAR = 0;
const FOUR_HOURS_SECONDS = 4 * 3600;

describe('adjustWeatherCode', () => {
  it('upgrades a dry code to rain when precipitation probability is high', () => {
    expect(adjustWeatherCode(CLEAR, 80)).toBe(RAIN);
  });

  it('keeps a dry code when precipitation probability is low', () => {
    expect(adjustWeatherCode(CLEAR, 10)).toBe(CLEAR);
  });

  it('downgrades overcast to partly cloudy with enough sunshine', () => {
    expect(adjustWeatherCode(OVERCAST, 0, FOUR_HOURS_SECONDS + 1)).toBe(PARTLY_CLOUDY);
  });

  it('keeps overcast when sunshine is below the threshold', () => {
    expect(adjustWeatherCode(OVERCAST, 0, 3600)).toBe(OVERCAST);
  });

  it('leaves an actual precipitation code untouched', () => {
    expect(adjustWeatherCode(RAIN, 90)).toBe(RAIN);
  });
});
