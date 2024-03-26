'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsLoadingPage() {
  return (
    <>
      <div className="w-full mb-[11px] flex items-center gap-[11px] min-h-[513px]">
        <Skeleton className="w-full rounded-3xl" />
      </div>
      <Skeleton className="w-full h-[171px] rounded-3xl" />
    </>
  );
}
