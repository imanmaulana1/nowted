import type { SuccessResponse } from '@/shared/types/api.type'
import type { Note, NoteSummary } from './note.type'

export type GetNotesResponse = SuccessResponse<NoteSummary[]>

export type GetNoteResponse = SuccessResponse<Note>
