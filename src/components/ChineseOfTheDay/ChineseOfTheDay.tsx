import { chineseWords } from '@/data/chineseWords';
import { GEIST_FONT } from '@/theme';
import { Divider, Group, Stack, Text } from '@mantine/core';
import { WidgetCard } from '../WidgetCard';

const EPOCH = new Date(2025, 0, 1).getTime();
const MS_PER_DAY = 86_400_000;
const CHINESE_FONT = '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';

export function getTodaysWord() {
  const dayIndex = Math.floor((Date.now() - EPOCH) / MS_PER_DAY);
  return chineseWords[
    ((dayIndex % chineseWords.length) + chineseWords.length) % chineseWords.length
  ];
}

export function ChineseOfTheDay() {
  const word = getTodaysWord();

  return (
    <WidgetCard p="xs">
      <Group align="flex-start" gap="md" wrap="wrap">
        <Group
          wrap="nowrap"
          gap="xs"
          align="center"
          style={{ containerType: 'inline-size', flex: '1 1 16rem' }}
        >
          <Text
            fw={300}
            lh={1}
            style={{
              fontFamily: CHINESE_FONT,
              fontSize: `clamp(3.25rem, ${22 / Math.max(word.simplified.length, 1)}cqi, 5.25rem)`,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {word.simplified}
          </Text>
          <Divider orientation="vertical" />
          <Stack gap={2}>
            <Text size="lg" c="dimmed" tt="lowercase">
              chinese of the day
            </Text>
            <Text size="2.25rem" fw={500} style={{ fontFamily: GEIST_FONT }}>
              {word.pinyin}
            </Text>
            <Text size="xl" c="dimmed">
              {word.english}
            </Text>
          </Stack>
        </Group>
        <Stack gap={2} style={{ flex: '1 1 16rem', minWidth: '12rem' }}>
          <Text fw={400} lh={1.3} style={{ fontFamily: CHINESE_FONT, fontSize: '1.75rem' }}>
            {word.sentence.simplified}
          </Text>
          <Text size="xl" fw={500} style={{ fontFamily: GEIST_FONT }}>
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
