import { chineseWords } from '@/data/chineseWords';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getTodaysWord } from './ChineseOfTheDay';

const EPOCH = new Date(2025, 0, 1).getTime();
const MS_PER_DAY = 86_400_000;

afterEach(() => {
  vi.useRealTimers();
});

describe('getTodaysWord', () => {
  it('advances one word per day and wraps around the list', () => {
    vi.useFakeTimers();
    const dayIndex = chineseWords.length + 3;
    vi.setSystemTime(EPOCH + dayIndex * MS_PER_DAY);
    expect(getTodaysWord()).toBe(chineseWords[3]);
  });
});
