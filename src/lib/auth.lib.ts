'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { userSchema } from '@/server/actions/auth/auth.types';

export async function auth() {
  const getStorageCookies = cookies().get;

  const user = getStorageCookies('user')?.value;

  const access_token = getStorageCookies('access_token')?.value.split(' ')[1];
  const userResponse = user
    ? userSchema.optional().safeParse(JSON.parse(user))
    : undefined;

  if (userResponse?.success) {
    return {
      access_token,
      user: userResponse.data,
    };
  }

  return {
    access_token,
    user: undefined,
  };
}

export async function logOut(origin?: string) {
  const removeCookie = cookies().delete;

  removeCookie('user');
  removeCookie('access_token');

  revalidatePath(origin || '/');
  redirect('/');
}
