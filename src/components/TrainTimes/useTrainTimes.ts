import { getShuttleAlert } from '@/clients/mbta/alerts';
import { getNextThreeArrivalsInMinutes } from '@/clients/mbta/predictions';
import { getRouteData } from '@/clients/mbta/routes';
import { getStopData } from '@/clients/mbta/stops';
import { usePolledData } from '@/hooks/usePolledData';
import { useCallback } from 'react';

const LIVE_REFRESH_MS = 10 * 1000;

type Args = {
  stopId: string;
  directionIds: number[];
  routeId: string;
};

export function useTrainTimes({ stopId, directionIds, routeId }: Args) {
  const fetchStatic = useCallback(async () => {
    const [stop, route] = await Promise.all([getStopData({ stopId }), getRouteData({ routeId })]);
    return { stop, route };
  }, [stopId, routeId]);

  const fetchLive = useCallback(async () => {
    const [arrivals, shuttleAlert] = await Promise.all([
      Promise.all(
        directionIds.map((directionId) =>
          getNextThreeArrivalsInMinutes({ stopId, directionId, routeId }),
        ),
      ),
      getShuttleAlert({ stopId, routeId }),
    ]);

    const mins: Record<number, number[]> = {};
    directionIds.forEach((directionId, index) => {
      mins[directionId] = arrivals[index];
    });

    return { mins, shuttleAlert };
  }, [stopId, directionIds, routeId]);

  const { data: staticData, error: staticError } = usePolledData(fetchStatic);
  const { data: liveData, error: liveError } = usePolledData(fetchLive, LIVE_REFRESH_MS);

  return {
    stop: staticData?.stop,
    route: staticData?.route,
    mins: liveData?.mins,
    shuttleAlert: liveData?.shuttleAlert ?? null,
    error: staticError ?? liveError,
  };
}
