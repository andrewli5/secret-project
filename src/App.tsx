import '@mantine/core/styles.css';
import '@fontsource/geist/300.css';
import '@fontsource/geist/400.css';
import '@fontsource/geist/500.css';
import '@fontsource/geist/600.css';

import { MantineProvider, Box } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { DaylightBackground } from './components/DaylightBackground';

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <DaylightBackground />
      <Box pos="relative" mih="100vh" style={{ zIndex: 1 }}>
        <Router />
      </Box>
    </MantineProvider>
  );
}
