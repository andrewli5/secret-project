import { useEffect, useState } from 'react';

export function usePolledData<T>(fetcher: () => Promise<T>, intervalMs?: number) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const next = await fetcher();
        if (cancelled) {
          return;
        }
        setData(next);
        setError(undefined);
      } catch (err) {
        if (cancelled) {
          return;
        }
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
