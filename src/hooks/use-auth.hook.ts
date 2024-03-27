'use client';

import { useQuery } from '@tanstack/react-query';

import { auth } from '@/lib/auth.lib';

export function useAuth() {
  const {
    data: authData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => auth(),
  });

  if (error) {
    return { authData: undefined, isLoading: false, error };
  }

  return { authData, isLoading };
}
