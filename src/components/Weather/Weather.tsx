// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Badge, Box, Card, Divider, Group, Paper, Stack, Text } from '@mantine/core';
import type { ComponentType } from 'react';
import { WeatherIcon } from '@/assets/weather/weatherIcons';
import { getWeatherText } from '@/assets/weather/weatherText';
import { adjustWeatherCode, getWeatherData, type WeatherData } from '@/clients/nws/weather';
import { usePolledData } from '@/hooks/usePolledData';
import { useThemed } from '@/hooks/useUiTheme';
import { GEIST_FONT, NEUMORPHIC_RAISED_SUBTLE } from '@/theme';
import { useInlineFonts } from '@/themeFonts';
import type { UiTheme } from '@/uiTheme';
import { ErrorMessage } from '../ErrorMessage';
import { Figure } from '../Figure';
import { LoadingPlaceholder } from '../LoadingPlaceholder';
import { WidgetCard } from '../WidgetCard';
import './weather.css';

const WEATHER_REFRESH_MS = 5 * 60 * 1000;
const WINDOW_TITLE = 'Weather';

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
    <WidgetCard windowTitle={WINDOW_TITLE}>
      <Card.Section p="md">
        <Stack gap="md">
          <LoadingPlaceholder height={32} width={150} />
          <LoadingPlaceholder height={100} width={200} />
          <Stack gap={3}>
            <LoadingPlaceholder height={28} />
            <LoadingPlaceholder height={28} />
            <LoadingPlaceholder height={28} />
          </Stack>
        </Stack>
      </Card.Section>
    </WidgetCard>
  );
}

type IconProps = { code: number; isDay: boolean };

// Neumorphic drifts a large faint icon behind the card; retro shows it small in a picture window
// beside the condition text, which already names it, so it is decorative there.
function DriftingIcon({ code, isDay }: IconProps) {
  return (
    <Box
      pos="absolute"
      top={-90}
      right={0}
      aria-hidden
      className="weather-icon-drift"
      style={{
        opacity: 0.1,
        pointerEvents: 'none',
      }}
    >
      <WeatherIcon size={400} code={code} isDay={isDay} animated={false} />
    </Box>
  );
}

function PictureIcon({ code, isDay }: IconProps) {
  return (
    <Box className="retro-picture">
      <WeatherIcon size={44} code={code} isDay={isDay} animated={false} alt="" />
    </Box>
  );
}

const BACKDROP_ICONS: Record<UiTheme, ComponentType<IconProps> | null> = {
  neumorphic: DriftingIcon,
  retro: null,
};

const INLINE_ICONS: Record<UiTheme, ComponentType<IconProps> | null> = {
  neumorphic: null,
  retro: PictureIcon,
};

type DetailsProps = { children: React.ReactNode };

function FrostedDetails({ children }: DetailsProps) {
  return (
    <Paper
      radius="lg"
      p="md"
      bg="color-mix(in srgb, var(--mantine-color-default-hover) 18%, transparent)"
      style={{
        ...NEUMORPHIC_RAISED_SUBTLE,
        border: '1px solid rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      {children}
    </Paper>
  );
}

function FactsDetails({ children }: DetailsProps) {
  return <Box className="retro-facts">{children}</Box>;
}

const DETAILS: Record<UiTheme, ComponentType<DetailsProps>> = {
  neumorphic: FrostedDetails,
  retro: FactsDetails,
};

type DetailLabelProps = { label: string; color: string };

function BadgeLabel({ label, color }: DetailLabelProps) {
  const { systemUi } = useInlineFonts();
  return (
    <Badge flex={1} variant="light" color={color} size="lg" ff={systemUi}>
      {label}
    </Badge>
  );
}

// Black label text; the color cue moves to a swatch with enough contrast against the well.
function SwatchLabel({ label, color }: DetailLabelProps) {
  return (
    <Text className="retro-label" flex={1}>
      <span aria-hidden className="retro-swatch" data-color={color} />
      {label}
    </Text>
  );
}

const DETAIL_LABELS: Record<UiTheme, ComponentType<DetailLabelProps>> = {
  neumorphic: BadgeLabel,
  retro: SwatchLabel,
};

type Spacing = {
  condition: number;
  details: number;
  row: number;
  wrap: 'wrap' | 'nowrap';
  justify?: 'space-between';
};

// Retro sets the condition line off from the temperature, packs the rows closer so a three-digit
// temperature fits beside them, pushes them to the well's far edge, and moves them below it on
// narrow screens.
const SPACING: Record<UiTheme, Spacing> = {
  neumorphic: { condition: 0, details: 50, row: 20, wrap: 'nowrap' },
  retro: { condition: 8, details: 16, row: 10, wrap: 'wrap', justify: 'space-between' },
};

export function Weather() {
  const { data: weatherData, error } = usePolledData(getWeatherData, WEATHER_REFRESH_MS);
  const BackdropIcon = useThemed(BACKDROP_ICONS);
  const InlineIcon = useThemed(INLINE_ICONS);
  const Details = useThemed(DETAILS);
  const DetailLabel = useThemed(DETAIL_LABELS);
  const spacing = useThemed(SPACING);

  if (error && !weatherData) {
    return (
      <WidgetCard windowTitle={WINDOW_TITLE}>
        <Card.Section p="md">
          <ErrorMessage>{error.message}</ErrorMessage>
        </Card.Section>
      </WidgetCard>
    );
  }

  if (!weatherData) {
    return <WeatherSkeleton />;
  }

  const wmoCode = weatherData.current.weather_code;
  const isDay = weatherData.current.is_day;
  const condition = <Text size="3rem">{getWeatherText(wmoCode)}</Text>;

  return (
    <WidgetCard
      windowTitle={WINDOW_TITLE}
      surface="well"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {BackdropIcon && <BackdropIcon code={wmoCode} isDay={isDay} />}
      <Stack gap={spacing.condition} pos="relative" style={{ zIndex: 1 }}>
        {InlineIcon ? (
          <Group gap="sm" wrap="nowrap">
            <InlineIcon code={wmoCode} isDay={isDay} />
            {condition}
          </Group>
        ) : (
          condition
        )}
        <Group gap={spacing.details} wrap={spacing.wrap} justify={spacing.justify}>
          <Box>
            <Figure
              figure={Math.round(weatherData.current.temperature_2m).toString()}
              unit="°f"
              unitSize="3.5rem"
              size="12rem"
              kind="hero"
            />
          </Box>
          <Details>
            <Stack gap={3}>
              {detailRows(weatherData).map(({ label, color, value }) => (
                <Group key={label} gap={spacing.row} wrap="nowrap">
                  <DetailLabel label={label} color={color} />
                  <Figure
                    figure={Math.round(value ?? 0).toString()}
                    unit="°f"
                    unitSize="sm"
                    size="2rem"
                  />
                </Group>
              ))}
            </Stack>
          </Details>
        </Group>
        {/* <Divider my="md" />
        <WeatherForecast daily={weatherData.daily} /> */}
      </Stack>
    </WidgetCard>
  );
}
