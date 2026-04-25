import { Divider, Group, Stack, Text } from '@mantine/core';
import { WidgetCard } from '../WidgetCard';
import { chineseWords } from '@/data/chineseWords';

const EPOCH = new Date(2025, 0, 1).getTime();
const MS_PER_DAY = 86_400_000;

function getTodaysWord() {
  const dayIndex = Math.floor((Date.now() - EPOCH) / MS_PER_DAY);
  return chineseWords[((dayIndex % chineseWords.length) + chineseWords.length) % chineseWords.length];
}

export function ChineseOfTheDay() {
  const word = getTodaysWord();

  return (
    <WidgetCard>
      <Group wrap="nowrap" gap="sm" p="md" align="center" style={{ containerType: 'inline-size' }}>
        <Text
          fw={300}
          lh={1}
          style={{
            fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
            fontSize: `clamp(2.5rem, ${18 / Math.max(word.simplified.length, 1)}cqi, 4.5rem)`,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {word.simplified}
        </Text>
        <Divider orientation="vertical" />
        <Stack gap={4}>
          <Text size="1.2rem" c="dimmed" tt="lowercase">
            chinese of the day
          </Text>
          <Text size="2rem" fw={500} style={{ fontFamily: 'Geist, sans-serif' }}>
            {word.pinyin}
          </Text>
          <Text size="1.5rem" c="dimmed">
            {word.english}
          </Text>
        </Stack>
      </Group>
    </WidgetCard>
  );
}
