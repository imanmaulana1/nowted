export interface ErrorParams {
  statusCode?: number;
  code?: string;
  message?: string;
  details?: Record<string, string[]> | undefined;
}
