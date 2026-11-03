import {
  Badge,
  Box,
  Card,
  Divider,
  Group,
  type GroupProps,
  Indicator,
  type MantineSpacing,
  Paper,
  type PaperProps,
  Stack,
  Text,
  Tooltip,
  type TooltipProps,
  UnstyledButton,
} from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { type ComponentType, useEffect, useState } from 'react';
import { BsExclamationTriangleFill } from 'react-icons/bs';
import MBTAIcon from '@/assets/mbta/MBTAIcon';
import type { TripTime } from '@/clients/mbta/predictions';
import { useThemed } from '@/hooks/useUiTheme';
import { NEUMORPHIC_RAISED_SUBTLE } from '@/theme';
import { useInlineFonts } from '@/themeFonts';
import type { UiTheme } from '@/uiTheme';
import { ErrorMessage } from '../ErrorMessage';
import { Figure } from '../Figure';
import { LoadingPlaceholder } from '../LoadingPlaceholder';
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

function useCurrentTime() {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}

type SlotLayout = {
  figureSizeBySlotCount: Record<number, string>;
  countdownGap: MantineSpacing | number;
  labelWrap: GroupProps['wrap'];
  body: { px: MantineSpacing; pt?: MantineSpacing };
  slots: GroupProps;
  slot: (isEmpty: boolean) => PaperProps & { style?: React.CSSProperties };
};

// Retro fits three three-digit countdowns ("128m 05s") by trimming only the three-slot size, the
// slots' side padding, and the gap between minutes and seconds. On narrow screens its slots and
// route label wrap instead of clipping. Its window body is already inset, so the first route row
// needs no extra top padding.
const SLOT_LAYOUTS: Record<UiTheme, SlotLayout> = {
  neumorphic: {
    figureSizeBySlotCount: { 1: '4.5rem', 2: '3.75rem', 3: '3rem' },
    countdownGap: 'xs',
    labelWrap: 'nowrap',
    body: { px: 'xs', pt: 'xs' },
    slots: { grow: true },
    slot: (isEmpty) => ({
      radius: 'lg',
      px: 'sm',
      py: isEmpty ? 'xl' : 'sm',
      bg: 'var(--mantine-color-default-hover)',
      style: NEUMORPHIC_RAISED_SUBTLE,
    }),
  },
  retro: {
    figureSizeBySlotCount: { 1: '4.5rem', 2: '3.75rem', 3: '2.5rem' },
    countdownGap: 4,
    labelWrap: 'wrap',
    body: { px: 'xs' },
    slots: { gap: 8, wrap: 'wrap', className: 'retro-slots' },
    slot: (isEmpty) => ({ className: 'retro-well', px: 4, py: isEmpty ? 'xl' : 4 }),
  },
};

type StatusProps = { mode: 'live' | 'scheduled' };

function PillStatus({ mode }: StatusProps) {
  const { systemUi } = useInlineFonts();
  return mode === 'live' ? (
    <Badge
      size="lg"
      variant="light"
      color="green"
      ff={systemUi}
      leftSection={
        <Indicator processing inline color="green" size={8} withBorder={false} mr={6}>
          <Box w={0} h={0} aria-hidden />
        </Indicator>
      }
    >
      live
    </Badge>
  ) : (
    <Badge size="lg" variant="light" ff={systemUi}>
      scheduled
    </Badge>
  );
}

// "live" gets a stepping ticker arrow beside still text; "scheduled" is a flat label.
function LabelStatus({ mode }: StatusProps) {
  return (
    <Badge
      size="lg"
      className="retro-status"
      mod={{ mode }}
      leftSection={mode === 'live' ? <span aria-hidden className="retro-ticker" /> : undefined}
    >
      {mode}
    </Badge>
  );
}

const STATUSES: Record<UiTheme, ComponentType<StatusProps>> = {
  neumorphic: PillStatus,
  retro: LabelStatus,
};

function TrainTimeSlot({
  arrivalIso,
  scheduledIso,
  figureSize,
  now,
}: {
  arrivalIso?: string;
  scheduledIso?: string;
  figureSize: string;
  now: number;
}) {
  const isEmpty = arrivalIso == null && scheduledIso == null;
  const remaining = arrivalIso ? remainingSeconds(arrivalIso, now) : undefined;
  const mode = slotMode(arrivalIso, scheduledIso);
  const { figure, unit } = slotDisplay(scheduledIso);
  const liveDisplay = mode === 'live' && remaining != null ? liveCountdownDisplay(remaining) : null;
  const { slot, countdownGap } = useThemed(SLOT_LAYOUTS);
  const Status = useThemed(STATUSES);
  const { systemUi } = useInlineFonts();

  return (
    <Paper {...slot(isEmpty)}>
      <Stack gap={4} align="center" justify="center" h="100%">
        {isEmpty ? (
          <Text size="xl" c="dimmed" ff={systemUi} tt="lowercase">
            no trains
          </Text>
        ) : (
          <>
            {mode && <Status mode={mode} />}
            {liveDisplay ? (
              <Group gap={countdownGap} wrap="nowrap">
                <Figure
                  figure={liveDisplay.mins}
                  unit={liveDisplay.minsUnit}
                  size={figureSize}
                  unitSize="sm"
                  kind="ticking"
                />
                {'secs' in liveDisplay && (
                  <Figure
                    figure={liveDisplay.secs}
                    unit={liveDisplay.secsUnit}
                    size={figureSize}
                    unitSize="sm"
                    kind="ticking"
                  />
                )}
              </Group>
            ) : (
              <Figure figure={figure} unit={unit} size={figureSize} unitSize="sm" />
            )}
          </>
        )}
      </Stack>
    </Paper>
  );
}

