import { describe, expect, it } from 'vitest';
import { generateExcerpt } from './note.helper.js';

describe('Note Helper - generateExcerpt', () => {
  it('should truncate text to 100 characters and trim it', () => {
    const text = 'a'.repeat(150);
    const result = generateExcerpt(text);
    expect(result.length).toBe(100);
    expect(result).toBe('a'.repeat(100));
  });

  it('should return trimmed text if shorter than 100 characters', () => {
    const text = '   short text   ';
    const result = generateExcerpt(text);
    expect(result).toBe('short text');
  });
});
