import { Box, Card, Group, Text } from '@mantine/core';
import type { ComponentType } from 'react';
import { useThemed } from '@/hooks/useUiTheme';
import { NEUMORPHIC_RAISED } from '@/theme';
import type { UiTheme } from '@/uiTheme';

type Props = {
  children: React.ReactNode;
  title?: string;
  // Themes that frame every widget as a titled window caption it with this, falling back to `title`.
  windowTitle?: string;
  // What a window's body is drawn as in those themes: the window face, a white well, or a highlight.
  surface?: 'face' | 'well' | 'highlight';
  titleBg?: string;
  bg?: string;
  c?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  p?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  style?: React.CSSProperties;
};

function NeumorphicCard({
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

// Every window gets the same fixed-height navy title bar, even before its caption has loaded. The
// body stays a Mantine Card so widgets' Card.Sections keep working; retro.css zeroes its
// --card-padding so they stay inside the frame.
function RetroWindow({
  children,
  title,
  windowTitle,
  surface = 'face',
  icon,
  rightIcon,
  style,
}: Props) {
  return (
    <Box className="retro-window">
      <div className="retro-titlebar">
        <div className="retro-titlebar-caption">
          {icon}
          <Text span className="retro-caption">
            {windowTitle ?? title}
          </Text>
        </div>
        {rightIcon}
      </div>
      <Card className="retro-window-body" data-surface={surface} style={style}>
        {children}
      </Card>
    </Box>
  );
}

const WINDOWS: Record<UiTheme, ComponentType<Props>> = {
  neumorphic: NeumorphicCard,
  retro: RetroWindow,
};

export function WidgetCard(props: Props) {
  const Window = useThemed(WINDOWS);
  return <Window {...props} />;
}

// Whether every widget has a title bar, so a widget's own label belongs there instead of its body.
export function useTitleBars() {
  return useThemed<boolean>({ neumorphic: false, retro: true });
}
