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
  it('ticks every second and shows new predictions without a refresh', () => {
    vi.useFakeTimers();
    const now = new Date('2026-06-27T12:00:00Z');
    vi.setSystemTime(now);
    vi.mocked(useTrainTimes).mockReturnValue({
      ...trainData,
      arrivals: { 0: [new Date(now.getTime() + 602_000).toISOString()] },
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
      arrivals: { 0: [new Date(now.getTime() + 620_000).toISOString()] },
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
      arrivals: { 0: [new Date(now.getTime() + 500).toISOString()] },
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
