import { describe, expect, it } from 'vitest';
import { getDaylightGradient, getStarVisibility, hourOfDay } from './daylightBackground';

describe('getDaylightGradient', () => {
  it('returns a gradient string', () => {
    expect(getDaylightGradient(new Date('2026-06-28T12:00:00'))).toMatch(/^linear-gradient/);
  });

  it('shifts palette between night and morning', () => {
    const night = getDaylightGradient(new Date('2026-06-28T02:00:00'));
    const morning = getDaylightGradient(new Date('2026-06-28T08:00:00'));
    expect(night).not.toBe(morning);
  });
});

describe('getStarVisibility', () => {
  it('is full at midnight and zero at noon', () => {
    expect(getStarVisibility(new Date('2026-06-28T00:00:00'))).toBe(1);
    expect(getStarVisibility(new Date('2026-06-28T12:00:00'))).toBe(0);
  });

  it('ramps during dusk', () => {
    expect(getStarVisibility(new Date('2026-06-28T19:30:00'))).toBeCloseTo(0.5, 5);
  });
});

describe('hourOfDay', () => {
  it('includes fractional hours', () => {
    expect(hourOfDay(new Date('2026-06-28T08:30:00'))).toBeCloseTo(8.5, 5);
  });
});
