import { MantineProvider } from '@mantine/core';
import { act, render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { existingSlots, liveCountdownDisplay, remainingSeconds, TrainTimes } from './TrainTimes';
import { useTrainTimes } from './useTrainTimes';

vi.mock('./useTrainTimes', () => ({ useTrainTimes: vi.fn() }));

afterEach(() => {
  vi.useRealTimers();
});

describe('liveCountdownDisplay', () => {
  it('switches format at the 10-minute boundary', () => {
    expect(liveCountdownDisplay(599)).toEqual({
      mins: '9',
      minsUnit: 'm',
      secs: '59',
      secsUnit: 's',
    });
    expect(liveCountdownDisplay(600)).toEqual({ mins: '10', minsUnit: 'min' });
  });
});

describe('remainingSeconds', () => {
  it('ceil-rounds partial seconds until arrival', () => {
    const now = Date.parse('2026-06-27T12:00:00Z');
    expect(remainingSeconds('2026-06-27T12:04:32.500Z', now)).toBe(273);
  });
});

describe('existingSlots', () => {
  it('removes arrival and schedule times that have passed', () => {
    const now = Date.parse('2026-06-27T12:00:00Z');
    const past = '2026-06-27T11:59:59Z';
    const arrival = '2026-06-27T12:01:00Z';
    const departure = '2026-06-27T12:02:00Z';

    expect(existingSlots([past, past, arrival], [past, departure], now)).toEqual([
      { i: 1, arrivalIso: undefined, scheduledIso: departure },
      { i: 2, arrivalIso: arrival, scheduledIso: undefined },
    ]);
  });
});

describe('TrainTimes', () => {
  it('removes a live time after the train arrives', () => {
    vi.useFakeTimers();
    const now = new Date('2026-06-27T12:00:00Z');
    vi.setSystemTime(now);
    vi.mocked(useTrainTimes).mockReturnValue({
      stop: { name: 'Test Stop' },
      route: {
        color: '000000',
        direction_destinations: ['Test Destination'],
        direction_names: ['Outbound'],
        long_name: 'Test Route',
        short_name: 'TR',
        text_color: 'FFFFFF',
      },
      arrivals: { 0: [new Date(now.getTime() + 500).toISOString()] },
      scheduled: { 0: [] },
      shuttleAlert: null,
      error: undefined,
    });

    render(
      createElement(
        MantineProvider,
        null,
        createElement(TrainTimes, { stopId: 'stop', directionIds: [0], routeId: 'route' }),
      ),
    );
    expect(screen.getByText('live')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1000));

    expect(screen.queryByText('live')).not.toBeInTheDocument();
    expect(screen.getByText('no trains')).toBeInTheDocument();
  });
});
