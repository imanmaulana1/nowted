export interface AuthUser {
  id: string
  fullName: string
  email: string
  avatarUrl: string | null
  createdAt: Date
  totalNotes: number
  totalFolders: number
}
