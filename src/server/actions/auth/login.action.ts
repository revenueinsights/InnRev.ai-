'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { validateApiCall } from '@/utils/validate-api-call.util';
import type{ LoginFormType } from '@/schemas/login-form.schema';
import { getExpirationDateFromToken } from '@/utils/get-expiration-date-from-token.util';

import { signUpResponseSchema } from './auth.types';

export async function login(
  { email, password }: LoginFormType,
  origin?: string
) {
  const setCookie = cookies().set;

  try {
    const authResponse = await validateApiCall({
      endpoint: '/auth/sign-in',
      zodSchema: signUpResponseSchema,
      method: 'POST',
      body: {
        email,
        password,
      },
    });

    const expires = getExpirationDateFromToken(authResponse.access_token);

    setCookie(
      'access_token',
      `${authResponse.token_type} ${authResponse.access_token}`,
      {
        secure: true,
        expires,
      }
    );

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