import { MantineProvider } from '@mantine/core';
import { act, render, renderHook, screen } from '@testing-library/react';
import { createElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePolledData } from '@/hooks/usePolledData';
import { existingSlots, TrainTimes } from './TrainTimes';
import { useTrainTimes } from './useTrainTimes';

vi.mock('./useTrainTimes', () => ({ useTrainTimes: vi.fn() }));

afterEach(() => {
  vi.useRealTimers();
});

const trainData = {
  stop: { name: 'Test Stop' },
  route: {
    color: '000000',
    direction_destinations: ['Test Destination'],
    direction_names: ['Outbound'],
    long_name: 'Test Route',
    short_name: 'TR',
    text_color: 'FFFFFF',
  },
  scheduled: { 0: [] },
  shuttleAlert: null,
  error: undefined,
};

const trip = (time: string, tripId = time) => ({ time, tripId });

describe('existingSlots', () => {
  const now = Date.parse('2026-06-27T12:00:00Z');
  const past = '2026-06-27T11:59:59Z';

  it('removes arrival and schedule times that have passed', () => {
    const arrival = '2026-06-27T12:01:00Z';
    const departure = '2026-06-27T12:02:00Z';

    expect(
      existingSlots(
        [trip(past, 'a'), trip(arrival, 'b')],
        [trip(past, 'c'), trip(departure, 'd')],
        now,
      ),
    ).toEqual([
      { arrivalIso: arrival, scheduledIso: undefined },
      { arrivalIso: undefined, scheduledIso: departure },
    ]);
  });

  it('shows trips that share a departure time once', () => {
    const shared = '2026-06-27T12:10:00Z';
    const later = '2026-06-27T12:30:00Z';

    expect(
      existingSlots([], [trip(shared, 'local'), trip(shared, 'express'), trip(later)], now),
    ).toEqual([
      { arrivalIso: undefined, scheduledIso: shared },
      { arrivalIso: undefined, scheduledIso: later },
    ]);
  });

  it('does not show a predicted train again as scheduled', () => {
    // A stale schedule still lists the 11:59 train, and the 12:05 train is running late.
    const lateArrival = '2026-06-27T12:08:00Z';
    const scheduled = '2026-06-27T12:05:00Z';
    const next = '2026-06-27T12:30:00Z';

    expect(
      existingSlots(
        [trip(lateArrival, 'late')],
        [trip(past, 'gone'), trip(scheduled, 'late'), trip(scheduled, 'late-twin'), trip(next)],
        now,
      ),
    ).toEqual([
      { arrivalIso: lateArrival, scheduledIso: undefined },
      { arrivalIso: undefined, scheduledIso: next },
    ]);
  });

  it('prefers the live slot when a live and scheduled time match', () => {
    const time = '2026-06-27T12:10:00Z';

    expect(existingSlots([trip(time, 'a')], [trip(time, 'b')], now)).toEqual([
      { arrivalIso: time, scheduledIso: undefined },
    ]);
  });

  it('caps at three slots in time order', () => {
    const t = (m: number) => `2026-06-27T12:${String(m).padStart(2, '0')}:00Z`;

    expect(
      existingSlots([trip(t(20)), trip(t(40))], [trip(t(10)), trip(t(30)), trip(t(50))], now),
    ).toEqual([
      { arrivalIso: undefined, scheduledIso: t(10) },
      { arrivalIso: t(20), scheduledIso: undefined },
      { arrivalIso: undefined, scheduledIso: t(30) },
    ]);
  });
});

describe('TrainTimes', () => {
  it('ticks every second and shows new predictions without a refresh', () => {
    vi.useFakeTimers();
    const now = new Date('2026-06-27T12:00:00Z');
    vi.setSystemTime(now);
    vi.mocked(useTrainTimes).mockReturnValue({
      ...trainData,
      arrivals: { 0: [trip(new Date(now.getTime() + 602_000).toISOString())] },
    });

    const view = render(
      createElement(
        MantineProvider,
        null,
        createElement(TrainTimes, { stopId: 'stop', directionIds: [0], routeId: 'route' }),
      ),
    );
    expect(screen.getByText('02')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText('01')).toBeInTheDocument();

    vi.mocked(useTrainTimes).mockReturnValue({
      ...trainData,
      arrivals: { 0: [trip(new Date(now.getTime() + 620_000).toISOString())] },
    });
    view.rerender(
      createElement(
        MantineProvider,
        null,
        createElement(TrainTimes, { stopId: 'stop', directionIds: [0], routeId: 'route' }),
      ),
    );
    expect(screen.getByText('19')).toBeInTheDocument();
  });

  it('removes a live time after the train arrives', () => {
    vi.useFakeTimers();
    const now = new Date('2026-06-27T12:00:00Z');
    vi.setSystemTime(now);
    vi.mocked(useTrainTimes).mockReturnValue({
      ...trainData,
      arrivals: { 0: [trip(new Date(now.getTime() + 500).toISOString())] },
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

  it('clears trips that share a departure time once it passes', () => {
    vi.useFakeTimers();
    const now = new Date('2026-06-27T12:00:00Z');
    vi.setSystemTime(now);
    const shared = new Date(now.getTime() + 500).toISOString();
    const later = new Date(now.getTime() + 3_600_000).toISOString();
    vi.mocked(useTrainTimes).mockReturnValue({
      ...trainData,
      arrivals: { 0: [] },
      scheduled: { 0: [trip(shared, 'local'), trip(shared, 'express'), trip(later)] },
    });

    render(
      createElement(
        MantineProvider,
        null,
        createElement(TrainTimes, { stopId: 'stop', directionIds: [0], routeId: 'route' }),
      ),
    );
    expect(screen.getAllByText('scheduled')).toHaveLength(2);

    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getAllByText('scheduled')).toHaveLength(1);
  });
});

describe('usePolledData', () => {
  it('uses a slow result until a newer poll completes', async () => {
    vi.useFakeTimers();
    let resolveFirst!: (value: string) => void;
    const fetcher = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<string>((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockImplementationOnce(() => new Promise<string>(() => {}));
    const { result } = renderHook(() => usePolledData(fetcher, 1000));

    await act(async () => vi.advanceTimersByTimeAsync(1000));
    await act(async () => resolveFirst('slow'));
    expect(result.current.data).toBe('slow');
  });

  it('keeps the newest result when an earlier poll finishes last', async () => {
    vi.useFakeTimers();
    let resolveFirst!: (value: string) => void;
    const fetcher = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<string>((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockResolvedValueOnce('new');
    const { result } = renderHook(() => usePolledData(fetcher, 1000));

    await act(async () => vi.advanceTimersByTimeAsync(1000));
    expect(result.current.data).toBe('new');

    await act(async () => resolveFirst('old'));
    expect(result.current.data).toBe('new');
  });
});
