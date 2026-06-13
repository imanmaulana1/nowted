export interface SuccessResponse<T> {
  message?: string
  data: T
}

export interface ErrorBody {
  code: string
  message: string
  details?: Record<string, string[]>
}

export interface ErrorResponse {
  error: ErrorBody
}
