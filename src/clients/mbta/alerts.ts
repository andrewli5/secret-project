import { mbtaClient } from './createMbtaClient';

export type MbtaAlert = {
  attributes: {
    effect: string;
    header: string;
    active_period: { start: string; end: string }[];
  };
};

type AlertsResponse = { data: MbtaAlert[] };

export async function getShuttleAlert(args: {
  stopId: string;
  routeId: string;
}): Promise<string | null> {
  const { stopId, routeId } = args;

  const json = await mbtaClient.getJson<AlertsResponse>('/alerts', {
    'filter[stop]': stopId,
    'filter[route]': routeId,
    'filter[activity]': 'BOARD,EXIT,RIDE',
  });

  const now = new Date();
  const shuttleAlert = json.data.find(
    (a) =>
      a.attributes.effect === 'SHUTTLE' &&
      a.attributes.active_period.some((p) => new Date(p.start) <= now && now <= new Date(p.end)),
  );

  return shuttleAlert?.attributes.header ?? null;
}
