import { Card, Group, Text } from '@mantine/core';
import MBTAIcon from '@/assets/mbta/MBTAIcon';

type Props = {
  children: React.ReactNode;
  title?: string;
  titleBg?: string;
  bg?: string;
  c?: string;
};

export function WidgetCard({ children, title, titleBg, bg, c }: Props) {
  return (
    <Card shadow="lg" p="md" radius="lg" withBorder bg={bg ?? 'transparent'}>
      {title && (
        <Card.Section>
          <Group bg={titleBg ?? 'blue'} p="lg" gap="sm">
            <MBTAIcon />
            <Text size="2rem" fw={500} c={c ?? 'white'} ta="center">
              {title}
            </Text>
          </Group>
        </Card.Section>
      )}
      {children}
    </Card>
  );
}
