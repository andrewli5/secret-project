import { createTheme, type MantineThemeOverride } from '@mantine/core';

export const GEIST_FONT = 'Geist, sans-serif';

export const theme: MantineThemeOverride = createTheme({
  fontFamily: 'Geist, system-ui, -apple-system, sans-serif',
  components: {
    Text: {
      styles: { root: { fontFamily: GEIST_FONT, textTransform: 'lowercase' } },
    },
  },
});
