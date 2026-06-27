import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { usePolledData } from './usePolledData';

describe('usePolledData', () => {
  it('exposes data once the fetcher resolves', async () => {
    const fetcher = vi.fn().mockResolvedValue('hi');
    const { result } = renderHook(() => usePolledData(fetcher));

    expect(result.current.data).toBeUndefined();
    await waitFor(() => expect(result.current.data).toBe('hi'));
    expect(result.current.error).toBeUndefined();
  });

  it('captures a rejected fetcher as an Error', async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error('boom'));
    const { result } = renderHook(() => usePolledData(fetcher));

    await waitFor(() => expect(result.current.error?.message).toBe('boom'));
    expect(result.current.data).toBeUndefined();
  });

  it('wraps a non-Error rejection in an Error', async () => {
    const fetcher = vi.fn().mockRejectedValue('nope');
    const { result } = renderHook(() => usePolledData(fetcher));

    await waitFor(() => expect(result.current.error?.message).toBe('nope'));
  });
});
