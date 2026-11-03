import { Text } from '@mantine/core';
import { useThemed } from '@/hooks/useUiTheme';
import { useInlineFonts } from '@/themeFonts';
import type { UiTheme } from '@/uiTheme';

// hero: the clock and temperature. ticking: figures that change every second.
type FigureKind = 'hero' | 'ticking' | 'value';

type Props = {
  figure?: string;
  unit?: string;
  size?: string;
  unitSize?: string;
  my?: string | number;
  fw?: number;
  kind?: FigureKind;
};

const FIGURE_CLASS: Record<UiTheme, (kind: FigureKind) => string | undefined> = {
  neumorphic: () => undefined,
  retro: (kind) => `retro-figure retro-figure-${kind}`,
};

export const Figure = ({ figure, unit, size, unitSize, my, fw, kind = 'value' }: Props) => {
  const { geist } = useInlineFonts();
  const className = useThemed(FIGURE_CLASS)(kind);

  return (
    <Text
      size={size}
      fw={fw}
      my={my}
      c={figure ? undefined : 'dimmed'}
      className={className}
      style={{
        fontFamily: geist,
        whiteSpace: 'nowrap',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {figure || '--'}
      {unit && (
        <Text
          span
          size={unitSize ?? 'md'}
          c="dimmed"
          className={className && 'retro-figure-unit'}
          style={{ fontFamily: geist, fontVariantNumeric: 'tabular-nums' }}
        >
          {` ${unit}`}
        </Text>
      )}
    </Text>
  );
};
