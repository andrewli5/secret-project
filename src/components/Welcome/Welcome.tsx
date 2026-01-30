import { Box, Group, Paper, Stack } from '@mantine/core';
import { TrainTimes } from '../TrainTimes/TrainTimes';
import { Weather } from '../Weather/Weather';

const PACKARDS_CORNER_STOP_ID = 'place-brico';
const GREEN_LINE_B_ROUTE_ID = 'Green-B';

const B57_STOP_ID = '959';
const B57_ROUTE_ID = '57';

export function Welcome() {
  return (
    <Paper m="lg" p="lg" radius="md" bg="transparent">
      <Group gap="xs" align="start" mb="xs">
        <Box w="49%">
          <TrainTimes
            stopId={PACKARDS_CORNER_STOP_ID}
            directionIds={[1, 0]}
            routeId={GREEN_LINE_B_ROUTE_ID}
          />
        </Box>
        <Stack w="49%" gap="xs">
          <TrainTimes stopId={B57_STOP_ID} directionIds={[0]} routeId={B57_ROUTE_ID} />
          <Weather />
        </Stack>
      </Group>
    </Paper>
  );
}
