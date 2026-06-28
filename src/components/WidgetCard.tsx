import { Card, Group, Text } from '@mantine/core';

const cardStyle: React.CSSProperties = {
  boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.28), -3px -3px 9px rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
};

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
    <Card
      p="md"
      radius="lg"
      bg={bg ?? 'var(--mantine-color-default)'}
      style={{ ...cardStyle, ...style }}
    >
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
