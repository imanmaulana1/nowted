import { z } from 'zod';

export const createSuccessResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T
) =>
  z.object({
    message: z.string(),
    data: dataSchema,
  });

export const successResponseSchema = z.object({
  message: z.string(),
  data: z.record(z.string(), z.any()).optional(),
});

export const errorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.string(), z.array(z.string())).optional(),
  }),
});

export type SuccessResponse = z.infer<typeof successResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
