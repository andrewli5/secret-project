import { UI_THEME, type UiTheme } from './uiTheme';
import { isUiTheme } from './uiThemes';

const STORAGE_KEY = 'secret-project:ui-theme';

// The theme chosen on this device, or UI_THEME. Storage can be unavailable (private mode, blocked
// site data), so failures fall back quietly.
export function loadUiTheme(): UiTheme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isUiTheme(stored) ? stored : UI_THEME;
  } catch {
    return UI_THEME;
  }
}

export function saveUiTheme(uiTheme: UiTheme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, uiTheme);
  } catch {
    // Keep the choice for this visit only.
  }
}
