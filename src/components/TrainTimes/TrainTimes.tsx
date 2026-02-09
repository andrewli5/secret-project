import { getNextThreeArrivalsInMinutes } from '@/clients/mbta/predictions';
import { getRouteData, MbtaRoute } from '@/clients/mbta/routes';
import { getStopData, MbtaStop } from '@/clients/mbta/stops';
import { Badge, Box, Card, Divider, Group, Stack, Text } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { WidgetCard } from '../WidgetCard';
import { Figure } from '../Figure';
import { LastUpdatedTime } from '../LastUpdatedTime';

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
  const [lastUpdated, setLastUpdated] = useState<Date | undefined>(undefined);

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
        directionIds.map((directionId) => getNextThreeArrivalsInMinutes({ stopId, directionId })),
      );
      const nextMins: Record<number, number[]> = {};
      directionIds.forEach((directionId, index) => {
        nextMins[directionId] = nextMinsArray[index];
      });
      setMins(nextMins);
      setLastUpdated(new Date());
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

    const paddedMins: (number | undefined)[] = [
      mins[directionId]?.[0] ?? undefined,
      mins[directionId]?.[1] ?? undefined,
      mins[directionId]?.[2] ?? undefined,
    ];

    return (
      <Group w="100%" grow>
        {paddedMins.map((min, index) => (
          <Box key={`min-${index}`} ta="center">
            <Figure number={min} unit="min" index={index} size="5rem" my="xl" />
          </Box>
        ))}
      </Group>
    );
  };

  const renderDirectionLabel = (directionId: number) => (
    <Group gap={12} mt="sm">
      <Badge ff="system-ui" size="2rem" color={`#${route?.color}`} c={`#${route?.text_color}`}>
        {route?.short_name}
      </Badge>
      <Text size="2rem">{route?.direction_destinations[directionId]}</Text>
    </Group>
  );

  return (
    <WidgetCard title={stop?.name} titleBg={`#${route?.color}`} c={`#${route?.text_color}`}>
      <Card.Section px="xs" pt="xs">
        <Stack gap={2}>
          {directionIds.map((directionId, index) => (
            <Stack key={index} gap={1}>
              {renderDirectionLabel(directionId)}
              {renderMinutesDisplay(directionId)}
              {index < directionIds.length - 1 && <Divider mb="xs" />}
            </Stack>
          ))}
        </Stack>
      </Card.Section>
      <Card.Section p="xs" pt={1}>
        <LastUpdatedTime time={lastUpdated} seconds />
      </Card.Section>
    </WidgetCard>
  );
}
