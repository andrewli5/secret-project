import { WeatherIcon } from '@/assets/weather/weatherIcons';
import { getWeatherText } from '@/assets/weather/weatherText';
import type { WeatherData } from '@/clients/openmeteo/weather';
import { Card, Group, Stack, Text } from '@mantine/core';
import { WidgetCard } from '../WidgetCard';
import { Figure } from '../Figure';
import { LastUpdatedTime } from '../LastUpdatedTime';

type Props = {
  weatherData?: WeatherData;
};

export function Weather({ weatherData }: Props) {
  const wmoCode = weatherData?.current.weather_code ?? 0;
  const isDay = weatherData?.current.is_day ?? false;

  return (
    <WidgetCard>
      <Card.Section p="sm">
        <Group gap={6} align="center">
          <WeatherIcon size={140} code={wmoCode} isDay={isDay} />
          <Text size="3.2rem">{getWeatherText(wmoCode)}</Text>
        </Group>
      </Card.Section>
      <Card.Section px="sm">
        <Group px="md" gap={100} mt="-lg">
          <Stack align="center" gap={0}>
            <Figure
              number={Math.round(weatherData?.current.temperature_2m ?? 0)}
              unit="°f"
              unitSize="lg"
              size="18rem"
            />
          </Stack>
          <Stack gap={0}>
            <Group align="center" justify="space-between" gap={50}>
              <Text size="md">feels like</Text>
              <Figure
                number={Math.round(weatherData?.current.apparent_temperature ?? 0)}
                unit="°f"
                size="3rem"
              />
            </Group>
            <Group align="center" justify="space-between">
              <Text size="md">high</Text>
              <Figure
                number={Math.round(weatherData?.daily.temperature_2m_max[0] ?? 0)}
                unit="°f"
                size="3rem"
              />
            </Group>
            <Group align="center" justify="space-between">
              <Text size="md">low</Text>
              <Figure
                number={Math.round(weatherData?.daily.temperature_2m_min[0] ?? 0)}
                unit="°f"
                size="3rem"
              />
            </Group>
          </Stack>
        </Group>
      </Card.Section>
      <Card.Section px="sm">
        <LastUpdatedTime time={weatherData?.current.time} />
      </Card.Section>
    </WidgetCard>
  );
}
