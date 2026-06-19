import { describe, expect, it } from 'vitest'

import { cn, formattedDate, getInitialName } from './utils'

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
    })

    it('should resolve tailwind CSS conflicts correctly', () => {
      expect(cn('p-4 p-8')).toBe('p-8')
      expect(cn('px-2 p-1')).toBe('p-1')
    })

    it('should ignore falsey values', () => {
      expect(cn('class1', null, undefined, false, 'class2')).toBe(
        'class1 class2'
      )
    })
  })

  describe('formattedDate', () => {
    it('should format a date string correctly', () => {
      const date = '2026-06-19T12:00:00.000Z'
      expect(formattedDate(date, 'yyyy-MM-dd')).toBe('2026-06-19')
      expect(formattedDate(date, 'MMM d, yyyy')).toBe('Jun 19, 2026')
    })
  })

  describe('getInitialName', () => {
    it('should return uppercase initials of the first two words', () => {
      expect(getInitialName('John Doe')).toBe('JD')
      expect(getInitialName('iman maulana')).toBe('IM')
    })

    it('should return a single initial if there is only one word', () => {
      expect(getInitialName('John')).toBe('J')
      expect(getInitialName('   iman   ')).toBe('I')
    })

    it('should return up to two initials if there are more than two words', () => {
      expect(getInitialName('John Doe Smith')).toBe('JD')
      expect(getInitialName('First Second Third Fourth')).toBe('FS')
    })

    it('should handle extra whitespace correctly', () => {
      expect(getInitialName('  John    Doe  ')).toBe('JD')
    })
  })
})
