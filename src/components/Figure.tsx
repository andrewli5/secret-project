import { GEIST_FONT } from '@/theme';
import { Text } from '@mantine/core';

type Props = {
  figure?: string;
  unit?: string;
  size?: string;
  unitSize?: string;
  my?: string | number;
  fw?: number;
};

export const Figure = ({ figure, unit, size, unitSize, my, fw }: Props) => {
  const length = figure?.length ?? 0;
  const resolvedSize = size && length >= 3 ? `calc(${size} * ${2 / length})` : (size ?? 'xl');

  return (
    <Text
      size={resolvedSize}
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
        <Text span size={unitSize ?? 'md'} c="dimmed">
          {` ${unit}`}
        </Text>
      )}
    </Text>
  );
};
