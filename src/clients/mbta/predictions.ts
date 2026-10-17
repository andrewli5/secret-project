import { mbtaClient } from './createMbtaClient';

export type MbtaPrediction = {
  attributes: {
    arrival_time: string | null;
    direction_id: number;
  };
  relationships: {
    trip: { data: { id: string } };
  };
};

export type TripTime = { time: string; tripId: string };

type PredictionsResponse = { data: MbtaPrediction[] };

export async function getArrivalPredictions(args: {
  stopId: string;
  directionId: number;
  routeId?: string;
}): Promise<TripTime[]> {
  const { stopId, directionId, routeId } = args;

  const params: Record<string, string | number> = {
    'filter[stop]': stopId,
    'filter[direction_id]': directionId,
    'page[limit]': 10,
    sort: 'arrival_time',
  };
  if (routeId) {
    params['filter[route]'] = routeId;
  }

  const json = await mbtaClient.getJson<PredictionsResponse>('/predictions', params);

  // Past arrivals are kept so their trips still hide the matching scheduled departures;
  // the display filters them out by time.
  const times: TripTime[] = [];
  for (const p of json.data) {
    const arrival = p.attributes.arrival_time;
    if (arrival) {
      times.push({ time: arrival, tripId: p.relationships.trip.data.id });
    }
  }
  return times;
}
