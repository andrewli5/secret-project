import '@mantine/core/styles.css';
import '@fontsource/geist/300.css';
import '@fontsource/geist/400.css';
import '@fontsource/geist/500.css';
import '@fontsource/geist/600.css';
import './styles/retroFonts.css';
import './styles/retro.css';

import { MantineProvider, Box } from '@mantine/core';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Router } from './Router';
import { ThemeSelector } from './components/ThemeSelector';
import { SetUiThemeContext, UiThemeContext } from './hooks/useUiTheme';
import type { UiTheme } from './uiTheme';
import { loadUiTheme, saveUiTheme } from './uiThemePreference';
import { UI_THEMES } from './uiThemes';

export default function App() {
  const [uiTheme, setUiTheme] = useState(loadUiTheme);
  const { theme, providerProps, Background } = UI_THEMES[uiTheme];

  // Before paint, so a switch never shows one frame of the old theme's CSS.
  useLayoutEffect(() => {
    document.documentElement.dataset.uiTheme = uiTheme;
  }, [uiTheme]);

  const chooseUiTheme = useCallback((next: UiTheme) => {
    saveUiTheme(next);
    setUiTheme(next);
  }, []);

  return (
    <UiThemeContext.Provider value={uiTheme}>
      <SetUiThemeContext.Provider value={chooseUiTheme}>
        <MantineProvider theme={theme} {...providerProps}>
          <Background />
          <Box
            pos="relative"
            mih="100vh"
            w="100%"
            display="flex"
            style={{ alignItems: 'center', zIndex: 1, minWidth: 0, overflow: 'hidden' }}
          >
            <Router />
          </Box>
          <ThemeSelector />
        </MantineProvider>
      </SetUiThemeContext.Provider>
    </UiThemeContext.Provider>
  );
}
