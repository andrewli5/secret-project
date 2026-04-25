import ClearDay from '@bybas/weather-icons/design/fill/animation-ready/clear-day.svg';
import ClearNight from '@bybas/weather-icons/design/fill/animation-ready/clear-night.svg';
import PartlyCloudyDay from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-day.svg';
import PartlyCloudyNight from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-night.svg';
import Overcast from '@bybas/weather-icons/design/fill/animation-ready/overcast.svg';
import FogDay from '@bybas/weather-icons/design/fill/animation-ready/fog-day.svg';
import FogNight from '@bybas/weather-icons/design/fill/animation-ready/fog-night.svg';
import Raindrops from '@bybas/weather-icons/design/fill/animation-ready/raindrops.svg';
import Raindrop from '@bybas/weather-icons/design/fill/animation-ready/raindrop.svg';
import Snowflake from '@bybas/weather-icons/design/fill/animation-ready/snowflake.svg';
import Hail from '@bybas/weather-icons/design/fill/animation-ready/hail.svg';
import Lightning from '@bybas/weather-icons/design/fill/animation-ready/lightning-bolt.svg';
import NotAvailable from '@bybas/weather-icons/design/fill/animation-ready/not-available.svg';

import StaticClearDay from '@bybas/weather-icons/design/fill/export/wi_clear-day.svg';
import StaticClearNight from '@bybas/weather-icons/design/fill/export/wi_clear-night.svg';
import StaticPartlyCloudyDay from '@bybas/weather-icons/design/fill/export/wi_partly-cloudy-day.svg';
import StaticPartlyCloudyNight from '@bybas/weather-icons/design/fill/export/wi_partly-cloudy-night.svg';
import StaticOvercast from '@bybas/weather-icons/design/fill/export/wi_overcast.svg';
import StaticFogDay from '@bybas/weather-icons/design/fill/export/wi_fog-day.svg';
import StaticFogNight from '@bybas/weather-icons/design/fill/export/wi_fog-night.svg';
import StaticRaindrops from '@bybas/weather-icons/design/fill/export/wi_raindrops.svg';
import StaticRaindrop from '@bybas/weather-icons/design/fill/export/wi_raindrop.svg';
import StaticSnowflake from '@bybas/weather-icons/design/fill/export/wi_snowflake.svg';
import StaticHail from '@bybas/weather-icons/design/fill/export/wi_hail.svg';
import StaticLightning from '@bybas/weather-icons/design/fill/export/wi_lightning-bolt.svg';

import type { JSX } from 'react';

type Icon = string;
type IconSet = { day: Icon; night: Icon; static_day: Icon; static_night: Icon };
type IconEntry = { dayNight: IconSet } | { all: Icon; static_all: Icon };

const dn = (day: Icon, night: Icon, static_day: Icon, static_night: Icon): IconEntry => ({
  dayNight: { day, night, static_day, static_night },
});
const all = (icon: Icon, staticIcon: Icon): IconEntry => ({ all: icon, static_all: staticIcon });

const wmoEntries: Record<number, IconEntry> = {
  0: dn(ClearDay, ClearNight, StaticClearDay, StaticClearNight),
  1: dn(ClearDay, ClearNight, StaticClearDay, StaticClearNight),
  2: dn(PartlyCloudyDay, PartlyCloudyNight, StaticPartlyCloudyDay, StaticPartlyCloudyNight),
  3: all(Overcast, StaticOvercast),
  45: dn(FogDay, FogNight, StaticFogDay, StaticFogNight),
  48: dn(FogDay, FogNight, StaticFogDay, StaticFogNight),
  51: all(Raindrops, StaticRaindrops),
  53: all(Raindrops, StaticRaindrops),
  55: all(Raindrops, StaticRaindrops),
  56: all(Hail, StaticHail),
  57: all(Hail, StaticHail),
  61: all(Raindrop, StaticRaindrop),
  63: all(Raindrops, StaticRaindrops),
  65: all(Raindrops, StaticRaindrops),
  66: all(Hail, StaticHail),
  67: all(Hail, StaticHail),
  71: all(Snowflake, StaticSnowflake),
  73: all(Snowflake, StaticSnowflake),
  75: all(Snowflake, StaticSnowflake),
  77: all(Snowflake, StaticSnowflake),
  80: all(Raindrop, StaticRaindrop),
  81: all(Raindrops, StaticRaindrops),
  82: all(Raindrops, StaticRaindrops),
  85: all(Snowflake, StaticSnowflake),
  86: all(Snowflake, StaticSnowflake),
  95: all(Lightning, StaticLightning),
  96: all(Lightning, StaticLightning),
  99: all(Lightning, StaticLightning),
};

function resolveIcon(code: number, isDay: boolean, animated: boolean): Icon {
  const entry = wmoEntries[code];
  if (!entry) {
    return NotAvailable;
  }

  if ('all' in entry) {
    return animated ? entry.all : entry.static_all;
  }

  const { dayNight } = entry;
  if (animated) {
    return isDay ? dayNight.day : dayNight.night;
  }
  return isDay ? dayNight.static_day : dayNight.static_night;
}

type Props = {
  code: number;
  isDay: boolean;
  size?: number;
  animated?: boolean;
};

export function WeatherIcon({ code, isDay, size = 64, animated = true }: Props): JSX.Element {
  const src = resolveIcon(code, isDay, animated);
  return <img src={src} width={size} height={size} alt="weather icon" />;
}
