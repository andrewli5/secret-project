import { describe, expect, it } from 'vitest';
import { getTimeAgo } from './LastUpdatedTime';

describe('getTimeAgo', () => {
  it('pluralizes minutes', () => {
    expect(getTimeAgo(new Date(Date.now() - 60_000))).toBe('1 minute ago');
    expect(getTimeAgo(new Date(Date.now() - 3 * 60_000))).toBe('3 minutes ago');
  });
});
