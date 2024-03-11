'use client';

import Image from 'next/image';
import { useState } from 'react';
import { format } from 'date-fns';
import { IoChevronDown } from 'react-icons/io5';

import { cn } from '@/utils/cn.util';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePicker({ value }: { value?: Date | string }) {
  const [date, setDate] = useState<Date | undefined>(
    new Date(value || Date.now())
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'p-2 flex items-center justify-between gap-3 bg-white rounded-full max-w-[314px] flex-[1] min-h-[56.2px] transition-all ease-in duration-250 hover:bg-gray-100',
            !value && 'text-muted-foreground'
          )}
        >
          <div className="flex items-center gap-2">
            <div className="w-[45px] h-[45px] rounded-full grid place-items-center bg-[#F6F6F6]">
              <Image
                src="/vectors/calendar-icon.svg"
                alt="calendar"
                width={14}
                height={14}
              />
            </div>
            <div className="flex flex-col items-start gap-[2px]">
              <span className="text-[10px] text-[#7B7B7B]">Select Date</span>
              <p className="text-[14px] font-medium">
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </p>
            </div>
          </div>
          <IoChevronDown className="text-[#8A9099] mr-3 text-sm" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
