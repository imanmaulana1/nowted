export interface AuthUser {
  id: string
  fullName: string
  email: string
  avatarUrl: string | null
  updatedAt: string
  totalNotes: number
  totalFolders: number
}
