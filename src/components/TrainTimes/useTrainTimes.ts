import { getShuttleAlert } from '@/clients/mbta/alerts';
import { getNextThreeArrivalTimes } from '@/clients/mbta/predictions';
import { getRouteData } from '@/clients/mbta/routes';
import { getNextThreeScheduledDepartures } from '@/clients/mbta/schedules';
import { getStopData } from '@/clients/mbta/stops';
import { usePolledData } from '@/hooks/usePolledData';
import { useCallback } from 'react';

const LIVE_REFRESH_MS = 10 * 1000;
const SCHEDULE_REFRESH_MS = 5 * 60 * 1000;

type Args = {
  stopId: string;
  directionIds: number[];
  routeId: string;
};

function indexByDirectionId<T>(directionIds: number[], values: T[]): Record<number, T> {
  return Object.fromEntries(directionIds.map((directionId, index) => [directionId, values[index]]));
}

export function useTrainTimes({ stopId, directionIds, routeId }: Args) {
  const fetchStatic = useCallback(async () => {
    const [stop, route] = await Promise.all([getStopData({ stopId }), getRouteData({ routeId })]);
    return { stop, route };
  }, [stopId, routeId]);

  const fetchLive = useCallback(async () => {
    const [arrivalLists, shuttleAlert] = await Promise.all([
      Promise.all(
        directionIds.map((directionId) =>
          getNextThreeArrivalTimes({ stopId, directionId, routeId }),
        ),
      ),
      getShuttleAlert({ stopId, routeId }),
    ]);

    return { arrivals: indexByDirectionId(directionIds, arrivalLists), shuttleAlert };
  }, [stopId, directionIds, routeId]);

  const fetchSchedules = useCallback(async () => {
    const departures = await Promise.all(
      directionIds.map((directionId) =>
        getNextThreeScheduledDepartures({ stopId, directionId, routeId }),
      ),
    );

    return { scheduled: indexByDirectionId(directionIds, departures) };
  }, [stopId, directionIds, routeId]);

  const { data: staticData, error: staticError } = usePolledData(fetchStatic);
  const { data: liveData, error: liveError } = usePolledData(fetchLive, LIVE_REFRESH_MS);
  const { data: scheduleData, error: scheduleError } = usePolledData(
    fetchSchedules,
    SCHEDULE_REFRESH_MS,
  );

  return {
    stop: staticData?.stop,
    route: staticData?.route,
    arrivals: liveData?.arrivals,
    scheduled: scheduleData?.scheduled,
    shuttleAlert: liveData?.shuttleAlert ?? null,
    error: staticError ?? liveError ?? scheduleError,
  };
}
