import type { ZodError } from 'zod';

export const formatZodError = (err: ZodError): Record<string, string[]> => {
  return err.issues.reduce(
    (acc, issue) => {
      const field = issue.path.join('.');
      if (!acc[field]) acc[field] = [];
      acc[field].push(issue.message);
      return acc;
    },
    {} as Record<string, string[]>
  );
};
