import { chineseWords } from '@/data/chineseWords';
import { useThemed } from '@/hooks/useUiTheme';
import { useInlineFonts } from '@/themeFonts';
import type { UiTheme } from '@/uiTheme';
import { Divider, Group, Stack, Text } from '@mantine/core';
import { type CSSProperties, useEffect, useState } from 'react';
import { useTitleBars, WidgetCard } from '../WidgetCard';

const MS_PER_DAY = 86_400_000;
const REFRESH_MS = 60_000;
const CHINESE_FONT = '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';

// We diff Date.UTC(y, m, d) values instead of raw timestamps because those just
// encode the calendar date, with no timezone or DST involved. That keeps the
// day count exact even when the clocks shift forward or back for DST.
function getDayIndex() {
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const epoch = Date.UTC(2025, 0, 1);
  return Math.round((today - epoch) / MS_PER_DAY);
}

type Layout = {
  word: CSSProperties;
  sentence: CSSProperties;
  charSize: (charCount: number) => string;
};

// The word block can't be the size container: containment hides its content's width from the
// flex layout, so a long word and its pinyin overflowed into the sentence instead of wrapping it
// onto its own line. The row is the container instead.
// Neumorphic keeps sizing the characters against the word block's width: half the row beside the
// sentence, or the whole row once two 16rem columns no longer fit.
const HALF_OR_FULL_ROW = 'max(50cqi - 0.5rem, min(100cqi, (33rem - 100cqi) * 1000))';

// Retro sizes the word block to its content and the characters to the whole window.
const LAYOUTS: Record<UiTheme, Layout> = {
  neumorphic: {
    word: { flex: '1 1 16rem' },
    sentence: { flex: '1 1 16rem', minWidth: '12rem' },
    charSize: (charCount) =>
      `clamp(3.25rem, calc(${HALF_OR_FULL_ROW} * ${0.22 / charCount}), 5.25rem)`,
  },
  retro: {
    word: { flex: '1 1 auto' },
    sentence: { flex: '1 1 16rem', minWidth: 0 },
    charSize: (charCount) => `clamp(3.25rem, ${22 / charCount}cqi, 5.25rem)`,
  },
};

export function getTodaysWord() {
  const dayIndex = getDayIndex();
  return chineseWords[
    ((dayIndex % chineseWords.length) + chineseWords.length) % chineseWords.length
  ];
}

export function ChineseOfTheDay() {
  const [, setTick] = useState(0);

  useEffect(() => {
    let dayIndex = getDayIndex();

    const sync = () => {
      const next = getDayIndex();
      if (next !== dayIndex) {
        dayIndex = next;
        setTick((tick) => tick + 1);
      }
    };

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        sync();
      }
    };

    document.addEventListener('visibilitychange', onVisible);
    const intervalId = setInterval(sync, REFRESH_MS);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      clearInterval(intervalId);
    };
  }, []);

  const { geist } = useInlineFonts();
  const titleBars = useTitleBars();
  const layout = useThemed(LAYOUTS);
  const word = getTodaysWord();
  const label = 'chinese of the day';

  return (
    <WidgetCard p="xs" windowTitle={label} surface="well">
      <Group align="flex-start" gap="md" wrap="wrap" style={{ containerType: 'inline-size' }}>
        <Group wrap="nowrap" gap="xs" align="center" style={layout.word}>
          <Text
            fw={300}
            lh={1}
            style={{
              fontFamily: CHINESE_FONT,
              fontSize: layout.charSize(Math.max(word.simplified.length, 1)),
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {word.simplified}
          </Text>
          <Divider orientation="vertical" />
          <Stack gap={2}>
            {!titleBars && (
              <Text size="lg" c="dimmed" tt="lowercase">
                {label}
              </Text>
            )}
            <Text size="2.25rem" fw={500} style={{ fontFamily: geist }}>
              {word.pinyin}
            </Text>
            <Text size="xl" c="dimmed">
              {word.english}
            </Text>
          </Stack>
        </Group>
        <Stack gap={2} style={layout.sentence}>
          <Text fw={400} lh={1.3} style={{ fontFamily: CHINESE_FONT, fontSize: '1.75rem' }}>
            {word.sentence.simplified}
          </Text>
          <Text size="xl" fw={500} style={{ fontFamily: geist }}>
            {word.sentence.pinyin}
          </Text>
          <Text size="lg" c="dimmed">
            {word.sentence.english}
          </Text>
        </Stack>
      </Group>
    </WidgetCard>
  );
}
