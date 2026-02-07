import { Group, Paper, Stack } from '@mantine/core';
import { TrainTimes } from '../TrainTimes/TrainTimes';
import { Weather } from '../Weather/Weather';
import { Clock } from '../Clock/Clock';
import { getWeatherData, WeatherData } from '@/clients/openmeteo/weather';
import { useCallback, useEffect, useState } from 'react';

const PACKARDS_CORNER_STOP_ID = 'place-brico';
const GREEN_LINE_B_ROUTE_ID = 'Green-B';

const B57_STOP_ID = '959';
const B57_ROUTE_ID = '57';

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
      <Group gap="xs" align="start" mb="xs">
        <Stack w="49%">
          <Clock />
          <TrainTimes
            stopId={PACKARDS_CORNER_STOP_ID}
            directionIds={[1, 0]}
            routeId={GREEN_LINE_B_ROUTE_ID}
          />
        </Stack>
        <Stack w="49%" gap="xs">
          <Weather weatherData={weatherData} />
          <TrainTimes stopId={B57_STOP_ID} directionIds={[0]} routeId={B57_ROUTE_ID} />
        </Stack>
      </Group>
    </Paper>
  );
};