const DUPLICATE_WINDOW_MS = 60 * 1000;

type Slot = { timeMs: number; arrivalIso?: string; scheduledIso?: string };

export function existingSlots(
  arrivalsForDirection: TripTime[] | undefined,
  departures: TripTime[],
  now = Date.now(),
) {
  const arrivals = arrivalsForDirection ?? [];
  const predictedTripIds = new Set(arrivals.map(({ tripId }) => tripId));
  // A predicted train's scheduled time is already shown live. Hide every departure at that
  // time, since parallel trips (e.g. shuttle variants) can share it.
  const predictedScheduledTimes = new Set(
    departures.filter(({ tripId }) => predictedTripIds.has(tripId)).map(({ time }) => time),
  );

  const live: Slot[] = arrivals.map(({ time }) => ({ timeMs: Date.parse(time), arrivalIso: time }));
  const scheduled: Slot[] = departures
    .filter(({ time }) => !predictedScheduledTimes.has(time))
    .map(({ time }) => ({ timeMs: Date.parse(time), scheduledIso: time }));

  // Parallel trips get predictions a few seconds apart, so times within a window are one
  // departure. Live slots are claimed first so they win over scheduled ones.
  const kept: Slot[] = [];
  for (const slot of [...live, ...scheduled]) {
    const isDuplicate = kept.some(
      ({ timeMs }) => Math.abs(timeMs - slot.timeMs) < DUPLICATE_WINDOW_MS,
    );
    if (slot.timeMs > now && !isDuplicate) {
      kept.push(slot);
    }
  }

  return kept
    .sort((a, b) => a.timeMs - b.timeMs)
    .slice(0, 3)
    .map(({ arrivalIso, scheduledIso }) => ({ arrivalIso, scheduledIso }));
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
  const { systemUi } = useInlineFonts();
  const { labelWrap } = useThemed(SLOT_LAYOUTS);

  return (
    <Group gap="md" mt="xs" wrap={labelWrap}>
      <Badge
        ff={systemUi}
        size={routeLabel && routeLabel.length > 4 ? 'xl' : '2.25rem'}
        color={`#${route?.color}`}
        c={`#${route?.text_color}`}
      >
        {routeLabel}
      </Badge>
      <Text size="1.75rem" truncate>
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
  const now = useCurrentTime();
  const { figureSizeBySlotCount, slots: slotsRow } = useThemed(SLOT_LAYOUTS);

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  }

  if (!arrivals) {
    return (
      <Group w="100%" grow my="sm">
        {[0, 1, 2].map((i) => (
          <LoadingPlaceholder key={i} height={120} radius="lg" />
        ))}
      </Group>
    );
  }

  const departures = scheduled?.[directionId] ?? [];
  const slots = existingSlots(arrivals[directionId], departures, now);
  const figureSize = figureSizeBySlotCount[Math.max(slots.length, 1)] ?? '3rem';

  return (
    <Group w="100%" gap="sm" {...slotsRow} align="stretch" my="xs">
      {slots.length === 0 ? (
        <TrainTimeSlot figureSize={figureSize} now={now} />
      ) : (
        slots.map(({ arrivalIso, scheduledIso }, i) => (
          <TrainTimeSlot
            // Times aren't unique keys: duplicate keys leave stale slots behind on re-render.
            key={i}
            arrivalIso={arrivalIso}
            scheduledIso={scheduledIso}
            figureSize={figureSize}
            now={now}
          />
        ))
      )}
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

type AlertSkin = {
  tooltip: Pick<TooltipProps, 'withArrow' | 'classNames'>;
  button: { c?: string; className?: string };
  glyph: (icon: React.ReactNode) => React.ReactNode;
};

// Retro draws a raised grey key (with a 48px hit area inside the title bar) and a square tooltip.
const ALERT_SKINS: Record<UiTheme, AlertSkin> = {
  neumorphic: {
    tooltip: { withArrow: true },
    button: { c: 'yellow.3' },
    glyph: (icon) => icon,
  },
  retro: {
    tooltip: { withArrow: false, classNames: { tooltip: 'retro-tooltip' } },
    button: { className: 'retro-key' },
    glyph: (icon) => <span className="retro-key-face">{icon}</span>,
  },
};

function ServiceAlertIcon({ message }: { message: string }) {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside<HTMLButtonElement>(() => setOpened(false));
  const { tooltip, button, glyph } = useThemed(ALERT_SKINS);

  // Controlled so a tap toggles it; Mantine's hover trigger ignores touch.
  return (
    <Tooltip label={message} multiline w={280} {...tooltip} opened={opened}>
      <UnstyledButton
        ref={ref}
        display="inline-flex"
        {...button}
        aria-label="Service alert"
        aria-expanded={opened}
        onClick={() => setOpened((o) => !o)}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setOpened(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setOpened(false)}
        onKeyDown={(e) => e.key === 'Escape' && setOpened(false)}
      >
        {glyph(<BsExclamationTriangleFill size={24} />)}
      </UnstyledButton>
    </Tooltip>
  );
}

export function TrainTimes({ stopId, directionIds, routeId }: Props) {
  const { stop, route, arrivals, scheduled, shuttleAlert, error } = useTrainTimes({
    stopId,
    directionIds,
    routeId,
  });

  const routeLabel = route?.short_name || route?.long_name;
  const { body } = useThemed(SLOT_LAYOUTS);

  return (
    <WidgetCard
      title={stop?.name}
      titleBg={`#${route?.color}`}
      c={`#${route?.text_color}`}
      icon={<MBTAIcon />}
      rightIcon={shuttleAlert ? <ServiceAlertIcon message={shuttleAlert} /> : undefined}
    >
      <Card.Section {...body}>
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
