import { Paper, SimpleGrid, Stack } from '@mantine/core';
import { TrainTimes } from '../TrainTimes/TrainTimes';
import { Weather } from '../Weather/Weather';
import { ChineseOfTheDay } from '../ChineseOfTheDay/ChineseOfTheDay';
import { Clock } from '../Clock/Clock';

const BOSTON_LANDING_STOP_ID = 'place-WML-0035';
const WORCESTER_LINE_ROUTE_ID = 'CR-Worcester';
const WORCESTER_INBOUND_DIRECTION_IDS = [1];

export const Dashboard = () => (
  <Paper m="lg" p="lg" radius="md" bg="transparent">
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
      <Stack>
        <Clock />
        <TrainTimes
          stopId={BOSTON_LANDING_STOP_ID}
          directionIds={WORCESTER_INBOUND_DIRECTION_IDS}
          routeId={WORCESTER_LINE_ROUTE_ID}
        />
      </Stack>
      <Stack>
        <Weather />
        <ChineseOfTheDay />
      </Stack>
    </SimpleGrid>
  </Paper>
);
