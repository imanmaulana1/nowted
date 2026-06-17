import type { AuthUser } from '@/features/auth/types/auth.type'

export type Profile = Omit<AuthUser, 'totalNotes' | 'totalFolders'>
