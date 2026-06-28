import { getDaylightGradient, getStarVisibility, STARS } from '@/daylightBackground';
import '@/styles/daylight.css';
import { Box } from '@mantine/core';
import { useEffect, useState } from 'react';

const REFRESH_MS = 30_000;

type SkyState = { gradient: string; stars: number };

function skyState(): SkyState {
  const now = new Date();
  return { gradient: getDaylightGradient(now), stars: getStarVisibility(now) };
}

export function DaylightBackground() {
  const [sky, setSky] = useState<SkyState>(() => skyState());

  useEffect(() => {
    const tick = () => setSky(skyState());
    tick();
    const id = setInterval(tick, REFRESH_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Box
        aria-hidden
        pos="fixed"
        inset={0}
        style={{
          zIndex: 0,
          pointerEvents: 'none',
          background: sky.gradient,
          transition: 'background 90s ease',
        }}
      />
      <Box
        component="svg"
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        pos="fixed"
        inset={0}
        w="100%"
        h="100%"
        style={{
          zIndex: 0,
          pointerEvents: 'none',
          opacity: sky.stars * 0.65,
          transition: 'opacity 90s ease',
        }}
      >
        {STARS.map((star) => (
          <circle
            key={`${star.x}-${star.y}-${star.r}`}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="white"
            opacity={star.o}
            className={star.twinkle ? 'daylight-star-twinkle' : undefined}
            style={star.delay != null ? { animationDelay: `${star.delay}s` } : undefined}
          />
        ))}
      </Box>
      <Box
        aria-hidden
        pos="fixed"
        inset={0}
        className="daylight-breathe"
        style={{ zIndex: 0, pointerEvents: 'none' }}
      />
    </>
  );
}
