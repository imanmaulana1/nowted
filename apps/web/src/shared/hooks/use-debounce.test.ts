import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useDebounce } from './use-debounce'

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300))
    expect(result.current).toBe('hello')
  })

  it('should update the value only after the delay has passed', () => {
    vi.useFakeTimers()

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 300 },
      }
    )

    expect(result.current).toBe('initial')

    rerender({ value: 'updated', delay: 300 })
    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(result.current).toBe('initial')

    act(() => {
      vi.advanceTimersByTime(150)
    })
    expect(result.current).toBe('updated')

    vi.useRealTimers()
  })
})
