import { createMbtaClient } from './createMbtaClient';

export type MbtaStop = {
  attributes: {
    name: string;
  };
};

type StopsResponse = { data: MbtaStop };

const mbta = createMbtaClient();

export async function getStopData(args: { stopId: string }) {
  const { stopId } = args;

  const json = await mbta.getJson<StopsResponse>(`/stops/${stopId}`);
  return json.data.attributes;
}
