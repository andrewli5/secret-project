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

const buildParams = (coords: Coordinates) => ({
  // default to Boston, MA if geolocation is not available
  latitude: coords.latitude || 42.3555,
  longitude: coords.longitude || -71.0565, 
  daily: ['temperature_2m_min', 'temperature_2m_max'],
  current: ['temperature_2m', 'apparent_temperature', 'is_day', 'weather_code'],
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
  };
  daily: {
    temperature_2m_min: Float32Array;
    temperature_2m_max: Float32Array;
  };
};

export const getWeatherData = async (): Promise<WeatherData> => {
  const coords = await getCurrentPosition();
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

  const data: WeatherData = {
    current: {
      time: new Date(Number(current.time()) * 1000),
      temperature_2m: current.variables(0)!.value(),
      apparent_temperature: current.variables(1)!.value(),
      is_day: Boolean(current.variables(2)!.value()),
      weather_code: current.variables(3)!.value(),
    },
    daily: {
      temperature_2m_min: daily.variables(0)?.valuesArray() || new Float32Array([0]),
      temperature_2m_max: daily.variables(1)?.valuesArray() || new Float32Array([0]),
    },
  };

  return data;
};
