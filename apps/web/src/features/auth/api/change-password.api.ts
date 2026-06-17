import { apiClient } from '@/shared/lib/api-client'

import type { ChangePasswordInput } from '../schemas/change-password.schema'

export const changePasswordApi = async (
  payload: ChangePasswordInput
): Promise<void> => {
  return await apiClient.patch('/auth/change-password', {
    currentPassword: payload.currentPassword,
    newPassword: payload.newPassword,
  })
}
