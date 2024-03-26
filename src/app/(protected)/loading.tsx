'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col w-full gap-4">
      <Skeleton className="w-full min-h-[281px] rounded-[35px]" />
      <div className="flex items-center gap-4 flex-wrap">
        <Skeleton className="w-full max-w-[802px] min-h-[281px] rounded-[35px]" />
        <Skeleton className="w-full flex-[1] min-h-[281px] rounded-[35px]" />
      </div>
    </div>
  );
}
