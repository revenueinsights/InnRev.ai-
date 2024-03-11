'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-col gap-3 flex items-center justify-center min-h-[calc(100vh-66px)] max-h-full">
      <h2>Something went wrong!</h2>
      {error.message ? <span>{error.message}</span> : null}
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
