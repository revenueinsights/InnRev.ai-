import Image from 'next/image';
// import { Navigate, type ToolbarProps } from 'react-big-calendar';

import { DatePicker } from './date-picker';
import { Toggle } from './toggle';

export function Toolbar() {
  return (
    <div className="w-full flex justify-between mb-3.5 px-1">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/hotel_logo.png"
          alt="Hotel Logo"
          width={48}
          height={48}
        />
        <span className="text-base font-medium">Hotel</span>
      </div>
      <div className="flex items-center gap-[10px]">
        <DatePicker />
        <Toggle />
      </div>
    </div>
  );
}
