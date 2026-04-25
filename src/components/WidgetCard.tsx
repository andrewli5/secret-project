import { Card, Group, Text } from '@mantine/core';

type Props = {
  children: React.ReactNode;
  title?: string;
  titleBg?: string;
  bg?: string;
  c?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: React.CSSProperties;
};

export function WidgetCard({ children, title, titleBg, bg, c, icon, rightIcon, style }: Props) {
  return (
    <Card shadow="lg" p="md" radius="lg" withBorder bg={bg ?? 'transparent'} style={style}>
      {title && (
        <Card.Section>
          <Group bg={titleBg ?? 'blue'} p="lg" gap="sm" justify="space-between" wrap="nowrap">
            <Group gap="sm" wrap="nowrap">
              {icon}
              <Text size="2rem" fw={500} c={c ?? 'white'} ta="center">
                {title}
              </Text>
            </Group>
            {rightIcon}
          </Group>
        </Card.Section>
      )}
      {children}
    </Card>
  );
}
