import { WeatherIcon } from '@/assets/weather/weatherIcons';
import { getWeatherText } from '@/assets/weather/weatherText';
import { adjustWeatherCode, type WeatherData } from '@/clients/openmeteo/weather';
import { Badge, Box, Card, Divider, Group, Skeleton, Stack, Text } from '@mantine/core';
import { WidgetCard } from '../WidgetCard';
import { Figure } from '../Figure';

type Props = {
  weatherData?: WeatherData;
};

const detailRows = (weatherData?: WeatherData) => [
  { label: 'feels', color: 'violet', value: weatherData?.current.apparent_temperature },
  { label: 'high', color: 'red', value: weatherData?.daily.temperature_2m_max[0] },
  { label: 'low', color: 'blue', value: weatherData?.daily.temperature_2m_min[0] },
];

function WeatherSkeleton() {
  return (
    <WidgetCard>
      <Card.Section p="md">
        <Stack gap="md">
          <Skeleton height={32} width={150} />
          <Skeleton height={100} width={200} />
          <Stack gap={3}>
            <Skeleton height={28} />
            <Skeleton height={28} />
            <Skeleton height={28} />
          </Stack>
        </Stack>
      </Card.Section>
    </WidgetCard>
  );
}

export function Weather({ weatherData }: Props) {
  if (!weatherData) {
    return <WeatherSkeleton />;
  }

  const rawCode = weatherData.current.weather_code ?? 0;
  const currentPrecipProb = weatherData.daily.precipitation_probability_max[0] ?? 0;
  const currentSunshine = weatherData.daily.sunshine_duration[0] ?? 0;
  const wmoCode = adjustWeatherCode(rawCode, currentPrecipProb, currentSunshine);
  const isDay = weatherData.current.is_day ?? false;

  return (
    <WidgetCard style={{ position: 'relative', overflow: 'hidden' }}>
      <Box
        style={{
          position: 'absolute',
          top: -150,
          left: -140,
          opacity: 0.05,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <WeatherIcon size={700} code={wmoCode} isDay={isDay} animated={false} />
      </Box>
      <Stack gap="md" style={{ position: 'relative', zIndex: 1 }}>
        <Text size="3rem" ml="xs">
          {getWeatherText(wmoCode)}
        </Text>
        <Group gap={40} wrap="nowrap">
          <Figure
            number={Math.round(weatherData.current.temperature_2m ?? 0)}
            unit="°f"
            unitSize="2.5rem"
            size="10rem"
            fw={300}
          />
          <Stack gap={3}>
            {detailRows(weatherData).map(({ label, color, value }) => (
              <Group key={label} justify="space-between" gap={8} wrap="nowrap">
                <Badge variant="light" color={color} size="lg" ff="system-ui">
                  {label}
                </Badge>
                <Figure number={Math.round(value ?? 0)} unit="°f" unitSize="1.2rem" size="2rem" />
              </Group>
            ))}
          </Stack>
        </Group>
        <Divider />
        <Group grow gap="xs" wrap="nowrap">
          {weatherData.daily.time.slice(1).map((date, i) => {
            const idx = i + 1;
            const dayCode = adjustWeatherCode(
              weatherData.daily.weather_code[idx] ?? 0,
              weatherData.daily.precipitation_probability_max[idx] ?? 0,
              weatherData.daily.sunshine_duration[idx],
            );
            const high = Math.round(weatherData.daily.temperature_2m_max[idx] ?? 0);
            const low = Math.round(weatherData.daily.temperature_2m_min[idx] ?? 0);
            const dayLabel = date.toLocaleDateString(undefined, { weekday: 'short' });

            return (
              <Stack
                key={dayLabel}
                gap={4}
                align="center"
                bg="var(--mantine-color-default-hover)"
                p="xs"
                style={{ borderRadius: 'var(--mantine-radius-md)' }}
              >
                <Text size="xs" c="dimmed" ff="system-ui">
                  {dayLabel}
                </Text>
                <WeatherIcon size={28} code={dayCode} isDay animated={false} />
                <Text size="xs" fw={600} style={{ fontFamily: 'Geist, sans-serif' }}>
                  {high}°
                </Text>
                <Text size="xs" c="dimmed" style={{ fontFamily: 'Geist, sans-serif' }}>
                  {low}°
                </Text>
              </Stack>
            );
          })}
        </Group>
      </Stack>
    </WidgetCard>
  );
}
