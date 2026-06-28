import { GEIST_FONT } from '@/theme';
import { Box, Card, Divider, Group, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
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

const DayCell = ({ label, date, isToday }: DayCellProps) => (
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

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, REFRESH_MS);
    return () => clearInterval(intervalId);
  }, []);

  const weekDates = weekDatesFor(time);
  const today = time.getDay();

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const isPM = hours >= 12;
  const displayHours = hours % 12 || 12;

  const formatTwoDigits = (n: number) => n.toString().padStart(2, '0');

  return (
    <WidgetCard>
      <Card.Section p="sm">
        <Stack align="center" gap={10}>
          <Text size="2.5rem">
            {time.toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Divider w="100%" />
          <Group gap={0} align="baseline">
            <Text
              size="9rem"
              fw={300}
              style={{
                fontFamily: GEIST_FONT,
                fontVariantNumeric: 'tabular-nums',
                whiteSpace: 'nowrap',
              }}
            >
              {displayHours}:{formatTwoDigits(minutes)}
            </Text>
            <Text span size="3rem" c="dimmed">
              {isPM ? 'PM' : 'AM'}
            </Text>
          </Group>
          <Divider w="100%" />
          <Group gap={6} justify="center" w="100%">
            {WEEKDAYS.map((day, i) => (
              <DayCell key={day} label={day} date={weekDates[i]} isToday={i === today} />
            ))}
          </Group>
        </Stack>
      </Card.Section>
    </WidgetCard>
  );
};
