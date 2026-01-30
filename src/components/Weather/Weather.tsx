import { WeatherIcon } from '@/assets/weather/weatherIcons';
import { getWeatherText } from '@/assets/weather/weatherText';
import { getWeatherData, WeatherData } from '@/clients/openmeteo/weather';
import { Card, Group, Paper, Stack, Text } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { WidgetCard } from '../WidgetCard';
import { Figure } from '../Figure';

const REFRESH_MS = 5 * 60 * 1000; // 5 minutes

export function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const wmoCode = weatherData?.current.weather_code ?? 0;

  const fetchWeather = useCallback(async () => {
    const data = await getWeatherData();
    setWeatherData(data);
  }, []);

  useEffect(() => {
    fetchWeather();
    const intervalId = setInterval(fetchWeather, REFRESH_MS);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <WidgetCard>
      <Card.Section p="sm">
        <Group gap={6}>
          <WeatherIcon code={wmoCode} isDay={weatherData?.current.is_day || false} />
          <Text>{getWeatherText(wmoCode)}</Text>
        </Group>
      </Card.Section>
      <Card.Section px="sm">
        <Group justify="space-evenly">
          <Stack align="center" gap={0}>
            <Text size="xs" mb="-md">
              actual
            </Text>
            <Figure number={Math.round(weatherData?.current.temperature_2m ?? 0)} unit="°f" />
          </Stack>
          <Stack align="center" gap={0}>
            <Text size="xs" mb="-md">
              feels like
            </Text>
            <Figure number={Math.round(weatherData?.current.apparent_temperature ?? 0)} unit="°f" />
          </Stack>
        </Group>
      </Card.Section>
    </WidgetCard>
  );
}
