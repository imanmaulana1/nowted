import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { formatZodError } from './format-zod.js';

describe('formatZodError', () => {
  it('should format zod errors into field-grouped arrays', () => {
    const schema = z.object({
      name: z.string().min(3),
      age: z.number(),
    });

    const result = schema.safeParse({ name: 'ab', age: 'invalid' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const formatted = formatZodError(result.error);
      expect(formatted).toEqual({
        name: ['Too small: expected string to have >=3 characters'],
        age: ['Invalid input: expected number, received string'],
      });
    }
  });
});
