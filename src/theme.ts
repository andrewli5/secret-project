import { createTheme } from '@mantine/core';
import type { TextProps, MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = createTheme({
  fontFamily: 'Manrope, Geist, system-ui, -apple-system, sans-serif',
  fontSizes: {
    xs: '18px',
    sm: '25px',
    md: '28px',
    lg: '70px',
    xl: '102px',
  },
  // headings: {
  //   fontFamily: 'Manrope, Geist, Inter, sans-serif',
  // },
  components: {
    Text: {
      styles: (_: MantineThemeOverride, props: TextProps) => ({
        root: {
          fontFamily: props.size === 'xl' ? 'Manrope, sans-serif' : 'Geist, sans-serif',
          textTransform: 'lowercase',
        },
      }),
    },
  },
});
