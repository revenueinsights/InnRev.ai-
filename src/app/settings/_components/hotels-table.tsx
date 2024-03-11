'use client';

import Image from 'next/image';
import { FiSend } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

import { cn } from '@/utils/cn.util';
import { CustomTooltip } from '@/components/shared/custom-tooltip';
import { formatToCurrency } from '@/utils/format-values.utils';

import { UserDialog } from './user-dialog';
import { DeleteUserDialog } from './delete-user-dialog';
import { useSettingsWidget } from '../_context/widgets.context';

export function HotelsTable({
  data,
}: {
  data: IAPIResponses.iFormatedProfileItem[];
}) {
  const { replace } = useRouter();
  const { onSelectRow, selectedRow } = useSettingsWidget();

  if (!data.length) {
    return (
      <h1 className="mx-auto mt-4 text-center font-bold">
        No hotels available
      </h1>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-6 mb-[11px] place-items-center">
        <h1 className="text-center text-[15px] font-normal text-[#77767E]"></h1>
        <h1 className="text-center text-[15px] font-normal text-[#77767E]">
          Profile name
        </h1>
        <h1 className="text-center text-[15px] font-normal text-[#77767E]">
          Occupancy
        </h1>
        <h1 className="text-center text-[15px] font-normal text-[#77767E] pr-8">
          ADR
        </h1>
        <h1 className="text-center text-[15px] font-normal text-[#77767E] pr-8">
          RevPar
        </h1>
        <h1 />
      </div>
      <div className="space-y-[8px] max-h-[450px] overflow-y-auto pr-1">
        {data.map((row, index) => {
          const firstHotel = row.firstHotel;

          if (!firstHotel) return null;

          return (
            <div
              className={cn(
                'grid grid-cols-6 place-items-center bg-white pl-[15px] py-6 pr-[25px] rounded-[25px] transition-all border-[3px] border-transparent hover:border-[#8A85FF] cursor-pointer',
                {
                  'border-[#8A85FF]': selectedRow?.id === row.id,
                }
              )}
              key={index}
              onClick={() => onSelectRow(row)}
            >
              <Image
                src="/assets/hotel_logo.png"
                alt="Hotel"
                width={70}
                height={70}
                className="-ml-6"
              />
              <h1 className="text-base font-medium whitespace-no-wrap text-center">
                {row.profileName}
              </h1>
              <span className="text-center text-[15px] font-normal">
                {firstHotel.occupancy_rate
                  ? `${
                      Number.isNaN(+firstHotel.occupancy_rate)
                        ? 0
                        : firstHotel.occupancy_rate
                    }%`
                  : '-'}
              </span>
              <span className="text-center text-[15px] font-normal">
                {formatToCurrency(firstHotel.adr ? +firstHotel.adr : 0)}
              </span>
              <span className="text-center text-[15px] font-normal">
                {formatToCurrency(firstHotel.revpar ? +firstHotel.revpar : 0)}
              </span>
              <div className="flex items-center gap-[17px]">
                <CustomTooltip content="Run">
                  <button
                    className="w-[45px] h-[45px] text-[18px] rounded-full grid place-items-center bg-[#F6F6F6]"
                    onClick={() => replace(`/?profile-id=${row.id}`)}
                  >
                    <FiSend />
                  </button>
                </CustomTooltip>
                <CustomTooltip content="Edit Hotel">
                  <UserDialog mode="edit" data={row}>
                    <button className="w-[45px] h-[45px] rounded-full grid place-items-center bg-[#F6F6F6]">
                      <Image
                        src="/vectors/edit-action-icon.svg"
                        alt="Edit Icon"
                        width={20}
                        height={20}
                      />
                    </button>
                  </UserDialog>
                </CustomTooltip>
                <DeleteUserDialog data={row} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
