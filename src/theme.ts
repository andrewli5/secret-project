import { createTheme, type MantineThemeOverride } from '@mantine/core';
import type { CSSProperties } from 'react';

export const GEIST_FONT = 'Geist, sans-serif';

export const NEUMORPHIC_RAISED: CSSProperties = {
  boxShadow: '5px 5px 14px rgba(0, 0, 0, 0.31), -3px -3px 10px rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
};

export const NEUMORPHIC_RAISED_SUBTLE: CSSProperties = {
  boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.26), -2px -2px 7px rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.07)',
};

export const theme: MantineThemeOverride = createTheme({
  fontFamily: 'Geist, system-ui, -apple-system, sans-serif',
  components: {
    Text: {
      styles: { root: { fontFamily: GEIST_FONT, textTransform: 'lowercase' } },
    },
  },
});
