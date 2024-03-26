'use server';

import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const access_token = cookies().get('access_token')?.value;

  if (!access_token) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }
}

export const config = {
  matcher: ['/calendar', '/', '/settings'],
};
