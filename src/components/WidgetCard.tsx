import { MBTAIcon } from '@/assets/mbta/MBTAIcon';
import { Box, Card, Group, Paper, Text } from '@mantine/core';

export function WidgetCard({
  children,
  title,
  bg,
  c,
}: {
  children: React.ReactNode;
  title?: string;
  bg?: string;
  c?: string;
}) {
  return (
    <Card shadow="md" p="md" radius="md">
      {title && (
        <Card.Section>
          <Group bg={bg ?? 'blue'} p="md" gap="sm">
            <MBTAIcon />
            <Text size="md" fw={500} c={c ?? 'white'} ta="center">
              {title}
            </Text>
          </Group>
        </Card.Section>
      )}
      {children}
    </Card>
  );
}
