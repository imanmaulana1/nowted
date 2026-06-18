export interface NoteInFolder {
  id: string
  title: string
  slug: string
  status: string
  isFavorite: boolean
  updatedAt: string
}

export interface Folder {
  id: string
  name: string
  slug: string
  updatedAt: Date
  createdAt: Date
}

export interface FolderWithNotes extends Folder {
  notes: NoteInFolder[]
}
