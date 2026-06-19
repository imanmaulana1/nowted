import { act, renderHook } from '@testing-library/react'
import { afterAll, describe, expect, it, vi } from 'vitest'

import { useIsMobile } from './use-mobile'

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth

  it('should return true if window innerWidth is less than 768px', () => {
    window.innerWidth = 500
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('should return false if window innerWidth is 768px or greater', () => {
    window.innerWidth = 1024
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('should listen to matchMedia changes', () => {
    let changeCallback: () => void = () => {}

    const addEventListenerMock = vi
      .fn()
      .mockImplementation((event, callback) => {
        if (event === 'change') {
          changeCallback = callback
        }
      })

    const mockMatchMedia = vi.fn().mockImplementation((query) => ({
      matches: window.innerWidth < 768,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: addEventListenerMock,
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })

    window.innerWidth = 1024
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    window.innerWidth = 500
    act(() => {
      changeCallback()
    })
    expect(result.current).toBe(true)
  })

  afterAll(() => {
    window.innerWidth = originalInnerWidth
  })
})
