import { mbtaClient } from './createMbtaClient';

export type MbtaSchedule = {
  attributes: {
    departure_time: string | null;
    direction_id: number;
  };
};

type SchedulesResponse = { data: MbtaSchedule[] };

export function pickNextThreeDepartures(schedules: MbtaSchedule[], now = Date.now()): string[] {
  const upcoming: string[] = [];
  for (const s of schedules) {
    const departure = s.attributes.departure_time;
    if (!departure || new Date(departure).getTime() <= now) {
      continue;
    }
    upcoming.push(departure);
    if (upcoming.length >= 3) {
      break;
    }
  }
  return upcoming;
}

export async function getNextThreeScheduledDepartures(args: {
  stopId: string;
  directionId: number;
  routeId: string;
}): Promise<string[]> {
  const { stopId, directionId, routeId } = args;

  const json = await mbtaClient.getJson<SchedulesResponse>('/schedules', {
    'filter[stop]': stopId,
    'filter[direction_id]': directionId,
    'filter[route]': routeId,
    sort: 'departure_time',
    'page[limit]': 200,
  });

  // /schedules returns the whole service day; filter[min_time] is local-time only,
  // so drop past departures client-side instead.
  return pickNextThreeDepartures(json.data);
}
