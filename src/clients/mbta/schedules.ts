import { mbtaClient } from './createMbtaClient';
import type { TripTime } from './predictions';

export type MbtaSchedule = {
  attributes: {
    departure_time: string | null;
    direction_id: number;
  };
  relationships: {
    trip: { data: { id: string } };
  };
};

type SchedulesResponse = { data: MbtaSchedule[] };

export function pickUpcomingDepartures(schedules: MbtaSchedule[], now = Date.now()): TripTime[] {
  const upcoming: TripTime[] = [];
  for (const s of schedules) {
    const departure = s.attributes.departure_time;
    if (!departure || new Date(departure).getTime() <= now) {
      continue;
    }
    upcoming.push({ time: departure, tripId: s.relationships.trip.data.id });
  }
  return upcoming;
}

export async function getScheduledDepartures(args: {
  stopId: string;
  directionId: number;
  routeId: string;
}): Promise<TripTime[]> {
  const { stopId, directionId, routeId } = args;

  const json = await mbtaClient.getJson<SchedulesResponse>('/schedules', {
    'filter[stop]': stopId,
    'filter[direction_id]': directionId,
    'filter[route]': routeId,
    sort: 'departure_time',
    'page[limit]': 200,
  });

  // /schedules returns the whole service day; filter[min_time] is local-time only,
  // so drop past departures client-side instead. Not capped at three: some of these
  // are hidden later as duplicates of live predictions or of each other.
  return pickUpcomingDepartures(json.data);
}
