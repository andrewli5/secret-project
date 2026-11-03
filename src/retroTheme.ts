import { createTheme, type CSSVariablesResolver, type MantineThemeOverride } from '@mantine/core';

// Font aliases from the retro design spec, bound to Fontsource files in styles/retroFonts.css.
export const RETRO_DISPLAY_FONT = '"Retro Display", sans-serif';
export const RETRO_INTERFACE_FONT = '"Retro Interface", sans-serif';
export const RETRO_MONO_FONT = '"Retro Mono", monospace';

const SQUARE = { xs: '0px', sm: '0px', md: '0px', lg: '0px', xl: '0px' };

// The spec's body leading (--dp-typography-body-leading) for every text size; Mantine's defaults
// (up to 1.65) leave wrapped lines looking loose next to the Chinese sentence's 1.3.
const BODY_LEADING = { xs: '1.4', sm: '1.4', md: '1.4', lg: '1.4', xl: '1.4' };

export const retroTheme: MantineThemeOverride = createTheme({
  fontFamily: RETRO_INTERFACE_FONT,
  fontFamilyMonospace: RETRO_MONO_FONT,
  headings: { fontFamily: RETRO_DISPLAY_FONT },
  // Explicit radius="lg" props resolve through this scale, so square it as well as the default.
  defaultRadius: 0,
  radius: SQUARE,
  lineHeights: BODY_LEADING,
  black: '#000',
  white: '#fff',
  components: {
    Badge: { defaultProps: { radius: 0 } },
    Tooltip: { defaultProps: { radius: 0 } },
  },
});

// Mantine's light-scheme dimmed (#868e96) and red (#fa5252) fail 4.5:1 on white and window grey.
export const retroCssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {
    '--mantine-color-dimmed': '#404040',
    '--mantine-color-red-text': '#a00000',
    '--mantine-color-body': '#d4d4d4',
  },
  dark: {},
});
