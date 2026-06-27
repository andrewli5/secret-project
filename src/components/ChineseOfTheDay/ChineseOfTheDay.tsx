import { Divider, Group, Stack, Text } from '@mantine/core';
import { WidgetCard } from '../WidgetCard';
import { chineseWords } from '@/data/chineseWords';

const EPOCH = new Date(2025, 0, 1).getTime();
const MS_PER_DAY = 86_400_000;
const CHINESE_FONT = '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif';

function getTodaysWord() {
  const dayIndex = Math.floor((Date.now() - EPOCH) / MS_PER_DAY);
  return chineseWords[((dayIndex % chineseWords.length) + chineseWords.length) % chineseWords.length];
}

export function ChineseOfTheDay() {
  const word = getTodaysWord();

  return (
    <WidgetCard>
      <Stack gap="md" p="md">
        <Group wrap="nowrap" gap="sm" align="center" style={{ containerType: 'inline-size' }}>
          <Text
            fw={300}
            lh={1}
            style={{
              fontFamily: CHINESE_FONT,
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
        <Divider />
        <Stack gap={4}>
          <Text fw={400} lh={1.4} style={{ fontFamily: CHINESE_FONT, fontSize: '1.6rem' }}>
            {word.sentence.simplified}
          </Text>
          <Text size="1.1rem" fw={500} style={{ fontFamily: 'Geist, sans-serif' }}>
            {word.sentence.pinyin}
          </Text>
          <Text size="1rem" c="dimmed">
            {word.sentence.english}
          </Text>
        </Stack>
      </Stack>
    </WidgetCard>
  );
}
