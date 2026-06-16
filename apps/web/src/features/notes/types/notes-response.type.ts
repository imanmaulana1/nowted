import type { SuccessResponse } from '@/shared/types/api.type'
import type { Note, NoteState, NoteSummary } from './note.type'

export type GetNotesResponse = SuccessResponse<NoteSummary[]>

export type GetNoteResponse = SuccessResponse<Note>

export type NoteMutationResponse = SuccessResponse<NoteState>

export type DeleteNoteResponse = SuccessResponse<Pick<Note, 'id' | 'slug'>>
