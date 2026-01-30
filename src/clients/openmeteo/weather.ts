import { fetchWeatherApi } from 'openmeteo';

const params = {
  latitude: 42.35,
  longitude: -71.12,
  daily: ['temperature_2m_min', 'temperature_2m_max', 'weather_code'],
  current: [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'wind_speed_10m',
    'is_day',
    'weather_code',
  ],
  timezone: 'America/New_York',
  forecast_days: 1,
  wind_speed_unit: 'mph',
  temperature_unit: 'fahrenheit',
  precipitation_unit: 'inch',
} as const;

const url = 'https://api.open-meteo.com/v1/forecast';

export type WeatherData = {
  current: {
    time: Date;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    is_day: boolean;
    weather_code: number;
  };
  daily: {
    time: Date[];
    temperature_2m_min: Float32Array;
    temperature_2m_max: Float32Array;
    weather_code: Float32Array;
  };
};

const buildDailyTimes = (
  start: number,
  end: number,
  interval: number,
  utcOffsetSeconds: number,
): Date[] => {
  const len = Math.floor((end - start) / interval);
  return Array.from(
    { length: len },
    (_, i) => new Date((start + i * interval + utcOffsetSeconds) * 1000),
  );
};

export const getWeatherData = async (): Promise<WeatherData> => {
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  if (!response) {
    throw new Error('No response from Open-Meteo');
  }

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current();
  const daily = response.daily();
  if (!current || !daily) {
    throw new Error('Missing current or daily data in Open-Meteo response');
  }

  const dailyTimeStart = Number(daily.time());
  const dailyTimeEnd = Number(daily.timeEnd());
  const dailyInterval = daily.interval();

  const data: WeatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0)!.value(),
      relative_humidity_2m: current.variables(1)!.value(),
      apparent_temperature: current.variables(2)!.value(),
      wind_speed_10m: current.variables(3)!.value(),
      is_day: Boolean(current.variables(4)!.value()),
      weather_code: current.variables(5)!.value(),
    },
    daily: {
      time: buildDailyTimes(dailyTimeStart, dailyTimeEnd, dailyInterval, utcOffsetSeconds),
      temperature_2m_min: daily.variables(0)?.valuesArray() || new Float32Array([0]),
      temperature_2m_max: daily.variables(1)?.valuesArray() || new Float32Array([0]),
      weather_code: daily.variables(2)?.valuesArray() || new Float32Array([0]),
    },
  };

  return data;
};
