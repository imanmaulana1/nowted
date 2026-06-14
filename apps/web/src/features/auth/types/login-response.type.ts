import type { SuccessResponse } from '@/shared/types/api.type'

export type LoginResponse = SuccessResponse<{
  user: {
    id: string
    fullName: string
    email: string
    avatarUrl: string | null
    createdAt: Date
    totalNotes: number
    totalFolders: number
  }
  accessToken: string
}>
