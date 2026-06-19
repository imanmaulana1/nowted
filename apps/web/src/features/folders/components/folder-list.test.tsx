import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FolderList } from './folder-list'

vi.mock('@/shared/components/ui/sidebar', () => ({
  SidebarMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='sidebar-menu'>{children}</div>
  ),
}))

vi.mock('./folder-item', () => ({
  FolderItem: ({ folder }: { folder: { name: string } }) => (
    <div data-testid='folder-item'>{folder.name}</div>
  ),
}))

vi.mock('./folder-list-empty', () => ({
  FolderListEmpty: () => <div>No folders yet</div>,
}))

vi.mock('./folder-list-skeleton', () => ({
  FolderListSkeleton: () => <div>Loading...</div>,
}))

import type { FolderWithNotes } from '../types/folder.type'

describe('FolderList', () => {
  it('should render loading skeleton when isLoading is true', () => {
    render(<FolderList isLoading={true} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render empty state when folders array is empty', () => {
    render(<FolderList isLoading={false} folders={[]} />)
    expect(screen.getByText('No folders yet')).toBeInTheDocument()
  })

  it('should render folder items when folders are provided', () => {
    const mockFolders: FolderWithNotes[] = [
      {
        id: '1',
        name: 'Work',
        slug: 'work',
        createdAt: new Date(),
        updatedAt: new Date(),
        notes: [],
      },
      {
        id: '2',
        name: 'Personal',
        slug: 'personal',
        createdAt: new Date(),
        updatedAt: new Date(),
        notes: [],
      },
    ]
    render(<FolderList isLoading={false} folders={mockFolders} />)

    expect(screen.getByTestId('sidebar-menu')).toBeInTheDocument()
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('Personal')).toBeInTheDocument()
  })
})
