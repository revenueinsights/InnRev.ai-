'use client';

import { MdOutlineCalendarMonth, MdLocationPin } from 'react-icons/md';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useSearchUrl } from '@/hooks/use-search-url.hook';

export function Toggle() {
  const { getSearchParamValue, handleSetSearchParam } = useSearchUrl(
    'type',
    'calendar'
  );

  return (
    <ToggleGroup
      className="flex items-center gap-3 p-1.5 rounded-[42px] bg-white"
      type="single"
      value={getSearchParamValue()}
    >
      <ToggleGroupItem
        className="flex-[1] px-6 h-full flex justify-center items-center gap-2.5"
        value="list"
        onClick={() => handleSetSearchParam('list')}
      >
        <MdLocationPin />
        List
      </ToggleGroupItem>
      <ToggleGroupItem
        className="flex-[1] px-6 h-full flex justify-center items-center gap-2.5"
        value="calendar"
        onClick={() => handleSetSearchParam('calendar')}
      >
        <MdOutlineCalendarMonth />
        Calendar
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
