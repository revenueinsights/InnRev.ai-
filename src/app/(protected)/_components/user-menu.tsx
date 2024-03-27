'use client';

import { LogOut } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import { logOut } from '@/lib/auth.lib';
import { Button } from '@/components/ui/button';
import { DefaultLoader } from '@/components/shared/loader';
import { useAuth } from '@/hooks/use-auth.hook';

export function UserMenu() {
  const { authData, isLoading } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => logOut(),
  });

  return (
    <Button
      onClick={() => mutate()}
      className="w-full inline-flex gap-2"
      variant="outline"
      disabled={isPending || isLoading}
    >
      {isPending || isLoading ? (
        <DefaultLoader />
      ) : (
        <>
          <LogOut className="w-4 h-4" />
          Logout
        </>
      )}
    </Button>
  );
}
