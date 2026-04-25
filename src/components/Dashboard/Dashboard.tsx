import { Paper, SimpleGrid, Stack } from '@mantine/core';
import { TrainTimes } from '../TrainTimes/TrainTimes';
import { Weather } from '../Weather/Weather';
import { Clock } from '../Clock/Clock';
import { getWeatherData, type WeatherData } from '@/clients/openmeteo/weather';
import { useCallback, useEffect, useState } from 'react';

const BOSTON_LANDING_STOP_ID = 'place-WML-0035';
const WORCESTER_LINE_ROUTE_ID = 'CR-Worcester';

const WEATHER_REFRESH_MS = 5 * 60 * 1000; // 5 minutes

export const Dashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(undefined);
  const fetchWeather = useCallback(async () => {
    const data = await getWeatherData();
    setWeatherData(data);
  }, []);

  useEffect(() => {
    fetchWeather();
    const intervalId = setInterval(fetchWeather, WEATHER_REFRESH_MS);
    return () => clearInterval(intervalId);
  }, [fetchWeather]);

  return (
    <Paper m="lg" p="lg" radius="md" bg="transparent">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Stack>
          <Clock />
          <TrainTimes
            stopId={BOSTON_LANDING_STOP_ID}
            directionIds={[1]}
            routeId={WORCESTER_LINE_ROUTE_ID}
          />
        </Stack>
        <Stack>
          <Weather weatherData={weatherData} />
        </Stack>
      </SimpleGrid>
    </Paper>
  );
};
