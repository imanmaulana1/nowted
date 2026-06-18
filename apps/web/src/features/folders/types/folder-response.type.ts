import type { SuccessResponse } from '@/shared/types/api.type'

import type { Folder, FolderWithNotes } from './folder.type'

export type GetFoldersResponse = SuccessResponse<FolderWithNotes[]>
export type CreateFolderResponse = SuccessResponse<Folder>
export type UpdateFolderResponse = SuccessResponse<Folder>
export type DeleteFolderResponse = SuccessResponse<Folder>
