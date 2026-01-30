import { createMbtaClient } from './createMbtaClient';

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

const mbta = createMbtaClient();

export async function getNextTwoArrivalsInMinutes(args: { stopId: string; directionId: number }) {
  const { stopId, directionId } = args;

  const json = await mbta.getJson<PredictionsResponse>('/predictions', {
    'filter[stop]': stopId,
    'filter[direction_id]': directionId,
    'page[limit]': 3,
    sort: 'arrival_time',
  });

  const times = json.data
    .map((p) => p.attributes.arrival_time)
    .filter((t): t is string => Boolean(t))
    .map((t) => minutesFromNow(t))
    .filter((mins) => mins > 0)
    .slice(0, 2);

  return times;
}
