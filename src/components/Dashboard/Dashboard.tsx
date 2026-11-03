import {
  Grid,
  type GridColProps,
  Paper,
  type PaperProps,
  Stack,
  type StackProps,
} from '@mantine/core';
import { useThemed } from '@/hooks/useUiTheme';
import type { UiTheme } from '@/uiTheme';
import { TrainTimes } from '../TrainTimes/TrainTimes';
import { Weather } from '../Weather/Weather';
import { ChineseOfTheDay } from '../ChineseOfTheDay/ChineseOfTheDay';
import { Clock } from '../Clock/Clock';

const BOSTON_LANDING_STOP_ID = 'place-WML-0035';
const WORCESTER_LINE_ROUTE_ID = 'CR-Worcester';
const WORCESTER_DIRECTION_IDS = [1, 0];

type Layout = {
  frame: PaperProps;
  gutter: number | 'md';
  span: GridColProps['span'];
  gap?: StackProps['gap'];
};

// Retro's title bars and bevels take their height from the margins and gaps. Its columns stack below
// Mantine's md breakpoint (62em, by viewport width), so a portrait tablet gets one column.
const LAYOUTS: Record<UiTheme, Layout> = {
  neumorphic: {
    frame: { m: 'lg', p: 'lg', maw: 'calc(100vw - 2 * var(--mantine-spacing-lg))', radius: 'md' },
    gutter: 'md',
    span: 6,
  },
  retro: {
    frame: { m: 0, p: 12 },
    gutter: 16,
    span: { base: 12, md: 6 },
    gap: 12,
  },
};

export const Dashboard = () => {
  const { frame, gutter, span, gap } = useThemed(LAYOUTS);

  return (
    <Paper {...frame} w="100%" bg="transparent" style={{ boxSizing: 'border-box' }}>
      <Grid gutter={gutter} maw="100%">
        <Grid.Col span={span} miw={0}>
          <Stack miw={0} gap={gap}>
            <Clock />
            <Weather />
          </Stack>
        </Grid.Col>
        <Grid.Col span={span} miw={0}>
          <Stack miw={0} gap={gap}>
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
};
