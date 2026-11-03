import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UI_THEME } from '@/uiTheme';
import { useUiTheme } from './useUiTheme';

describe('useUiTheme', () => {
  it('defaults to UI_THEME without a provider', () => {
    const { result } = renderHook(() => useUiTheme());
    expect(result.current).toBe(UI_THEME);
  });
});
