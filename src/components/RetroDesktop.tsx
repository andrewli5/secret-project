import { Box } from '@mantine/core';

// A static tiled desktop behind the retro windows (see styles/retro.css).
export function RetroDesktop() {
  return (
    <Box
      aria-hidden
      className="retro-desktop"
      pos="fixed"
      inset={0}
      style={{ zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
