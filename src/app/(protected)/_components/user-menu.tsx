'use client';

import { LogOut } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';

import { logOut } from '@/lib/auth.lib';
import { Button } from '@/components/ui/button';
import { DefaultLoader } from '@/components/shared/loader';
import type { UserType } from '@/server/actions/auth/auth.types';

export function UserMenu({ data }: { data: UserType }) {
  const { mutate, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => logOut(),
  });

  return (
    <Button
      onClick={() => mutate()}
      className="w-full inline-flex gap-2"
      variant="outline"
      disabled={isPending}
    >
      {isPending ? (
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
