import { z } from 'zod';

export const signInFormSchema = z.object({
  user_email: z.string().email(),
  password: z.string().max(255),
});

export type SignInFormType = z.infer<typeof signInFormSchema>;
