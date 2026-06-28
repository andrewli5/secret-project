import {
  Badge,
  Box,
  Card,
  Divider,
  Group,
  Indicator,
  Paper,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { BsExclamationTriangleFill } from 'react-icons/bs';
import MBTAIcon from '@/assets/mbta/MBTAIcon';
import { NEUMORPHIC_RAISED_SUBTLE } from '@/theme';
import { Figure } from '../Figure';
import { WidgetCard } from '../WidgetCard';
import { useTrainTimes } from './useTrainTimes';

type Props = {
  stopId: string;
  directionIds: number[];
  routeId: string;
};

function formatClockTime(isoTime: string) {
  const formatted = new Date(isoTime).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
  const [time, period] = formatted.split(' ');
  return { time, period };
}

type SlotDisplay = { figure?: string; unit?: string };

export function remainingSeconds(arrivalIso: string, now = Date.now()) {
  return Math.max(0, Math.ceil((new Date(arrivalIso).getTime() - now) / 1000));
}

export function slotMode(arrivalIso?: string, scheduledIso?: string): 'live' | 'scheduled' | null {
  if (arrivalIso != null) {
    return 'live';
  }
  if (scheduledIso != null) {
    return 'scheduled';
  }
  return null;
}

export function liveCountdownDisplay(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  if (mins >= 10) {
    return { mins: mins.toString(), minsUnit: 'min' as const };
  }
  return {
    mins: mins.toString(),
    minsUnit: 'm' as const,
    secs: secs.toString().padStart(2, '0'),
    secsUnit: 's' as const,
  };
}

export function slotDisplay(scheduledIso?: string): SlotDisplay {
  if (scheduledIso) {
    const { time, period } = formatClockTime(scheduledIso);
    return { figure: time, unit: period };
  }
  return {};
}

function useRemainingSeconds(arrivalIso?: string) {
  const [seconds, setSeconds] = useState<number>();

  useEffect(() => {
    if (!arrivalIso) {
      setSeconds(undefined);
      return;
    }

    const tick = () => setSeconds(remainingSeconds(arrivalIso));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [arrivalIso]);

  return seconds;
}

const FIGURE_SIZE_BY_SLOT_COUNT: Record<number, string> = {
  1: '4.5rem',
  2: '3.75rem',
  3: '3rem',
};

function TrainTimeSlot({
  arrivalIso,
  scheduledIso,
  figureSize,
}: {
  arrivalIso?: string;
  scheduledIso?: string;
  figureSize: string;
}) {
  const remaining = useRemainingSeconds(arrivalIso);
  const mode = slotMode(arrivalIso, scheduledIso);
  const { figure, unit } = slotDisplay(scheduledIso);
  const liveDisplay = mode === 'live' && remaining != null ? liveCountdownDisplay(remaining) : null;

  return (
    <Paper
      radius="lg"
      p="sm"
      bg="var(--mantine-color-default-hover)"
      style={NEUMORPHIC_RAISED_SUBTLE}
    >
      <Stack gap={4} align="center" justify="center" h="100%">
        {mode === 'live' && (
          <Badge
            size="lg"
            variant="light"
            color="green"
            ff="system-ui"
            leftSection={
              <Indicator processing inline color="green" size={8} withBorder={false} mr={6}>
                <Box w={0} h={0} aria-hidden />
              </Indicator>
            }
          >
            live
          </Badge>
        )}
        {mode === 'scheduled' && (
          <Badge size="lg" variant="light" ff="system-ui">
            scheduled
          </Badge>
        )}
        {liveDisplay ? (
          <Group gap="xs" wrap="nowrap">
            <Figure
              figure={liveDisplay.mins}
              unit={liveDisplay.minsUnit}
              size={figureSize}
              unitSize="sm"
            />
            {'secs' in liveDisplay && (
              <Figure
                figure={liveDisplay.secs}
                unit={liveDisplay.secsUnit}
                size={figureSize}
                unitSize="sm"
              />
            )}
          </Group>
        ) : (
          <Figure figure={figure} unit={unit} size={figureSize} unitSize="sm" />
        )}
      </Stack>
    </Paper>
  );
}

function existingSlots(arrivalsForDirection: string[] | undefined, departures: string[]) {
  return [0, 1, 2]
    .map((i) => ({ i, arrivalIso: arrivalsForDirection?.[i], scheduledIso: departures[i] }))
    .filter(({ arrivalIso, scheduledIso }) => arrivalIso != null || scheduledIso != null);
}

type RouteData = NonNullable<ReturnType<typeof useTrainTimes>['route']>;

type TimesData = Pick<ReturnType<typeof useTrainTimes>, 'arrivals' | 'scheduled' | 'error'>;

function DirectionLabel({
  directionId,
  route,
  routeLabel,
}: {
  directionId: number;
  route?: RouteData;
  routeLabel?: string;
}) {
  return (
    <Group gap="md" mt="xs" wrap="nowrap">
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
}

function TrainSlotsDisplay({
  directionId,
  arrivals,
  scheduled,
  error,
}: { directionId: number } & TimesData) {
  if (error) {
    return (
      <Text c="red" role="alert">
        {error.message}
      </Text>
    );
  }

  if (!arrivals) {
    return (
      <Group w="100%" grow my="sm">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} height={120} radius="lg" />
        ))}
      </Group>
    );
  }

  const departures = scheduled?.[directionId] ?? [];
  const slots = existingSlots(arrivals[directionId], departures);
  const figureSize = FIGURE_SIZE_BY_SLOT_COUNT[slots.length] ?? '3rem';

  return (
    <Group w="100%" gap="sm" grow align="stretch" my="xs">
      {slots.map(({ i, arrivalIso, scheduledIso }) => (
        <TrainTimeSlot
          key={arrivalIso ?? scheduledIso ?? i}
          arrivalIso={arrivalIso}
          scheduledIso={scheduledIso}
          figureSize={figureSize}
        />
      ))}
    </Group>
  );
}

