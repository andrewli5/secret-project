import { createMbtaClient } from './createMbtaClient';

export type MbtaRoute = {
  attributes: {
    direction_destinations: string[];
    direction_names: string[];
    color: string;
    long_name: string;
    short_name: string;
    text_color: string;
  };
};

type RoutesResponse = { data: MbtaRoute };

const mbta = createMbtaClient();

export async function getRouteData(args: { routeId: string }) {
  const { routeId } = args;
  const json = await mbta.getJson<RoutesResponse>(`/routes/${routeId}`);
  return json.data.attributes;
}
