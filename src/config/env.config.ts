import { z } from 'zod';

export const envSchema = z.object({
  NEXT_PUBLIC_BASE_API_URL: z.string().url(),
});

export type EnvType = z.infer<typeof envSchema>;
