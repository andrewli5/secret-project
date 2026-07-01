type Coordinates = {
  latitude: number;
  longitude: number;
};

const ALLSTON_COORDS: Coordinates = {
  latitude: 42.355,
  longitude: -71.131,
};

const NWS_BASE = 'https://api.weather.gov';

const NWS_HEADERS: HeadersInit = {
  Accept: 'application/geo+json',
};

export type WeatherData = {
  current: {
    time: Date;
    temperature_2m: number;
    apparent_temperature: number;
    is_day: boolean;
    weather_code: number;
    precipitation: number;
  };
  daily: {
    time: Date[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    weather_code: number[];
    precipitation_probability_max: number[];
  };
};

const NON_PRECIPITATION_CODES = new Set([0, 1, 2, 3, 45, 48]);
const RAIN_CODE = 61;

export function adjustWeatherCode(code: number, precipitationProbability: number): number {
  if (NON_PRECIPITATION_CODES.has(code) && precipitationProbability > 60) {
    return RAIN_CODE;
  }
  return code;
}

// Coverage qualifiers below "likely" (e.g. a "chance" of thunderstorms somewhere
// in an 11-hour window) shouldn't be reported as active weather.
const LOW_CONFIDENCE_COVERAGE = new Set([
  'slight_chance',
  'chance',
  'isolated',
  'scattered',
  'areas',
  'patchy',
]);

const cToF = (c: number): number => (c * 9) / 5 + 32;

// biome-ignore lint/suspicious/noExplicitAny: external NWS JSON has no useful static shape
const fetchJson = async (url: string): Promise<Record<string, any>> => {
  const res = await fetch(url, { headers: NWS_HEADERS });
  if (!res.ok) {
    throw new Error(`NWS request failed (${res.status}) for ${url}`);
  }
  return res.json();
};

export function parseDurationMs(iso: string): number {
  const m = /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?)?$/.exec(iso);
  if (!m) {
    return 0;
  }
  const [, d, h, min] = m;
  return (Number(d ?? 0) * 24 + Number(h ?? 0)) * 3600_000 + Number(min ?? 0) * 60_000;
}

type GridValue<T> = { validTime: string; value: T };

function parseWindow(validTime: string): { start: number; end: number } {
  const [startIso, durationIso] = validTime.split('/');
  const start = new Date(startIso ?? '').getTime();
  return { start, end: start + parseDurationMs(durationIso ?? 'PT0H') };
}

export function valueAt<T>(values: GridValue<T>[], at: number): T | undefined {
  let fallback: T | undefined;
  for (const v of values) {
    const { start, end } = parseWindow(v.validTime);
    if (at >= start && at < end) {
      return v.value;
    }
    if (start <= at) {
      fallback = v.value;
    }
  }
  return fallback ?? values[0]?.value;
}

const WEATHER_ENUM_TO_WMO: Record<string, number> = {
  blowing_dust: 6,
  blowing_sand: 6,
  blowing_snow: 73,
  drizzle: 53,
  fog: 45,
  freezing_fog: 48,
  freezing_drizzle: 56,
  freezing_rain: 66,
  freezing_spray: 66,
  frost: 48,
  hail: 89,
  haze: 5,
  ice_crystals: 48,
  ice_fog: 48,
  rain: 63,
  rain_showers: 81,
  sleet: 79,
  smoke: 4,
  snow: 73,
  snow_showers: 85,
  thunderstorms: 95,
  volcanic_ash: 4,
  water_spouts: 95,
};

const INTENSITY_VARIANTS: Record<number, { light?: number; heavy?: number }> = {
  53: { light: 51, heavy: 55 },
  56: { heavy: 57 },
  63: { light: 61, heavy: 65 },
  66: { heavy: 67 },
  73: { light: 71, heavy: 75 },
  81: { light: 80, heavy: 82 },
  85: { heavy: 86 },
};

type WeatherCell = { weather: string | null; intensity: string | null; coverage?: string | null };

