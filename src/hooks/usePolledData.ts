import { useEffect, useState } from 'react';

export function usePolledData<T>(fetcher: () => Promise<T>, intervalMs?: number) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    let cancelled = false;
    let requestCount = 0;
    let latestAppliedRequestId = 0;

    const load = async () => {
      const requestId = ++requestCount;
      try {
        const next = await fetcher();
        if (cancelled || requestId < latestAppliedRequestId) {
          return;
        }
        latestAppliedRequestId = requestId;
        setData(next);
        setError(undefined);
      } catch (err) {
        if (cancelled || requestId < latestAppliedRequestId) {
          return;
        }
        latestAppliedRequestId = requestId;
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    };

    load();
    const intervalId = intervalMs != null ? setInterval(load, intervalMs) : undefined;

    return () => {
      cancelled = true;
      if (intervalId != null) {
        clearInterval(intervalId);
      }
    };
  }, [fetcher, intervalMs]);

  return { data, error };
}
