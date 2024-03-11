'use client';

import Image from 'next/image';
import { memo, useCallback, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

import { cn } from '@/utils/cn.util';
import { padWithZeros } from '@/utils/pad-with-zeros.util';

import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';

interface iTimeButtonProps {
  label: string;
  onSelectHour?: (time: string | undefined) => void;
  defaultHour?: string;
}

function handleTimeFormatting(time: string | undefined): string | undefined {
  if (!time) return undefined;

  const [currentTime, period] = time.split(' ') as [string, string];
  const isTimePM = period === 'P.M.';
  const numberFyedValue = parseInt(currentTime, 10);
  const formattedTime = isTimePM ? numberFyedValue + 12 : numberFyedValue;

  return formattedTime.toString();
}

function TimeButtonComponent({
  label,
  onSelectHour,
  defaultHour,
}: iTimeButtonProps) {
  const [isPopoverOpen, setIsPopoverButtonOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(() => {
    if (defaultHour) {
      const fixedHour = +defaultHour;

      if (Number.isNaN(fixedHour)) return undefined;

      const isCurrentHourPM = fixedHour >= 12;
      const finalHour = `${padWithZeros(
        isCurrentHourPM ? fixedHour - 12 : fixedHour
      )}:00 ${isCurrentHourPM ? 'P.M.' : 'A.M.'}`;

      return finalHour;
    }

    return undefined;
  });

  const handleSelectTime = useCallback(
    (finalHour: string) => {
      setIsPopoverButtonOpen(false);
      setSelectedHour(finalHour);
      onSelectHour?.(handleTimeFormatting(finalHour));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Popover onOpenChange={setIsPopoverButtonOpen} open={isPopoverOpen}>
      <PopoverTrigger className="time-button flex-[1]">
        <div className="flex items-center gap-2">
          <div className="w-[45px] h-[45px] rounded-full grid place-items-center bg-white">
            <Image
              src="/vectors/calendar-icon.svg"
              alt="calendar"
              width={14}
              height={14}
            />
          </div>
          <div className="flex flex-col items-start gap-[2px]">
            <span className="text-[10px] text-[#7B7B7B]">{label}</span>
            <p className="text-[14px] font-medium">
              {selectedHour || 'Choose Time'}
            </p>
          </div>
        </div>
        <IoChevronDown className="text-[#8A9099] mr-3 text-sm" />
      </PopoverTrigger>
      <PopoverContent className="w-[314px] flex flex-col max-h-[250px] gap-1 overflow-y-auto">
        {[...Array(24).keys()].map((hour) => {
          const fixedHour = hour + 1;
          const isCurrentHourPM = hour >= 12;
          const finalHour = `${padWithZeros(
            isCurrentHourPM ? fixedHour - 12 : fixedHour
          )}:00 ${isCurrentHourPM ? 'P.M.' : 'A.M.'}`;

          return (
            <button
              className={cn(
                'font-semibold w-full p-2 rounded-lg hover:bg-[#f0f0f0]',
                {
                  'bg-[#f5f5f5]': finalHour === selectedHour,
                }
              )}
              key={hour}
              onClick={() => handleSelectTime(finalHour)}
            >
              {finalHour}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

export const TimeButton = memo(TimeButtonComponent);
