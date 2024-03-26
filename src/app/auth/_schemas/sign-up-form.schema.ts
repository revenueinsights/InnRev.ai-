import { z } from 'zod';

export const signUpFormSchema = z
  .object({
    user_email: z.string().email(),
    password: z.string().max(255),
    confirm_password: z.string().max(255),
    user_name: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords are not the same',
    path: ['confirm_password'],
  });

export type SignUpFormType = z.infer<typeof signUpFormSchema>;
