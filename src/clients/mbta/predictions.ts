import { mbtaClient } from './createMbtaClient';

export type MbtaPrediction = {
  attributes: {
    arrival_time: string | null;
    direction_id: number;
  };
};

type PredictionsResponse = { data: MbtaPrediction[] };

export async function getNextThreeArrivalTimes(args: {
  stopId: string;
  directionId: number;
  routeId?: string;
}) {
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

  const seenArrivalTimes = new Set<string>();
  const times: string[] = [];

  for (const p of json.data) {
    const arrival = p.attributes.arrival_time;
    if (!arrival || seenArrivalTimes.has(arrival)) {
      continue;
    }
    seenArrivalTimes.add(arrival);
    if (new Date(arrival).getTime() > Date.now()) {
      times.push(arrival);
    }
    if (times.length >= 3) {
      break;
    }
  }

  return times;
}
