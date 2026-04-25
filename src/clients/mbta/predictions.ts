import { mbtaClient } from './createMbtaClient';

export type MbtaPrediction = {
  attributes: {
    arrival_time: string | null;
    direction_id: number;
  };
};

type PredictionsResponse = { data: MbtaPrediction[] };

function minutesFromNow(isoTime: string) {
  const ms = new Date(isoTime).getTime() - Date.now();
  return Math.max(0, Math.round(ms / 60000));
}

export async function getNextThreeArrivalsInMinutes(args: {
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
  const times: number[] = [];

  for (const p of json.data) {
    const arrival = p.attributes.arrival_time;
    if (!arrival || seenArrivalTimes.has(arrival)) {
      continue;
    }
    seenArrivalTimes.add(arrival);
    const mins = minutesFromNow(arrival);
    if (mins > 0) {
      times.push(mins);
    }
    if (times.length >= 3) {
      break;
    }
  }

  return times;
}
