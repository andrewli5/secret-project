import { Text } from '@mantine/core';

type Props = {
  number?: number;
  unit?: string;
  index?: number;
  size?: string;
  unitSize?: string;
  my?: string;
};

export const Figure = ({ number, unit, index, size, unitSize, my }: Props) => {
  return (
    <Text key={index} size={size ?? 'xl'} my={my} c={number === undefined ? 'dimmed' : undefined}>
      {number !== undefined ? `${number}` : '--'}
      {unit && (
        <Text span size={unitSize ?? 'md'} c="dimmed">
          {` ${unit}`}
        </Text>
      )}
    </Text>
  );
};
