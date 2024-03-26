'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/cn.util';
import { sidebarLinks } from '@/data/sidebar-links.data';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-white min-h-full p-[4px] rounded-[38px] transition-all flex flex-col justify-between sticky top-0 w-[60px]">
      <div className="flex flex-col gap-2">
        {sidebarLinks.map(({ icon: Icon, ...sidebarLink }, index) => (
          <Link
            href={sidebarLink.href}
            key={index}
            className={cn(
              'w-[52px] h-[52px] rounded-full bg-[#F6F6F6] grid place-items-center transition-all hover:bg-[#f0f0f0]',
              {
                'bg-[#8A85FF] !text-white !stroke-white hover:bg-[#C5CCFF]':
                  pathname === sidebarLink.href,
              }
            )}
          >
            <Icon />
          </Link>
        ))}
      </div>
      <button className="gap-2 w-[52px] h-[52px] rounded-full bg-[#F6F6F6] hover:bg-[#f0f0f0] flex items-center justify-center">
        <Image
          src="/vectors/logout.svg"
          width={16}
          height={16}
          alt="Sign Out"
          className="max-w-none h-fit"
        />
      </button>
    </aside>
  );
}
