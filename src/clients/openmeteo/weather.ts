import { fetchWeatherApi } from 'openmeteo';

type Coordinates = {
  latitude: number;
  longitude: number;
};

const geolocationOptions: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

export const getCurrentPosition = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`));
      },
      geolocationOptions,
    );
  });
};

// default to Boston, MA if geolocation is not available
const DEFAULT_COORDS: Coordinates = {
  latitude: 42.3555,
  longitude: -71.0565,
};

const buildParams = (coords: Coordinates) => ({
  latitude: coords.latitude,
  longitude: coords.longitude,
  daily: [
    'temperature_2m_min',
    'temperature_2m_max',
    'weather_code',
    'precipitation_probability_max',
    'sunshine_duration',
  ],
  forecast_days: 8,
  current: ['temperature_2m', 'apparent_temperature', 'is_day', 'weather_code', 'precipitation'],
  timezone: 'auto',
  temperature_unit: 'fahrenheit',
});

const url = 'https://api.open-meteo.com/v1/forecast';

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
    temperature_2m_min: Float32Array;
    temperature_2m_max: Float32Array;
    weather_code: Float32Array;
    precipitation_probability_max: Float32Array;
    sunshine_duration: Float32Array;
  };
};

const NON_PRECIPITATION_CODES = new Set([0, 1, 2, 3, 45, 48]);
const OVERCAST_CODES = new Set([3]);
const RAIN_CODE = 61;
const PARTLY_CLOUDY_CODE = 2;
const SUNSHINE_THRESHOLD_SECONDS = 4 * 3600;

export function adjustWeatherCode(
  code: number,
  precipitationProbability: number,
  sunshineDuration?: number,
): number {
  if (NON_PRECIPITATION_CODES.has(code) && precipitationProbability > 60) {
    return RAIN_CODE;
  }
  if (
    OVERCAST_CODES.has(code) &&
    sunshineDuration !== undefined &&
    sunshineDuration > SUNSHINE_THRESHOLD_SECONDS
  ) {
    return PARTLY_CLOUDY_CODE;
  }
  return code;
}

export const getWeatherData = async (): Promise<WeatherData> => {
  let coords: Coordinates;
  try {
    coords = await getCurrentPosition();
  } catch {
    coords = DEFAULT_COORDS;
  }
  const params = buildParams(coords);
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];

  if (!response) {
    throw new Error('No response from Open-Meteo');
  }

  const current = response.current();
  const daily = response.daily();
  if (!current || !daily) {
    throw new Error('Missing current or daily data in Open-Meteo response');
  }

  const dailyTimeStart = Number(daily.time());
  const dailyTimeEnd = Number(daily.timeEnd());
  const dailyInterval = daily.interval();
  const dailyTimes: Date[] = [];
  for (let t = dailyTimeStart; t < dailyTimeEnd; t += dailyInterval) {
    dailyTimes.push(new Date(t * 1000));
  }

  const currentVar = (index: number) => {
    const v = current.variables(index);
    if (!v) {
      throw new Error(`Missing current variable at index ${index}`);
    }
    return v.value();
  };

  const dailyArray = (index: number) =>
    daily.variables(index)?.valuesArray() ?? new Float32Array([0]);

  const data: WeatherData = {
    current: {
      time: new Date(Number(current.time()) * 1000),
      temperature_2m: currentVar(0),
      apparent_temperature: currentVar(1),
      is_day: Boolean(currentVar(2)),
      weather_code: currentVar(3),
      precipitation: currentVar(4),
    },
    daily: {
      time: dailyTimes,
      temperature_2m_min: dailyArray(0),
      temperature_2m_max: dailyArray(1),
      weather_code: dailyArray(2),
      precipitation_probability_max: dailyArray(3),
      sunshine_duration: dailyArray(4),
    },
  };

  return data;
};
