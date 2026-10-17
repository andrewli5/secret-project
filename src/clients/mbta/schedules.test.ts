import { describe, expect, it } from 'vitest';
import { pickUpcomingDepartures, type MbtaSchedule } from './schedules';

const sched = (departure_time: string | null): MbtaSchedule => ({
  attributes: { departure_time, direction_id: 1 },
  relationships: { trip: { data: { id: `trip-${departure_time}` } } },
});

describe('pickUpcomingDepartures', () => {
  const now = new Date('2026-06-27T12:00:00-04:00').getTime();

  it('skips past departures and keeps each upcoming trip', () => {
    const schedules = [
      sched('2026-06-27T06:24:00-04:00'),
      sched('2026-06-27T12:00:00-04:00'),
      sched('2026-06-27T12:30:00-04:00'),
      sched('2026-06-27T13:30:00-04:00'),
      sched('2026-06-27T14:30:00-04:00'),
    ];
    expect(pickUpcomingDepartures(schedules, now).map(({ time }) => time)).toEqual([
      '2026-06-27T12:30:00-04:00',
      '2026-06-27T13:30:00-04:00',
      '2026-06-27T14:30:00-04:00',
    ]);
  });
});
