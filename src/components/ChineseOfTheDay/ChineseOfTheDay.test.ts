import { chineseWords } from '@/data/chineseWords';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getTodaysWord } from './ChineseOfTheDay';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
});

describe('getTodaysWord', () => {
  it('advances one word per day and wraps around the list', () => {
    vi.useFakeTimers();
    const dayIndex = chineseWords.length + 3;
    vi.setSystemTime(new Date(2025, 0, 1 + dayIndex));
    expect(getTodaysWord()).toBe(chineseWords[3]);
  });

  it('changes at local midnight, not 24h-since-epoch, across a DST transition', () => {
    // America/New_York springs forward on 2026-03-08. The word must still flip
    // at 00:00 local time that night, not 1 hour late.
    vi.stubEnv('TZ', 'America/New_York');
    vi.useFakeTimers();

    vi.setSystemTime(new Date(2026, 2, 8, 23, 59, 0));
    const beforeMidnight = getTodaysWord();

    vi.setSystemTime(new Date(2026, 2, 9, 0, 0, 0));
    expect(getTodaysWord()).not.toBe(beforeMidnight);
  });
});
