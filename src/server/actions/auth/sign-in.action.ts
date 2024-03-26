'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { validateApiCall } from '@/utils/validate-api-call.util';
import { type SignInFormType } from '@/app/auth/_schemas/sign-in-form.schema';
import { getExpirationDateFromToken } from '@/utils/get-expiration-date-from-token.util';

import { authResponseSchema } from './auth.types';

export async function signIn(
  { user_email, password }: SignInFormType,
  origin?: string
) {
  const setCookie = cookies().set;

  try {
    const authResponse = await validateApiCall({
      endpoint: '/auth/sign-in',
      zodSchema: authResponseSchema,
      method: 'POST',
      body: {
        user_email,
        password,
      },
    });

    const expires = getExpirationDateFromToken(authResponse.access_token);

    setCookie('access_token', authResponse.access_token, {
      secure: true,
      expires,
    });

    setCookie('user', JSON.stringify(authResponse.user), {
      secure: true,
      expires,
    });

    revalidatePath(origin || '/');

    return Promise.resolve(authResponse);
  } catch (error) {
    throw error;
  }
}
