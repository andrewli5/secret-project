import { useThemed } from './hooks/useUiTheme';
import { GEIST_FONT } from './theme';
import type { UiTheme } from './uiTheme';

type InlineFonts = { geist?: string; systemUi?: string };

// Fonts some components set inline, where no stylesheet can override them. Retro leaves them unset
// so its Mantine theme and stylesheet pick the Retro font aliases.
const INLINE_FONTS: Record<UiTheme, InlineFonts> = {
  neumorphic: { geist: GEIST_FONT, systemUi: 'system-ui' },
  retro: {},
};

export function useInlineFonts() {
  return useThemed(INLINE_FONTS);
}
