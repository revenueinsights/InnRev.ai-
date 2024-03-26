import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  hashed_password: z.string(),
});

export const signUpResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  user: userSchema,
});

export type UserType = z.infer<typeof userSchema>;

export type SignUpResponseType = z.infer<typeof signUpResponseSchema>;
