'use client';

import { useQuery } from '@tanstack/react-query';

import { auth } from '@/lib/auth.lib';

export function useAuth() {
  const { data: authData } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => auth(),
  });

  return { authData };
}
