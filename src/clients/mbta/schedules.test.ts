import { describe, expect, it } from 'vitest';
import { pickNextThreeDepartures, type MbtaSchedule } from './schedules';

const sched = (departure_time: string | null): MbtaSchedule => ({
  attributes: { departure_time, direction_id: 1 },
});

describe('pickNextThreeDepartures', () => {
  const now = new Date('2026-06-27T12:00:00-04:00').getTime();

  it('skips past departures and returns at most the next three upcoming', () => {
    const schedules = [
      sched('2026-06-27T06:24:00-04:00'),
      sched('2026-06-27T12:00:00-04:00'),
      sched('2026-06-27T12:30:00-04:00'),
      sched('2026-06-27T13:30:00-04:00'),
      sched('2026-06-27T14:30:00-04:00'),
    ];
    expect(pickNextThreeDepartures(schedules, now)).toEqual([
      '2026-06-27T12:30:00-04:00',
      '2026-06-27T13:30:00-04:00',
      '2026-06-27T14:30:00-04:00',
    ]);
  });
});
