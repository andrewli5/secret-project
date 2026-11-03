import type { CSSVariablesResolver, MantineColorScheme, MantineThemeOverride } from '@mantine/core';
import type { ComponentType } from 'react';
import { DaylightBackground } from './components/DaylightBackground';
import { RetroDesktop } from './components/RetroDesktop';
import { retroCssVariablesResolver, retroTheme } from './retroTheme';
import { theme as neumorphicTheme } from './theme';
import type { UiTheme } from './uiTheme';

type UiThemeDefinition = {
  label: string;
  theme: MantineThemeOverride;
  providerProps: {
    defaultColorScheme: MantineColorScheme;
    forceColorScheme?: 'light' | 'dark';
    cssVariablesResolver?: CSSVariablesResolver;
  };
  Background: ComponentType;
};

export const UI_THEMES: Record<UiTheme, UiThemeDefinition> = {
  // Each theme forces its color scheme: Mantine reads defaultColorScheme only once, so switching
  // themes at runtime would otherwise keep the previous theme's scheme. defaultColorScheme still
  // covers the first frame, before forceColorScheme applies.
  neumorphic: {
    label: 'Neumorphic',
    theme: neumorphicTheme,
    providerProps: { defaultColorScheme: 'dark', forceColorScheme: 'dark' },
    Background: DaylightBackground,
  },
  retro: {
    label: 'Retro',
    theme: retroTheme,
    providerProps: {
      defaultColorScheme: 'light',
      forceColorScheme: 'light',
      cssVariablesResolver: retroCssVariablesResolver,
    },
    Background: RetroDesktop,
  },
};

export function isUiTheme(value: unknown): value is UiTheme {
  return typeof value === 'string' && Object.hasOwn(UI_THEMES, value);
}
