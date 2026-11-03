import { Box, Divider, Group, Stack, Text } from '@mantine/core';
import { type ComponentType, useEffect, useState } from 'react';
import { useThemed } from '@/hooks/useUiTheme';
import type { UiTheme } from '@/uiTheme';
import { Figure } from '../Figure';
import { WidgetCard } from '../WidgetCard';

const REFRESH_MS = 1000;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const weekDatesFor = (date: Date): number[] =>
  WEEKDAYS.map((_, i) => {
    const d = new Date(date);
    d.setDate(date.getDate() - date.getDay() + i);
    return d.getDate();
  });

type DayCellProps = { label: string; date: number; isToday: boolean };

const RoundDayCell = ({ label, date, isToday }: DayCellProps) => (
  <Stack align="center" gap={2} flex={1}>
    <Text size="sm" c={isToday ? undefined : 'dimmed'}>
      {label}
    </Text>
    <Box
      w="2.25rem"
      h="2.25rem"
      bg={isToday ? 'var(--mantine-primary-color-filled)' : undefined}
      style={{ borderRadius: '50%' }}
    >
      <Text
        size="lg"
        ta="center"
        lh="2.25rem"
        fw={isToday ? 700 : 400}
        c={isToday ? 'var(--mantine-primary-color-contrast)' : undefined}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {date}
      </Text>
    </Box>
  </Stack>
);

// A flat square cell; today is a pressed key (styles/retro.css), not a tappable-looking picker.
const SquareDayCell = ({ label, date, isToday }: DayCellProps) => (
  <Stack align="center" gap={2} flex={1} className="retro-day" mod={{ today: isToday }}>
    <Text size="sm" c={isToday ? undefined : 'dimmed'}>
      {label}
    </Text>
    <Text
      size="lg"
      ta="center"
      lh="1.5rem"
      fw={isToday ? 600 : 400}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {date}
    </Text>
  </Stack>
);

const DAY_CELLS: Record<UiTheme, ComponentType<DayCellProps>> = {
  neumorphic: RoundDayCell,
  retro: SquareDayCell,
};

// Retro's yellow field already sets the time apart, and the strip needs the height.
const RULES: Record<UiTheme, ComponentType | null> = {
  neumorphic: () => <Divider w="100%" />,
  retro: null,
};

// Retro lines the date and time up on the left edge, like the weather window below.
const ALIGNMENTS: Record<UiTheme, 'center' | 'flex-start'> = {
  neumorphic: 'center',
  retro: 'flex-start',
};

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, REFRESH_MS);
    return () => clearInterval(intervalId);
  }, []);

  const DayCell = useThemed(DAY_CELLS);
  const Rule = useThemed(RULES);
  const align = useThemed(ALIGNMENTS);
  const weekDates = weekDatesFor(time);
  const today = time.getDay();

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const isPM = hours >= 12;
  const displayHours = hours % 12 || 12;

  const formatTwoDigits = (n: number) => n.toString().padStart(2, '0');

  return (
    <WidgetCard p="xs" windowTitle="Clock" surface="highlight">
      <Stack align={align} gap={10}>
        <Text size="2.5rem">
          {time.toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        {Rule && <Rule />}
        <Group gap={0} align="baseline" wrap="nowrap">
          <Figure
            figure={`${displayHours}:${formatTwoDigits(minutes)}`}
            unit={isPM ? 'PM' : 'AM'}
            unitSize="3.25rem"
            size="10rem"
            kind="hero"
          />
        </Group>
        {Rule && <Rule />}
        <Group gap={6} justify="center" w="100%">
          {WEEKDAYS.map((day, i) => (
            <DayCell key={day} label={day} date={weekDates[i]} isToday={i === today} />
          ))}
        </Group>
      </Stack>
    </WidgetCard>
  );
};