function TrainDirectionSection({
  directionId,
  showDivider,
  route,
  routeLabel,
  arrivals,
  scheduled,
  error,
}: {
  directionId: number;
  showDivider: boolean;
  route?: RouteData;
  routeLabel?: string;
} & TimesData) {
  return (
    <Stack gap={1}>
      <DirectionLabel directionId={directionId} route={route} routeLabel={routeLabel} />
      <TrainSlotsDisplay
        directionId={directionId}
        arrivals={arrivals}
        scheduled={scheduled}
        error={error}
      />
      {showDivider && <Divider mb="xs" />}
    </Stack>
  );
}

export function TrainTimes({ stopId, directionIds, routeId }: Props) {
  const { stop, route, arrivals, scheduled, shuttleAlert, error } = useTrainTimes({
    stopId,
    directionIds,
    routeId,
  });

  const routeLabel = route?.short_name || route?.long_name;

  return (
    <WidgetCard
      title={stop?.name}
      titleBg={`#${route?.color}`}
      c={`#${route?.text_color}`}
      icon={<MBTAIcon />}
      rightIcon={
        shuttleAlert ? (
          <Tooltip label={shuttleAlert} multiline w={280} withArrow>
            <Box
              component="span"
              display="inline-flex"
              c="yellow.3"
              aria-label="Service alert"
              tabIndex={0}
            >
              <BsExclamationTriangleFill size={24} />
            </Box>
          </Tooltip>
        ) : undefined
      }
    >
      <Card.Section px="xs" pt="xs">
        <Stack gap={2}>
          {directionIds.map((directionId, index) => (
            <TrainDirectionSection
              key={directionId}
              directionId={directionId}
              showDivider={index < directionIds.length - 1}
              route={route}
              routeLabel={routeLabel}
              arrivals={arrivals}
              scheduled={scheduled}
              error={error}
            />
          ))}
        </Stack>
      </Card.Section>
    </WidgetCard>
  );
}
