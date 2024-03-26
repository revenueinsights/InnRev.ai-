'use client';

import { Suspense } from 'react';
import Image from 'next/image';

import { Input } from '@/components/ui/input';
import { useSearchUrl } from '@/hooks/use-search-url.hook';

import { HotelsTable } from './hotels-table';
import { UserDialog } from './user-dialog';

export function HotelsWidget({ data }: { data: IAPIResponses.iFormatedProfileItem[] }) {
  const { handleSetSearchParam } = useSearchUrl('query');

  return (
    <div className="flex-[2] h-full px-1.5 py-2.5 section-bg rounded-3xl">
      <header className="flex items-center justify-between gap-[17px] w-full px-[12px] mb-[20px]">
        <h3 className="text-base font-medium">Hotels</h3>
        <div className="flex-[5] relative">
          <Image
            src="/vectors/search.svg"
            alt="Search"
            width={18}
            height={18}
            className="absolute left-[17px] top-1/2 -translate-y-1/2"
          />
          <Input
            placeholder="Search for your hotel"
            className="min-h-[46px] !pl-12 rounded-full placeholder:text-base"
            onChange={(e) => handleSetSearchParam(e.target.value)}
          />
        </div>
        {/* <button className="w-[46px] h-[46px] grid place-items-center rounded-full bg-white">
          <Image
            src="/vectors/filter.svg"
            alt="Filter"
            width={14}
            height={14}
          />
        </button> */}
        <UserDialog mode="create">
          <button className="flex-[1] rounded-full bg-white px-[17px] flex items-center gap-[10px] text-[#B3B3B3] text-[14px] min-h-[46px]">
            <Image
              src="/vectors/plus.svg"
              alt="Plus icon"
              width={12}
              height={12}
            />
            Add new user
          </button>
        </UserDialog>
      </header>
      <Suspense>
        <HotelsTable data={data} />
      </Suspense>
    </div>
  );
}
