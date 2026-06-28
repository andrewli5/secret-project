// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Badge, Box, Card, Divider, Group, Paper, Skeleton, Stack, Text } from '@mantine/core';
import { WeatherIcon } from '@/assets/weather/weatherIcons';
import { getWeatherText } from '@/assets/weather/weatherText';
import { adjustWeatherCode, getWeatherData, type WeatherData } from '@/clients/nws/weather';
import { usePolledData } from '@/hooks/usePolledData';
import { GEIST_FONT } from '@/theme';
import { Figure } from '../Figure';
import { WidgetCard } from '../WidgetCard';

const WEATHER_REFRESH_MS = 5 * 60 * 1000;

const detailRows = (weatherData: WeatherData) => [
  { label: 'feels', color: 'violet', value: weatherData.current.apparent_temperature },
  { label: 'high', color: 'red', value: weatherData.daily.temperature_2m_max[0] },
  { label: 'low', color: 'blue', value: weatherData.daily.temperature_2m_min[0] },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function WeatherForecast({ daily }: { daily: WeatherData['daily'] }) {
  return (
    <Group grow gap="xs" wrap="nowrap">
      {daily.time.slice(1).map((date, i) => {
        const idx = i + 1;
        const dayCode = adjustWeatherCode(
          daily.weather_code[idx] ?? 0,
          daily.precipitation_probability_max[idx] ?? 0,
        );
        const high = Math.round(daily.temperature_2m_max[idx] ?? 0);
        const low = Math.round(daily.temperature_2m_min[idx] ?? 0);

        return (
          <Stack
            key={date.toISOString()}
            gap={4}
            align="center"
            bg="var(--mantine-color-default-hover)"
            p="xs"
            bdrs="md"
          >
            <Text size="xs" c="dimmed" ff="system-ui">
              {date.toLocaleDateString(undefined, { weekday: 'short' })}
            </Text>
            <WeatherIcon size={28} code={dayCode} isDay animated={false} />
            <Text size="xs" fw={600} style={{ fontFamily: GEIST_FONT }}>
              {high}°
            </Text>
            <Text size="xs" c="dimmed" style={{ fontFamily: GEIST_FONT }}>
              {low}°
            </Text>
          </Stack>
        );
      })}
    </Group>
  );
}

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

export function Weather() {
  const { data: weatherData, error } = usePolledData(getWeatherData, WEATHER_REFRESH_MS);

  if (error && !weatherData) {
    return (
      <WidgetCard>
        <Card.Section p="md">
          <Text c="red">{error.message}</Text>
        </Card.Section>
      </WidgetCard>
    );
  }

  if (!weatherData) {
    return <WeatherSkeleton />;
  }

  const wmoCode = adjustWeatherCode(
    weatherData.current.weather_code,
    weatherData.daily.precipitation_probability_max[0] ?? 0,
  );

  return (
    <WidgetCard style={{ position: 'relative', overflow: 'hidden' }}>
      <Stack gap={0} pos="relative" style={{ zIndex: 1 }}>
        <Group gap={10}>
          <WeatherIcon size={70} code={wmoCode} isDay={weatherData.current.is_day} />
          <Text size="3rem">{getWeatherText(wmoCode)}</Text>
        </Group>
        <Group gap={50} wrap="nowrap">
          <Box>
            <Figure
              figure={Math.round(weatherData.current.temperature_2m).toString()}
              unit="°f"
              unitSize="3.5rem"
              size="12rem"
              fw={300}
            />
          </Box>
          <Paper radius="lg" p="md" bg="var(--mantine-color-default-hover)">
            <Stack gap={3}>
              {detailRows(weatherData).map(({ label, color, value }) => (
                <Group key={label} gap={20} wrap="nowrap">
                  <Badge flex={1} variant="light" color={color} size="lg" ff="system-ui">
                    {label}
                  </Badge>
                  <Figure
                    figure={Math.round(value ?? 0).toString()}
                    unit="°f"
                    unitSize="1.2rem"
                    size="2rem"
                  />
                </Group>
              ))}
            </Stack>
          </Paper>
        </Group>
        {/* <Divider my="md" />
        <WeatherForecast daily={weatherData.daily} /> */}
      </Stack>
    </WidgetCard>
  );
}
