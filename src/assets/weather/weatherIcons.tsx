import ClearDay from '@bybas/weather-icons/design/fill/animation-ready/clear-day.svg';
import ClearNight from '@bybas/weather-icons/design/fill/animation-ready/clear-night.svg';
import PartlyCloudyDay from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-day.svg';
import PartlyCloudyNight from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-night.svg';
import Overcast from '@bybas/weather-icons/design/fill/animation-ready/overcast.svg';
import FogDay from '@bybas/weather-icons/design/fill/animation-ready/fog-day.svg';
import FogNight from '@bybas/weather-icons/design/fill/animation-ready/fog-night.svg';
import Drizzle from '@bybas/weather-icons/design/fill/animation-ready/drizzle.svg';
import Rain from '@bybas/weather-icons/design/fill/animation-ready/rain.svg';
import Snow from '@bybas/weather-icons/design/fill/animation-ready/snow.svg';
import Sleet from '@bybas/weather-icons/design/fill/animation-ready/sleet.svg';
import ThunderDay from '@bybas/weather-icons/design/fill/animation-ready/thunderstorms-day-rain.svg';
import ThunderNight from '@bybas/weather-icons/design/fill/animation-ready/thunderstorms-night-rain.svg';
import NotAvailable from '@bybas/weather-icons/design/fill/animation-ready/not-available.svg';
import { JSX } from 'react';

type Icon = string;

const dayNight = (day: Icon, night: Icon) => (isDay: boolean) => (isDay ? day : night);

const wmoMap: Record<number, (isDay: boolean) => Icon> = {
  // clear/clouds
  0: dayNight(ClearDay, ClearNight),
  1: dayNight(ClearDay, ClearNight),
  2: dayNight(PartlyCloudyDay, PartlyCloudyNight),
  3: () => Overcast,

  // fog
  45: dayNight(FogDay, FogNight),
  48: dayNight(FogDay, FogNight),

  // drizzle
  51: () => Drizzle,
  53: () => Drizzle,
  55: () => Drizzle,

  // rain
  61: () => Rain,
  63: () => Rain,
  65: () => Rain,
  80: () => Rain,
  81: () => Rain,
  82: () => Rain,

  // sleet / freezing
  56: () => Sleet,
  57: () => Sleet,
  66: () => Sleet,
  67: () => Sleet,

  // snow
  71: () => Snow,
  73: () => Snow,
  75: () => Snow,
  77: () => Snow,
  85: () => Snow,
  86: () => Snow,

  // thunderstorms
  95: dayNight(ThunderDay, ThunderNight),
  96: dayNight(ThunderDay, ThunderNight),
  99: dayNight(ThunderDay, ThunderNight),
};

type Props = {
  code: number;
  isDay: boolean;
  size?: number;
};

export function WeatherIcon({ code, isDay, size = 64 }: Props): JSX.Element {
  const getIcon = wmoMap[code];
  const src = getIcon ? getIcon(isDay) : NotAvailable;

  return <img src={src} width={size} height={size} alt="weather icon" />;
}
