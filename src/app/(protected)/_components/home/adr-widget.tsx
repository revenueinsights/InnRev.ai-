'use client';

import Image from 'next/image';
import { IoLocationOutline } from 'react-icons/io5';

import type { iHotelData } from '@/server/actions/home/home.types';
import { formatToCurrency } from '@/utils/format-values.utils';
import { useFileContext } from '@/app/_context/file.context';

export function AdrWidget({ data: propData }: { data: iHotelData[] }) {
  const { fileUploadResponse } = useFileContext();

  const data = fileUploadResponse
    ? fileUploadResponse.initialResponse
    : propData;

  return (
    <div className="flex flex-[2] flex-col gap-3 rounded-[35px] p-[6px] max-md:min-w-full min-h-[550.73px]">
      <header className="w-full flex items-center justify-between pr-1">
        <h2 className="text-base ml-3 mt-[17px] font-medium">Hotels ADR</h2>
        <button className="text-[#B3B3B3] text-xs bg-white inline-flex gap-5 items-center transition-all rounded-full hover:bg-[#f5f5f5] justify-center w-[94px] h-[46px]">
          Filter
          <Image
            src="/vectors/filter.svg"
            alt="Filter Icon"
            width={14}
            height={14}
          />
        </button>
      </header>
      <div className="flex items-center w-full justify-between px-3">
        <h4 className="font-light text-[11px] text-[#B3B3B3]">Hotels</h4>
        <p className="text-sm">ADR</p>
      </div>
      <div className="flex-[1] flex flex-col gap-1.5 items-center max-h-[450px] overflow-y-auto hide-scrollbar">
        {data.map((adr, index) => (
          <div
            className="w-full bg-white px-6 py-4 min-h-[84px] rounded-[27px] flex items-center justify-between flex-[1]"
            key={index}
          >
            <div className="flex items-center gap-3">
              <Image
                src={'/assets/hotel_logo.png'}
                width={48}
                height={48}
                alt={adr.name}
              />
              <div className="flex flex-col items-start gap-3">
                <h3 className="text-[13px] font-medium">{adr.name}</h3>
                <p className="text-[#808080] text-[12px] inline-flex items-center">
                  <IoLocationOutline />
                  USA
                </p>
              </div>
            </div>
            <span className="w-full max-w-[67px] min-h-[50px] rounded-[25px] bg-[#f6f6f6] grid place-items-center text-xs">
              {formatToCurrency(Number(adr.adr || 0))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
