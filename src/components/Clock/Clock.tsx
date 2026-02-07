import { Card, Group, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { WidgetCard } from '../WidgetCard';

const REFRESH_MS = 1000; // 1 second

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, REFRESH_MS);
    return () => clearInterval(intervalId);
  }, []);

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
          <Group gap={0} align="baseline">
            <Text size="9rem" fw={300}>
              {displayHours}:{formatTwoDigits(minutes)}
            </Text>

            <Text size="3rem" c="">
              {isPM ? 'PM' : 'AM'}
            </Text>
          </Group>
        </Stack>
      </Card.Section>
    </WidgetCard>
  );
};
