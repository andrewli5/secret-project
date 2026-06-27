import {
  type TextProps,
  type MantineTheme,
  type MantineThemeOverride,
  createTheme,
} from '@mantine/core';

export const GEIST_FONT = 'Geist, sans-serif';

export const theme: MantineThemeOverride = createTheme({
  fontFamily: 'Manrope, Geist, system-ui, -apple-system, sans-serif',
  components: {
    Text: {
      styles: (_: MantineTheme, props: TextProps) => ({
        root: {
          fontFamily: props.size === 'xl' ? 'Manrope, sans-serif' : GEIST_FONT,
          textTransform: 'lowercase',
        },
      }),
    },
  },
});
