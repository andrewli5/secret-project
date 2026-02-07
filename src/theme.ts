import { type TextProps, type MantineThemeOverride, createTheme } from '@mantine/core';

export const theme: MantineThemeOverride = createTheme({
  fontFamily: 'Manrope, Geist, system-ui, -apple-system, sans-serif',
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
