import { Text } from '@mantine/core';

type Props = {
  number?: number;
  unit?: string;
  size?: string;
  unitSize?: string;
  my?: string | number;
  fw?: number;
};

export const Figure = ({ number, unit, size, unitSize, my, fw }: Props) => {
  const digits = number !== undefined ? String(number).length : 0;
  const resolvedSize = size && digits >= 3 ? `calc(${size} * ${2 / digits})` : (size ?? 'xl');

  return (
    <Text
      size={resolvedSize}
      fw={fw}
      my={my}
      c={number === undefined ? 'dimmed' : undefined}
      style={{
        fontFamily: 'Geist, sans-serif',
        whiteSpace: 'nowrap',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {number !== undefined ? `${number}` : '--'}
      {unit && (
        <Text span size={unitSize ?? 'md'} c="dimmed">
          {` ${unit}`}
        </Text>
      )}
    </Text>
  );
};
