import MBTAIcon from '@/assets/mbta/MBTAIcon';
import { getShuttleAlert } from '@/clients/mbta/alerts';
import { getNextThreeArrivalsInMinutes } from '@/clients/mbta/predictions';
import { getRouteData, type MbtaRoute } from '@/clients/mbta/routes';
import { getStopData, type MbtaStop } from '@/clients/mbta/stops';
import { Badge, Box, Card, Divider, Group, Skeleton, Stack, Text, Tooltip } from '@mantine/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BsExclamationTriangleFill } from 'react-icons/bs';
import { WidgetCard } from '../WidgetCard';
import { Figure } from '../Figure';

const REFRESH_MS = 10 * 1000; // 10 seconds

type Props = {
  stopId: string;
  directionIds: number[];
  routeId: string;
};

export function TrainTimes({ stopId, directionIds: directionIdsProp, routeId }: Props) {
  const directionIds = useMemo(() => directionIdsProp, [JSON.stringify(directionIdsProp)]);

  const [mins, setMins] = useState<Record<number, number[]> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [stop, setStop] = useState<MbtaStop['attributes'] | undefined>(undefined);
  const [route, setRoute] = useState<MbtaRoute['attributes'] | undefined>(undefined);
  const [shuttleAlert, setShuttleAlert] = useState<string | null>(null);

  const fetchStop = useCallback(async () => {
    const data = await getStopData({ stopId });
    setStop(data);
  }, [stopId]);

  const fetchRoute = useCallback(async () => {
    const data = await getRouteData({ routeId });
    setRoute(data);
  }, [routeId]);

  useEffect(() => {
    fetchStop();
    fetchRoute();
  }, [fetchStop, fetchRoute]);

  const fetchMins = useCallback(async () => {
    try {
      setError(undefined);
      const [nextMinsArray, alert] = await Promise.all([
        Promise.all(
          directionIds.map((directionId) =>
            getNextThreeArrivalsInMinutes({ stopId, directionId, routeId }),
          ),
        ),
        getShuttleAlert({ stopId, routeId }),
      ]);

      const nextMins: Record<number, number[]> = {};
      for (const [index, directionId] of directionIds.entries()) {
        nextMins[directionId] = nextMinsArray[index];
      }

      setMins(nextMins);
      setShuttleAlert(alert);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [stopId, directionIds, routeId]);

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
      return (
        <Group w="100%" grow my="xl">
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
        </Group>
      );
    }

    const slots = [
      { key: 'next', value: mins[directionId]?.[0] },
      { key: 'second', value: mins[directionId]?.[1] },
      { key: 'third', value: mins[directionId]?.[2] },
    ];

    return (
      <Group w="100%" grow>
        {slots.map(({ key, value }) => (
          <Box key={key} ta="center">
            <Figure number={value} unit="min" size="5rem" my="xl" />
          </Box>
        ))}
      </Group>
    );
  };

  const routeLabel = route?.short_name || route?.long_name;

  const renderDirectionLabel = (directionId: number) => (
    <Group gap={12} mt="sm" wrap="nowrap">
      <Badge
        ff="system-ui"
        size={routeLabel && routeLabel.length > 4 ? 'lg' : '2rem'}
        color={`#${route?.color}`}
        c={`#${route?.text_color}`}
      >
        {routeLabel}
      </Badge>
      <Text size="1.5rem" truncate>
        {route?.direction_destinations[directionId]}
      </Text>
    </Group>
  );

  return (
    <WidgetCard
      title={stop?.name}
      titleBg={`#${route?.color}`}
      c={`#${route?.text_color}`}
      icon={<MBTAIcon />}
      rightIcon={
        shuttleAlert ? (
          <Tooltip label={shuttleAlert} multiline w={280} withArrow>
            <Text c="yellow.3" style={{ cursor: 'help', display: 'flex' }}>
              <BsExclamationTriangleFill size={24} />
            </Text>
          </Tooltip>
        ) : undefined
      }
    >
      <Card.Section px="xs" pt="xs">
        <Stack gap={2}>
          {directionIds.map((directionId, index) => (
            <Stack key={directionId} gap={1}>
              {renderDirectionLabel(directionId)}
              {renderMinutesDisplay(directionId)}
              {index < directionIds.length - 1 && <Divider mb="xs" />}
            </Stack>
          ))}
        </Stack>
      </Card.Section>
    </WidgetCard>
  );
}
