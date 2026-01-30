import { getNextTwoArrivalsInMinutes } from '@/clients/mbta/predictions';
import { getRouteData, MbtaRoute } from '@/clients/mbta/routes';
import { getStopData, MbtaStop } from '@/clients/mbta/stops';
import { Badge, Card, Divider, Group, Paper, Space, Stack, Text, Title } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { WidgetCard } from '../WidgetCard';
import { Figure } from '../Figure';

const REFRESH_MS = 10 * 1000; // 10 seconds

type Props = {
  stopId: string;
  directionIds: number[];
  routeId: string;
};

export function TrainTimes({ stopId, directionIds, routeId }: Props) {
  const [mins, setMins] = useState<Record<number, number[]> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [stop, setStop] = useState<MbtaStop['attributes'] | undefined>(undefined);
  const [route, setRoute] = useState<MbtaRoute['attributes'] | undefined>(undefined);

  const fetchStop = useCallback(async () => {
    const stop = await getStopData({ stopId });
    setStop(stop);
  }, [stopId]);

  const fetchRoute = useCallback(async () => {
    const route = await getRouteData({ routeId });
    setRoute(route);
  }, [routeId]);

  useEffect(() => {
    fetchStop();
    fetchRoute();
  }, []);

  const fetchMins = useCallback(async () => {
    try {
      setError(undefined);
      const nextMinsArray = await Promise.all(
        directionIds.map((directionId) => getNextTwoArrivalsInMinutes({ stopId, directionId })),
      );
      const nextMins: Record<number, number[]> = {};
      directionIds.forEach((directionId, index) => {
        nextMins[directionId] = nextMinsArray[index];
      });
      setMins(nextMins);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [stopId, directionIds]);

  useEffect(() => {
    fetchMins();
    const intervalId = setInterval(fetchMins, REFRESH_MS);
    return () => clearInterval(intervalId);
  }, [fetchMins]);

  const renderMinutesDisplay = (directionId: number) => {
    if (error) {
      return <Text>{error}</Text>;
    }

    if (!mins) {
      return 'Loading...';
    }

    if (mins[directionId].length === 0) {
      return 'No upcoming transit';
    }

    return (
      <Group w="100%" justify="space-evenly">
        {mins[directionId].map((min, index) => (
          <Figure key={index} number={min} unit="min" index={index} />
        ))}
      </Group>
    );
  };

  const renderDirectionLabel = (directionId: number) => (
    <Group gap={8}>
      <Badge ff="system-ui" size="xl" color={`#${route?.color}`} c={`#${route?.text_color}`}>
        {route?.short_name}
      </Badge>
      <Text size="sm">{route?.direction_destinations[directionId]}</Text>
    </Group>
  );

  return (
    <WidgetCard title={stop?.name} bg={`#${route?.color}`} c={`#${route?.text_color}`}>
      <Card.Section p="xs">
        <Stack gap={2}>
          {directionIds.map((directionId, index) => (
            <Stack key={index} gap={1}>
              {renderDirectionLabel(directionId)}
              {renderMinutesDisplay(directionId)}
              {index < directionIds.length - 1 && <Divider mb="sm" />}
            </Stack>
          ))}
        </Stack>
      </Card.Section>
    </WidgetCard>
  );
}
