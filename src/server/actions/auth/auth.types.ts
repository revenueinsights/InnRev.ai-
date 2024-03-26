import { z } from 'zod';

export const userSchema = z.object({
  user_email: z.string().email(),
  user_name: z.string(),
  id: z.string().uuid(),
});

export const authResponseSchema = z.object({
  access_token: z.string(),
  user: userSchema,
});

export type UserType = z.infer<typeof userSchema>;

export type AuthResponseType = z.infer<typeof authResponseSchema>;
