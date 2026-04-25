import { mbtaClient } from './createMbtaClient';

export type MbtaStop = {
  attributes: {
    name: string;
  };
};

type StopsResponse = { data: MbtaStop };

export async function getStopData(args: { stopId: string }) {
  const { stopId } = args;

  const json = await mbtaClient.getJson<StopsResponse>(`/stops/${stopId}`);
  return json.data.attributes;
}
