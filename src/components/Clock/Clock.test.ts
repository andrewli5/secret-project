import { describe, expect, it } from 'vitest';
import { weekDatesFor } from './Clock';

describe('weekDatesFor', () => {
  it('returns Sun-Sat dates for the containing week', () => {
    // Wed Jun 24 2026 -> week runs Sun 21 ... Sat 27.
    expect(weekDatesFor(new Date(2026, 5, 24))).toEqual([21, 22, 23, 24, 25, 26, 27]);
  });

  it('rolls over across a month boundary', () => {
    // Tue Jun 30 2026 -> week runs Sun Jun 28 ... Sat Jul 4.
    expect(weekDatesFor(new Date(2026, 5, 30))).toEqual([28, 29, 30, 1, 2, 3, 4]);
  });
});
