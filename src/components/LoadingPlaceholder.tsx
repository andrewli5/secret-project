import { Box, Skeleton, type MantineRadius } from '@mantine/core';
import type { ComponentType } from 'react';
import { useThemed } from '@/hooks/useUiTheme';
import type { UiTheme } from '@/uiTheme';

type Props = { height: number; width?: number; radius?: MantineRadius };

// Retro reserves the same space with a flat, static inset well: Skeleton's pulsing ::before/::after
// overlays would cover the well's bevel and fill.
const PLACEHOLDERS: Record<UiTheme, ComponentType<Props>> = {
  neumorphic: (props) => <Skeleton {...props} />,
  retro: ({ height, width }) => <Box className="retro-well" h={height} w={width ?? '100%'} />,
};

export function LoadingPlaceholder(props: Props) {
  const Placeholder = useThemed(PLACEHOLDERS);
  return <Placeholder {...props} />;
}
