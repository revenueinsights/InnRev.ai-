'use client';

import Image from 'next/image';

import { useSettingsWidget } from '../_context/widgets.context';

import { isNullableValue } from '@/utils/is-nullable-value.util';
import { formatToCurrency } from '@/utils/format-values.utils';
import { DefaultLoader } from '@/components/shared/loader';
import { DropdownField } from '@/components/shared/dropdown-field';
import { cn } from '@/utils/cn.util';

export function RoomsWidget() {
  const {
    selectedRow,
    setCurrentHotelId,
    isLoadingRooms,
    rooms,
    currentHotelId,
  } = useSettingsWidget();

  if (!selectedRow) return null;

  const currentHotel = selectedRow?.hotels.find(
    (hotel) => hotel.id === currentHotelId
  );

  console.log(selectedRow.hotels);

  return (
    //min-h-[575px]
    <div className="section-bg h-full overflow-y-auto hide-scrollbar rounded-[30px] flex-[1] pt-4 px-[6px] flex flex-col gap-4">
      <header className="w-full flex items-center justify-between px-4 gap-3 flex-[1]">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/hotel_logo.png"
            alt="Hotel Logo"
            width={48}
            height={48}
          />
          <DropdownField
            options={selectedRow.hotels.sort((a, b) => a.id - b.id)}
            labelAccessor="hotelName"
            valueAccessor="id"
            dropdownTriggerLabel={selectedRow.profileName}
            disabled={isLoadingRooms}
            value={currentHotelId}
            onChange={(value) => {
              if (isNullableValue(value)) return;

              setCurrentHotelId(+value);
            }}
          />
        </div>
        <div className="min-h-[45px] rounded-full bg-white p-3.5 flex items-center gap-[7px]">
          <p className="font-normal text-[11px]">Total Rooms</p>
          <span className="text-[15px] font-medium">
            {currentHotel?.total_num_rooms || '-'}
          </span>
        </div>
      </header>
      <div className="w-full rounded-[30px] bg-white p-2 flex-[4]">
        <div className="grid grid-cols-3 mb-[11px] dark:text-gray-500">
          <h1 className="text-center text-[15px] font-normal text-[#77767E]">
            Room Name
          </h1>
          <h1 className="text-center text-[15px] font-normal text-[#77767E]">
            Rooms Left
          </h1>
          <h1 className="text-center text-[15px] font-normal text-[#77767E] pr-7">
            Price
          </h1>
          <h1 />
        </div>
        <div
          className={cn('space-y-[8px] overflow-y-auto', {
            'flex items-center justify-center': isLoadingRooms,
          })}
          style={{
            maxHeight: 'calc(40vh - 100px)',
          }}
        >
          {isLoadingRooms ? (
            <div className="flex flex-col items-center gap-2">
              <DefaultLoader />
              <span>Loading rooms...</span>
            </div>
          ) : !rooms?.length ? (
            <h2>No rooms avalailabe for this hotel profile!</h2>
          ) : (
            rooms.map((room, index) => (
              <div
                className="grid grid-cols-3 gap-2 place-items-center bg-[#F6F6F6] pl-[21px] py-5 pr-[25px] rounded-[25px]"
                key={index}
              >
                <div className="flex items-start flex-col justify-start gap-1">
                  <h1 className="text-[15px] font-medium min-w-[109px] whitespace-no-wrap text-left">
                    {room.listing_text}
                  </h1>
                  {/* <span className="inline-flex items-center gap-[1px] text-[#707070] text-[13.5px] ">
                      {room.num_room_available}
                    </span> */}
                </div>
                <span className="text-base font-normal rounded-full bg-white grid p-3.5 place-items-center">
                  {room.num_room_available}
                </span>
                <span className="ml-8 text-base font-normal p-5 rounded-full bg-white grid place-items-center">
                  {formatToCurrency(+room.price)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
