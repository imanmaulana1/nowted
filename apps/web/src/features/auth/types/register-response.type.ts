import type { SuccessResponse } from '@/shared/types/api.type'

export type RegisterResponse = SuccessResponse<{
  id: string
  fullName: string
  email: string
  avatarUrl: string | null
  createdAt: Date
}>
