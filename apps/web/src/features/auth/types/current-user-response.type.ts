import type { SuccessResponse } from '@/shared/types/api.type'
import type { AuthUser } from './auth.type'

export type CurrentUserResponse = SuccessResponse<AuthUser>
