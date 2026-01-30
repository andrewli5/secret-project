const MBTA_BASE_URL = 'https://api-v3.mbta.com';

export function createMbtaClient() {
  const baseUrl = MBTA_BASE_URL;
  const apiKey = import.meta.env.VITE_MBTA_API_KEY;

  async function getJson<T>(
    path: string,
    params?: Record<string, string | number | undefined | null>,
  ): Promise<T> {
    const url = new URL(path, baseUrl);

    if (params) {
      for (const [k, v] of Object.entries(params)) {
        if (v === undefined || v === null) continue;
        url.searchParams.set(k, String(v));
      }
    }

    const res = await fetch(url.toString(), {
      headers: apiKey ? { 'X-API-Key': apiKey } : undefined,
    });

    if (!res.ok) {
      throw new Error(`MBTA error ${res.status}: ${await res.text()}`);
    }

    return (await res.json()) as T;
  }

  return { getJson };
}
