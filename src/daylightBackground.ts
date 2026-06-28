type Rgb = readonly [number, number, number];

type Stop = { hour: number; from: Rgb; to: Rgb };

const STOPS: Stop[] = [
  { hour: 0, from: [6, 8, 15], to: [18, 22, 32] },
  { hour: 5, from: [16, 12, 30], to: [38, 28, 54] },
  { hour: 7, from: [12, 24, 42], to: [30, 48, 76] },
  { hour: 11, from: [14, 20, 30], to: [32, 38, 52] },
  { hour: 15, from: [18, 16, 14], to: [38, 34, 28] },
  { hour: 18, from: [22, 14, 26], to: [46, 32, 50] },
  { hour: 21, from: [8, 12, 20], to: [26, 32, 44] },
  { hour: 24, from: [6, 8, 15], to: [18, 22, 32] },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const lerpRgb = (a: Rgb, b: Rgb, t: number): Rgb =>
  [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)] as const;

const rgb = ([r, g, b]: Rgb) => `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;

export function hourOfDay(date = new Date()) {
  return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
}

function segmentAt(hour: number) {
  const h = ((hour % 24) + 24) % 24;
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i];
    const b = STOPS[i + 1];
    if (h >= a.hour && h < b.hour) {
      return { a, b, t: (h - a.hour) / (b.hour - a.hour) };
    }
  }
  return { a: STOPS[0], b: STOPS[1], t: 0 };
}

export function getDaylightGradient(date = new Date()): string {
  const { a, b, t } = segmentAt(hourOfDay(date));
  const from = lerpRgb(a.from, b.from, t);
  const to = lerpRgb(a.to, b.to, t);
  return `linear-gradient(165deg, ${rgb(from)} 0%, ${rgb(to)} 100%)`;
}

/** 0 during day, 1 deep night, smooth ramps at dusk/dawn */
export function getStarVisibility(date = new Date()): number {
  const h = hourOfDay(date);
  if (h >= 21 || h < 5) {
    return 1;
  }
  if (h >= 18 && h < 21) {
    return (h - 18) / 3;
  }
  if (h >= 5 && h < 7) {
    return 1 - (h - 5) / 2;
  }
  return 0;
}

type Star = { x: number; y: number; r: number; o: number; twinkle?: boolean; delay?: number };

const seeded = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export const STARS: Star[] = Array.from({ length: 55 }, (_, i) => {
  const twinkle = seeded(i + 400) > 0.75;
  return {
    x: seeded(i * 3) * 100,
    y: seeded(i * 3 + 1) * 100,
    r: seeded(i * 3 + 2) > 0.9 ? 0.22 : 0.12,
    o: 0.25 + seeded(i + 200) * 0.45,
    twinkle,
    delay: twinkle ? seeded(i + 300) * 5 : undefined,
  };
});
