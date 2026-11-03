import { MantineProvider } from '@mantine/core';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SetUiThemeContext, UiThemeContext } from '@/hooks/useUiTheme';
import type { UiTheme } from '@/uiTheme';
import { REVEAL_MS, ThemeSelector } from './ThemeSelector';

afterEach(() => {
  vi.useRealTimers();
});

const UI_THEMES: UiTheme[] = ['neumorphic', 'retro'];

function renderSelector(uiTheme: UiTheme) {
  const setUiTheme = vi.fn();
  render(
    createElement(
      UiThemeContext.Provider,
      { value: uiTheme },
      createElement(
        SetUiThemeContext.Provider,
        { value: setUiTheme },
        createElement(MantineProvider, { env: 'test' }, createElement(ThemeSelector)),
      ),
    ),
  );
  return setUiTheme;
}

const selector = () => screen.queryByLabelText('Theme', { selector: 'input' });

describe.each(UI_THEMES)('ThemeSelector (%s theme)', (uiTheme) => {
  it('stays hidden until the screen is tapped, then hides after a few seconds', () => {
    vi.useFakeTimers();
    renderSelector(uiTheme);
    expect(selector()).not.toBeInTheDocument();

    fireEvent.pointerDown(document.body);
    expect(selector()).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(REVEAL_MS - 1));
    expect(selector()).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1));
    expect(selector()).not.toBeInTheDocument();
  });

  it('restarts the countdown on every tap', () => {
    vi.useFakeTimers();
    renderSelector(uiTheme);

    fireEvent.pointerDown(document.body);
    act(() => vi.advanceTimersByTime(REVEAL_MS - 1000));
    fireEvent.pointerDown(document.body);
    act(() => vi.advanceTimersByTime(REVEAL_MS - 1000));
    expect(selector()).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1000));
    expect(selector()).not.toBeInTheDocument();
  });

  it('stays up while its dropdown is open, then counts down once it closes', () => {
    vi.useFakeTimers();
    renderSelector(uiTheme);
    fireEvent.pointerDown(document.body);

    fireEvent.click(selector()!);
    expect(screen.getByRole('option', { name: 'Retro' })).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(REVEAL_MS * 3));
    expect(selector()).toBeInTheDocument();

    fireEvent.keyDown(selector()!, { key: 'Escape' });
    expect(screen.queryByRole('option', { name: 'Retro' })).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(REVEAL_MS));
    expect(selector()).not.toBeInTheDocument();
  });

  it('runs a countdown bar while counting down, and holds it while the dropdown is open', () => {
    renderSelector(uiTheme);
    const bar = () => document.querySelector('.retro-selector-countdown');

    fireEvent.pointerDown(document.body);
    expect(bar()).toHaveAttribute('data-counting');

    fireEvent.click(selector()!);
    expect(bar()).not.toHaveAttribute('data-counting');

    fireEvent.keyDown(selector()!, { key: 'Escape' });
    expect(bar()).toHaveAttribute('data-counting');
  });

  it('switches to the chosen theme', () => {
    const setUiTheme = renderSelector(uiTheme);
    fireEvent.pointerDown(document.body);
    expect(selector()).toHaveValue(uiTheme === 'retro' ? 'Retro' : 'Neumorphic');

    fireEvent.click(selector()!);
    const other: UiTheme = uiTheme === 'retro' ? 'neumorphic' : 'retro';
    fireEvent.click(
      screen.getByRole('option', { name: other === 'retro' ? 'Retro' : 'Neumorphic' }),
    );
    expect(setUiTheme).toHaveBeenCalledWith(other);
  });
});
