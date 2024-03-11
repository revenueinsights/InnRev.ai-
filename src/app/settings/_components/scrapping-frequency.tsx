'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { IoChevronDown } from 'react-icons/io5';
import { memo, useCallback, useMemo, useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/utils/cn.util';
import { padWithZeros } from '@/utils/pad-with-zeros.util';

interface iSelectedValuesState {
  hour: number;
  minutes: number;
}

interface iScrappingFrequencyProps {
  onSelectFrequency?: (time: iSelectedValuesState) => void;
  defaultFrequency?: string;
}

function ScrappingFrequencyComponent({
  defaultFrequency,
  onSelectFrequency,
}: iScrappingFrequencyProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<iSelectedValuesState>(
    () => {
      const date = new Date();

      if (defaultFrequency) {
        const numberfyedValue = +defaultFrequency;
        const minutes = numberfyedValue % 60;

        return {
          minutes,
          hour: +(numberfyedValue / 60).toFixed(0),
        };
      }

      const roundedMinutes = Math.round(date.getMinutes() / 10) * 10;

      return {
        hour: date.getHours(),
        minutes: roundedMinutes,
      };
    }
  );

  const frequecyHourValues = useMemo(
    () =>
      [...Array(24).keys()].map((value) => {
        const finalValue = value + 1;

        return finalValue;
      }),
    []
  );

  const frequencyMinutesValues = useMemo(
    () => [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
    []
  );

  const handleChange = useCallback(
    (value: number, key: keyof iSelectedValuesState) => {
      setSelectedValues((prev) => {
        onSelectFrequency?.({ ...prev, [key]: value });

        return {
          ...prev,
          [key]: value,
        };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setSelectedValues]
  );

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger className="time-button">
        <div className="flex items-center gap-2">
          <div className="w-[45px] h-[45px] rounded-full grid place-items-center bg-white">
            <Image
              src="/vectors/clock-icon.svg"
              alt="calendar"
              width={14}
              height={14}
            />
          </div>
          <div className="flex flex-col items-start gap-[2px]">
            <span className="text-[10px] text-[#7B7B7B]">
              Scrapping Frequency
            </span>
            <p className="text-[14px] font-medium">
              {padWithZeros(selectedValues.hour)}:
              {padWithZeros(selectedValues.minutes)}
            </p>
          </div>
        </div>
        <IoChevronDown className="text-[#8A9099] mr-3 text-sm" />
      </PopoverTrigger>
      <PopoverContent className="w-[314px] flex flex-col gap-2 relative">
        <header className="flex items-center p-0.5 justify-end sticky top-0">
          <button onClick={() => setIsPopoverOpen(false)} className="text-sm">
            <X className="h-4 w-4" />
          </button>
        </header>
        <div className="grid grid-cols-2 gap-3 max-h-[250px] overflow-y-auto">
          <div className="relative flex-[1] min-h-full flex flex-col gap-2">
            {frequecyHourValues.map((value) => (
              <button
                key={value}
                className={cn(
                  'p-2 rounded-md hover:bg-[#f5f5f5] transition-all',
                  {
                    'bg-[#f0f0f0]': selectedValues.hour === value,
                  }
                )}
                onClick={() => handleChange(value, 'hour')}
              >
                {padWithZeros(value)}
              </button>
            ))}
          </div>
          <div className="relative flex-[1] min-h-full flex flex-col justify-between gap-2">
            {frequencyMinutesValues.map((value) => (
              <button
                key={value}
                className={cn(
                  'px-2 py-6 rounded-md hover:bg-[#f5f5f5] transition-all',
                  {
                    'bg-[#f0f0f0]': selectedValues.minutes === value,
                  }
                )}
                onClick={() => handleChange(value, 'minutes')}
              >
                {padWithZeros(value)}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const ScrappingFrequency = memo(ScrappingFrequencyComponent);