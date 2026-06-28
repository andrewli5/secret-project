import { describe, expect, it } from 'vitest';
import { weekDatesFor } from './Clock';

describe('weekDatesFor', () => {
  it('rolls over across a month boundary', () => {
    expect(weekDatesFor(new Date(2026, 5, 30))).toEqual([28, 29, 30, 1, 2, 3, 4]);
  });
});
