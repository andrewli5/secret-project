import { Card, Group, Text } from '@mantine/core';
import { NEUMORPHIC_RAISED } from '@/theme';

type Props = {
  children: React.ReactNode;
  title?: string;
  titleBg?: string;
  bg?: string;
  c?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  p?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: React.CSSProperties;
};

export function WidgetCard({
  children,
  title,
  titleBg,
  bg,
  c,
  icon,
  rightIcon,
  p = 'md',
  style,
}: Props) {
  return (
    <Card
      p={p}
      radius="lg"
      bg={bg ?? 'var(--mantine-color-default)'}
      style={{ ...NEUMORPHIC_RAISED, ...style }}
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