export function gridWeatherToWmoCode(cells: WeatherCell[] | null | undefined): number {
  const cell = cells?.find((c) => c.weather && !LOW_CONFIDENCE_COVERAGE.has(c.coverage ?? ''));
  if (!cell?.weather) {
    return 0;
  }
  const base = WEATHER_ENUM_TO_WMO[cell.weather] ?? 0;
  const variants = INTENSITY_VARIANTS[base];
  if (variants) {
    if (cell.intensity === 'light' && variants.light != null) {
      return variants.light;
    }
    if (cell.intensity === 'heavy' && variants.heavy != null) {
      return variants.heavy;
    }
  }
  return base;
}

export function skyCoverToWmoCode(percent: number | null | undefined): number {
  if (percent == null || percent < 12) {
    return 0;
  }
  if (percent < 25) {
    return 1;
  }
  if (percent < 88) {
    return 2;
  }
  return 3;
}

export function resolveWmoCode(
  cells: WeatherCell[] | null | undefined,
  skyCoverPercent: number | null | undefined,
): number {
  const gridCode = gridWeatherToWmoCode(cells);
  if (gridCode !== 0) {
    return gridCode;
  }
  return skyCoverToWmoCode(skyCoverPercent);
}

type StationObservation = {
  textDescription: string | null;
  temperatureC: number | null;
  apparentTemperatureC: number | null;
  cloudLayerAmounts: (string | null)[];
};

const CLOUD_AMOUNT_TO_PERCENT: Record<string, number> = {
  SKC: 0,
  CLR: 0,
  FEW: 15,
  SCT: 40,
  BKN: 75,
  OVC: 100,
  VV: 100,
};

function cloudLayersToSkyCoverPercent(amounts: (string | null)[]): number {
  return amounts.reduce(
    (max, amount) => Math.max(max, CLOUD_AMOUNT_TO_PERCENT[amount ?? ''] ?? 0),
    0,
  );
}

const TEXT_WEATHER_CODES: [pattern: RegExp, code: number][] = [
  [/thunderstorm/i, 95],
  [/freezing drizzle/i, 56],
  [/freezing rain/i, 66],
  [/drizzle/i, 53],
  [/snow/i, 73],
  [/sleet|ice pellets/i, 79],
  [/hail/i, 89],
  [/rain|showers/i, 63],
  [/fog|mist/i, 45],
  [/haze/i, 5],
  [/smoke/i, 4],
  [/dust|sand/i, 6],
];

export function observationTextToWmoCode(text: string | null | undefined): number | undefined {
  if (!text) {
    return undefined;
  }
  for (const [pattern, code] of TEXT_WEATHER_CODES) {
    if (!pattern.test(text)) {
      continue;
    }
    const variants = INTENSITY_VARIANTS[code];
    if (variants) {
      if (/light/i.test(text) && variants.light != null) {
        return variants.light;
      }
      if (/heavy/i.test(text) && variants.heavy != null) {
        return variants.heavy;
      }
    }
    return code;
  }
  return undefined;
}

function resolveObservationWmoCode(observation: StationObservation): number {
  return (
    observationTextToWmoCode(observation.textDescription) ??
    skyCoverToWmoCode(cloudLayersToSkyCoverPercent(observation.cloudLayerAmounts))
  );
}

const fetchLatestObservation = async (gridUrl: string): Promise<StationObservation | undefined> => {
  try {
    const stations = await fetchJson(`${gridUrl}/stations`);
    const stationId = stations?.features?.[0]?.properties?.stationIdentifier;
    if (!stationId) {
      return undefined;
    }
    const obs = await fetchJson(`${NWS_BASE}/stations/${stationId}/observations/latest`);
    const p = obs?.properties;
    if (!p) {
      return undefined;
    }
    return {
      textDescription: p.textDescription ?? null,
      temperatureC: p.temperature?.value ?? null,
      apparentTemperatureC:
        p.heatIndex?.value ?? p.windChill?.value ?? p.temperature?.value ?? null,
      cloudLayerAmounts: (p.cloudLayers ?? []).map(
        (l: { amount?: string | null }) => l?.amount ?? null,
      ),
    };
  } catch {
    return undefined;
  }
};

