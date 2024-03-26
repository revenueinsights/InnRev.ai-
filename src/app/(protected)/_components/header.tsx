import Link from 'next/link';
import Image from 'next/image';
import { CiSearch } from 'react-icons/ci';
// import { IoLocationOutline } from 'react-icons/io5';

import { chillaxFont } from '@/lib/chillax.font';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { auth } from '@/lib/auth.lib';

import { UserMenu } from './user-menu';

export async function Header() {
  const { user } = await auth();

  return (
    <header className="w-full flex justify-between items-center mb-[15px]">
      <Link
        href="/"
        className="w-full max-w-[171px] h-[56px] flex items-center gap-[20px] bg-white rounded-full p-[4px]"
      >
        <Image src="/assets/logo.png" width={46} height={48} alt="Innrev.ai" />
        <span className={`text-[17.5px] ${chillaxFont.className}`}>
          innrev.ai
        </span>
      </Link>
      <div className="flex items-center gap-[5px]">
        <button className="w-[241px] p-[6px] min-h-[56px] bg-white rounded-full flex items-center justify-start gap-2 max-md:hidden">
          <div className="w-11 h-11 rounded-full bg-[#F6F6F6] grid place-items-center">
            <Image
              src="/vectors/calendar-icon.svg"
              alt="Calendar"
              width={13}
              height={14}
            />
          </div>
          <div className="flex flex-col gap-1 items-start">
            <span className="text-[10px] text-[#7F7F7F]">Dates</span>
            <p className="text-[11px]">Jan 9 - Jan 10</p>
          </div>
        </button>
        <button className="bg-white text-[#292D32] min-w-[56px] h-[56px] grid place-items-center rounded-full text-[20px] transition-all hover:bg-[#f5f5f5]">
          <CiSearch />
        </button>
        {user ? (
          <Popover>
            <PopoverTrigger>
              <Image
                src="/assets/user-new1.jpg"
                width={56}
                height={56}
                alt="User"
                className="max-w-none h-fit rounded-full"
              />
            </PopoverTrigger>
            <PopoverContent align="end">
              <UserMenu data={user} />
            </PopoverContent>
          </Popover>
        ) : null}
      </div>
    </header>
  );
}
