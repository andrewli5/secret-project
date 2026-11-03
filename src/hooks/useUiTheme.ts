import { createContext, useContext } from 'react';
import { UI_THEME, type UiTheme } from '@/uiTheme';

// Defaults to UI_THEME so components (and tests) rendered without a provider still match the app.
export const UiThemeContext = createContext<UiTheme>(UI_THEME);

export function useUiTheme() {
  return useContext(UiThemeContext);
}

export function useThemed<T>(byTheme: Record<UiTheme, T>): T {
  return byTheme[useUiTheme()];
}

// Switches the whole app's theme; a no-op outside the app's provider.
export const SetUiThemeContext = createContext<(uiTheme: UiTheme) => void>(() => {});

export function useSetUiTheme() {
  return useContext(SetUiThemeContext);
}
