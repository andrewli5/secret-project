import { Text, Group } from '@mantine/core';
import { BsArrowClockwise } from 'react-icons/bs';
import { useEffect, useState } from 'react';

const pluralize = (count: number, unit: string) =>
  count === 1 ? `1 ${unit} ago` : `${count} ${unit}s ago`;

export const getTimeAgo = (time?: Date, useSeconds?: boolean): string => {
  if (!time) {
    return '';
  }

  const diffMs = Date.now() - time.getTime();
  const value = Math.floor(diffMs / (useSeconds ? 1000 : 60000));
  const unit = useSeconds ? 'second' : 'minute';

  return value < 1 ? 'just now' : pluralize(value, unit);
};

const REFRESH_MS = 2500;

export const LastUpdatedTime = ({ time, seconds = false }: { time?: Date; seconds?: boolean }) => {
  const [timeAgo, setTimeAgo] = useState<string>(getTimeAgo(time, seconds));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgo(getTimeAgo(time, seconds));
    }, REFRESH_MS);
    return () => clearInterval(intervalId);
  }, [time, seconds]);

  return (
    <Group gap={10} justify="flex-end" align="center" mt="-lg">
      <BsArrowClockwise size={23} color="gray" />
      <Text ta="right" size="sm" c="dimmed">
        {timeAgo}
      </Text>
    </Group>
  );
};
