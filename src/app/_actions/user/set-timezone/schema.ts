import { z } from 'zod';

export const setUserTimezoneSchema = z.object({
  timezone: z.string().trim().min(1),
});

export type ISetUserTimezone = z.infer<typeof setUserTimezoneSchema>;
