import { Grid, Paper, Stack } from '@mantine/core';
import { TrainTimes } from '../TrainTimes/TrainTimes';
import { Weather } from '../Weather/Weather';
import { ChineseOfTheDay } from '../ChineseOfTheDay/ChineseOfTheDay';
import { Clock } from '../Clock/Clock';

const BOSTON_LANDING_STOP_ID = 'place-WML-0035';
const WORCESTER_LINE_ROUTE_ID = 'CR-Worcester';
const WORCESTER_DIRECTION_IDS = [1, 0];

export const Dashboard = () => (
  <Paper
    m="lg"
    p="lg"
    w="100%"
    maw="calc(100vw - 2 * var(--mantine-spacing-lg))"
    radius="md"
    bg="transparent"
    style={{ boxSizing: 'border-box' }}
  >
    <Grid gutter="md" maw="100%">
      <Grid.Col span={6} miw={0}>
        <Stack miw={0}>
          <Clock />
          <Weather />
        </Stack>
      </Grid.Col>
      <Grid.Col span={6} miw={0}>
        <Stack miw={0}>
          <TrainTimes
            stopId={BOSTON_LANDING_STOP_ID}
            directionIds={WORCESTER_DIRECTION_IDS}
            routeId={WORCESTER_LINE_ROUTE_ID}
          />
          <ChineseOfTheDay />
        </Stack>
      </Grid.Col>
    </Grid>
  </Paper>
);
