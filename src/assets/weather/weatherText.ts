export const WMO_CODE_TO_TEXT: Record<number, string> = {
  // Clear / clouds
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',

  // Fog
  45: 'Fog',
  48: 'Freezing fog',

  // Drizzle
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',

  // Freezing drizzle
  56: 'Light freezing drizzle',
  57: 'Heavy freezing drizzle',

  // Rain
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',

  // Freezing rain
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',

  // Snow
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',

  // Snow grains
  77: 'Snow grains',

  // Showers
  80: 'Light rain showers',
  81: 'Rain showers',
  82: 'Violent rain showers',

  85: 'Light snow showers',
  86: 'Heavy snow showers',

  // Thunderstorms
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Severe thunderstorm with hail',
};

export function getWeatherText(code: number): string {
  return WMO_CODE_TO_TEXT[code] || 'Not available';
}
