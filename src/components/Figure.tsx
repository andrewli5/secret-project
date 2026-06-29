import { Text } from '@mantine/core';
import { GEIST_FONT } from '@/theme';

type Props = {
  figure?: string;
  unit?: string;
  size?: string;
  unitSize?: string;
  my?: string | number;
  fw?: number;
};

export const Figure = ({ figure, unit, size, unitSize, my, fw }: Props) => {
  return (
    <Text
      size={size}
      fw={fw}
      my={my}
      c={figure ? undefined : 'dimmed'}
      style={{
        fontFamily: GEIST_FONT,
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
          style={{ fontFamily: GEIST_FONT, fontVariantNumeric: 'tabular-nums' }}
        >
          {` ${unit}`}
        </Text>
      )}
    </Text>
  );
};
