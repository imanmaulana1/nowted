import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { NoteItem } from './note-item'

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    params,
    className,
  }: {
    children: React.ReactNode
    to: string
    params?: Record<string, unknown>
    className?: string
  }) => (
    <a href={to} data-params={JSON.stringify(params)} className={className}>
      {children}
    </a>
  ),
}))

import type { NoteSummary } from '../types/note.type'

describe('NoteItem', () => {
  const mockNote: NoteSummary = {
    id: '1',
    title: 'Testing React components',
    slug: 'testing-react-components',
    excerpt: 'Writing tests for Vite apps',
    isFavorite: false,
    favoriteAt: null,
    archivedAt: null,
    trashedAt: null,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    folder: null,
  }

  it('should render note details correctly', () => {
    render(<NoteItem note={mockNote} to='/app/notes/$noteSlug' />)

    expect(screen.getByText('Testing React components')).toBeInTheDocument()
    expect(screen.getByText('Writing tests for Vite apps')).toBeInTheDocument()
    expect(screen.getByText(/ago/i)).toBeInTheDocument()
  })

  it('should point to the correct link path and parameters', () => {
    render(<NoteItem note={mockNote} to='/app/notes/$noteSlug' />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/app/notes/$noteSlug')
    expect(link).toHaveAttribute(
      'data-params',
      JSON.stringify({ noteSlug: 'testing-react-components' })
    )
  })
})
