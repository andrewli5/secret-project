import { Text } from '@mantine/core';

export const Figure = ({
  number,
  unit,
  index,
}: {
  number: number;
  unit?: string;
  index?: number;
}) => {
  return (
    <Text key={index} size="xl">
      {`${number}`}
      {unit && (
        <Text span size="md" c="dimmed">
          {' ' + unit}
        </Text>
      )}
    </Text>
  );
};