function isDaytimeAt(at: number): boolean {
  const hour = new Date(at).getHours();
  return hour >= 6 && hour < 18;
}

const localDateKey = (date: Date): string => {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};

const findGridUrl = async (coords: Coordinates): Promise<string> => {
  const points = await fetchJson(
    `${NWS_BASE}/points/${coords.latitude.toFixed(4)},${coords.longitude.toFixed(4)}`,
  );
  const gridUrl: string | undefined = points?.properties?.forecastGridData;
  if (!gridUrl) {
    throw new Error('NWS /points response missing forecastGridData link');
  }
  return gridUrl;
};

function dailyByDate(values: GridValue<number>[]): Map<string, number> {
  const out = new Map<string, number>();
  for (const v of values) {
    const key = localDateKey(new Date(v.validTime.split('/')[0] ?? ''));
    if (!out.has(key)) {
      out.set(key, v.value);
    }
  }
  return out;
}

export const getWeatherData = async (): Promise<WeatherData> => {
  const gridUrl = await findGridUrl(ALLSTON_COORDS);
  const [grid, observation] = await Promise.all([
    fetchJson(gridUrl),
    fetchLatestObservation(gridUrl),
  ]);
  const p = grid?.properties;
  if (!p) {
    throw new Error('NWS forecastGridData response missing properties');
  }

  const layer = <T>(name: string): GridValue<T>[] => p[name]?.values ?? [];
  const now = Date.now();

  const curPop = valueAt<number>(layer('probabilityOfPrecipitation'), now);

  const curTempC = observation?.temperatureC ?? valueAt<number>(layer('temperature'), now);
  const curFeelsC =
    observation?.apparentTemperatureC ?? valueAt<number>(layer('apparentTemperature'), now);
  const currentTempF = curTempC != null ? cToF(curTempC) : 0;
  const currentWmoCode = observation
    ? resolveObservationWmoCode(observation)
    : resolveWmoCode(
        valueAt<WeatherCell[]>(layer('weather'), now),
        valueAt<number>(layer('skyCover'), now),
      );

  const highs = dailyByDate(layer<number>('maxTemperature'));
  const lows = dailyByDate(layer<number>('minTemperature'));
  const dailyPop = layer<number>('probabilityOfPrecipitation');
  const dailyWeather = layer<WeatherCell[]>('weather');
  const dailySky = layer<number>('skyCover');

  const dayKeys = [...new Set([...highs.keys(), ...lows.keys()])].sort().slice(0, 8);

  const time: Date[] = [];
  const temperature_2m_max: number[] = [];
  const temperature_2m_min: number[] = [];
  const weather_code: number[] = [];
  const precipitation_probability_max: number[] = [];

  for (const key of dayKeys) {
    const noon = new Date(`${key}T12:00:00`).getTime();
    const hi = highs.get(key);
    const lo = lows.get(key);
    time.push(new Date(`${key}T00:00:00`));
    temperature_2m_max.push(cToF(hi ?? lo ?? 0));
    temperature_2m_min.push(cToF(lo ?? hi ?? 0));
    weather_code.push(
      resolveWmoCode(valueAt<WeatherCell[]>(dailyWeather, noon), valueAt<number>(dailySky, noon)),
    );
    precipitation_probability_max.push(valueAt<number>(dailyPop, noon) ?? 0);
  }

  return {
    current: {
      time: new Date(now),
      temperature_2m: currentTempF,
      apparent_temperature: curFeelsC != null ? cToF(curFeelsC) : currentTempF,
      is_day: isDaytimeAt(now),
      weather_code: currentWmoCode,
      precipitation: curPop ?? 0,
    },
    daily: {
      time,
      temperature_2m_max,
      temperature_2m_min,
      weather_code,
      precipitation_probability_max,
    },
  };
};
