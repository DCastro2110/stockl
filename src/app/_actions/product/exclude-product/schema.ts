import z from 'zod';

export const excludeProductSchema = z.object({
  id: z.uuid(),
});

export type TExcludeProductSchema = z.infer<typeof excludeProductSchema>;
