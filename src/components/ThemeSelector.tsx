import { Paper, Select, type SelectProps, Transition } from '@mantine/core';
import { useReducedMotion } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useSetUiTheme, useUiTheme } from '@/hooks/useUiTheme';
import { isUiTheme, UI_THEMES } from '@/uiThemes';

export const REVEAL_MS = 5000;
const FADE_MS = 150;

const OPTIONS = Object.entries(UI_THEMES).map(([value, { label }]) => ({ value, label }));

// Like a video player's controls: shown for a while after any tap or key press anywhere, and kept
// up while `hold` is set. `lastInput` changes with every input, restarting the countdown.
export function useRevealOnInput(durationMs: number, hold: boolean) {
  const [visible, setVisible] = useState(false);
  const [lastInput, setLastInput] = useState(0);

  useEffect(() => {
    const reveal = () => {
      setVisible(true);
      setLastInput((n) => n + 1);
    };
    window.addEventListener('pointerdown', reveal, { capture: true });
    window.addEventListener('keydown', reveal, { capture: true });
    return () => {
      window.removeEventListener('pointerdown', reveal, { capture: true });
      window.removeEventListener('keydown', reveal, { capture: true });
    };
  }, []);

  useEffect(() => {
    if (!visible || hold) {
      return;
    }
    const id = setTimeout(() => setVisible(false), durationMs);
    return () => clearTimeout(id);
  }, [visible, hold, lastInput, durationMs]);

  return { shown: visible || hold, lastInput };
}

// Drawn in the retro style whichever theme is active; retro.css scopes those styles to this panel.
const CLASS_NAMES: SelectProps['classNames'] = {
  label: 'retro-selector-label',
  input: 'retro-select-input',
  section: 'retro-select-arrow',
  dropdown: 'retro-select-dropdown',
  option: 'retro-select-option',
};

// The list always opens upwards from the field's left edge. It matches the field's width, so that's
// the same spot as right-aligned, but it can't land past the screen edge on the first frame, before
// the list has measured itself. Fixed positioning keeps it from ever widening the page, which mobile
// browsers zoom out to fit (and which made the list flicker as it moved). It renders inside the
// panel so it picks up the panel's retro styles.
function dropdownProps(fadeMs: number): SelectProps['comboboxProps'] {
  return {
    position: 'top-start',
    middlewares: { flip: false, shift: true },
    floatingStrategy: 'fixed',
    withinPortal: false,
    radius: 0,
    transitionProps: { transition: 'fade', duration: fadeMs },
  };
}

// The theme switcher floats over the bottom-right corner, out of the dashboard's layout.
export function ThemeSelector() {
  const uiTheme = useUiTheme();
  const setUiTheme = useSetUiTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { shown, lastInput } = useRevealOnInput(REVEAL_MS, dropdownOpen);
  const fadeMs = useReducedMotion() ? 0 : FADE_MS;

  return (
    <Transition mounted={shown} transition="fade" duration={fadeMs} timingFunction="ease">
      {(fade) => (
        <Paper
          className="retro-selector"
          radius={0}
          pos="fixed"
          right={16}
          bottom={16}
          style={{ ...fade, zIndex: 200 }}
        >
          <Select
            classNames={CLASS_NAMES}
            radius={0}
            label="Theme"
            size="lg"
            w={220}
            data={OPTIONS}
            value={uiTheme}
            allowDeselect={false}
            comboboxProps={dropdownProps(fadeMs)}
            onChange={(value) => isUiTheme(value) && setUiTheme(value)}
            onDropdownOpen={() => setDropdownOpen(true)}
            onDropdownClose={() => setDropdownOpen(false)}
          />
          {/* Runs down to the fade-out. Remounted on every input so it restarts in step with the
              timer, and held full while the dropdown keeps the panel up. */}
          <span
            key={`${lastInput}-${dropdownOpen}`}
            aria-hidden
            className="retro-selector-countdown"
            data-counting={!dropdownOpen || undefined}
            style={{ animationDuration: `${REVEAL_MS}ms` }}
          />
        </Paper>
      )}
    </Transition>
  );
}
