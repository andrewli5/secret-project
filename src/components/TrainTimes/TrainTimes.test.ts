import { describe, expect, it } from 'vitest';
import { liveCountdownDisplay, remainingSeconds } from './TrainTimes';

describe('liveCountdownDisplay', () => {
  it('switches format at the 10-minute boundary', () => {
    expect(liveCountdownDisplay(599)).toEqual({
      mins: '9',
      minsUnit: 'm',
      secs: '59',
      secsUnit: 's',
    });
    expect(liveCountdownDisplay(600)).toEqual({ mins: '10', minsUnit: 'min' });
  });
});

describe('remainingSeconds', () => {
  it('ceil-rounds partial seconds until arrival', () => {
    const now = Date.parse('2026-06-27T12:00:00Z');
    expect(remainingSeconds('2026-06-27T12:04:32.500Z', now)).toBe(273);
  });
});
