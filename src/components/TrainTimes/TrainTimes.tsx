import MBTAIcon from '@/assets/mbta/MBTAIcon';
import { Badge, Box, Card, Divider, Group, Skeleton, Stack, Text, Tooltip } from '@mantine/core';
import { BsExclamationTriangleFill } from 'react-icons/bs';
import { Figure } from '../Figure';
import { WidgetCard } from '../WidgetCard';
import { useTrainTimes } from './useTrainTimes';

type Props = {
  stopId: string;
  directionIds: number[];
  routeId: string;
};

export function TrainTimes({ stopId, directionIds, routeId }: Props) {
  const { stop, route, mins, shuttleAlert, error } = useTrainTimes({
    stopId,
    directionIds,
    routeId,
  });

  const routeLabel = route?.short_name || route?.long_name;

  const renderMinutesDisplay = (directionId: number) => {
    if (error) {
      return <Text>{error.message}</Text>;
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
            <Figure figure={value?.toString()} unit="min" size="5rem" my="xl" />
          </Box>
        ))}
      </Group>
    );
  };

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
