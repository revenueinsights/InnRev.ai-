'use client';

import Image from 'next/image';
import { FiSend } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { GoArrowRight, GoUpload, GoX } from 'react-icons/go';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { cn } from '@/utils/cn.util';
import { chartData, chartOptions } from '@/utils/chart.utils';
import type {
  iGetProfilesByUserIdResponse,
  iHotelData,
} from '@/server/actions/home/home.types';
import { formatToCurrency } from '@/utils/format-values.utils';
import { CustomTooltip } from '@/components/shared/custom-tooltip';
import { DropdownField } from '@/components/shared/dropdown-field';

import { useHotelsOverview } from './hooks/use-hotels-overview.hook';
import { revalidatePath } from 'next/cache';

ChartJS.register(ArcElement);

function HotelOverviewCardButton({
  label,
  onClick,
  value,
  isSelected,
}: {
  onClick: () => void;
  label: string;
  value?: string | number;
  isSelected?: boolean;
}) {
  return (
    <button
      className={cn(
        'w-full max-w-[150px] rounded-[26px] bg-[#f6f6f6] flex items-center justify-between pl-5 py-[3px] pr-[5px] border-[2px] border-transparent',
        {
          'border-violet-500': isSelected,
        }
      )}
      onClick={onClick}
    >
      <span className="text-[#7F7F7F] text-[11px] font-medium">{label}</span>
      <span
        className={cn('transition-all price bg-white rounded-3xl p-3 px-4', {
          '!text-violet-500': isSelected,
        })}
      >
        {formatToCurrency(Number(value || 0))}
      </span>
    </button>
  );
}

export function HotelsOverview({
  data: propData,
  profiles,
  selectedProfileId,
}: {
  data: iHotelData[];
  profiles: iGetProfilesByUserIdResponse[];
  selectedProfileId?: string;
}) {
  const {
    currentFile,
    handleFileUpload,
    handleSelectItem,
    handleSetSearchParam,
    selectedItems,
    setCurrentFile,
    fileUploadResponse,
    resetFileImport,
  } = useHotelsOverview(selectedProfileId);

  const data = fileUploadResponse
    ? fileUploadResponse.initialResponse
    : propData;

  return (
    <div className="rounded-[22px] w-full mb-[9px]">
      <header className="w-full flex justify-between items-center mb-3 px-4 pt-[15px]">
        <div className="flex items-center gap-4">
          <h3 className="text-base font-medium min-w-[145x]">
            Hotels Overview
          </h3>
          <DropdownField
            options={profiles}
            labelAccessor="name"
            valueAccessor="id"
            dropdownTriggerLabel="Choose Profile"
            value={selectedProfileId}
            onChange={handleSetSearchParam}
            dropdownMenuLabel="Profiles:"
            disabled={!!fileUploadResponse}
          />
        </div>
        <div className="flex items-center gap-3">
          <CustomTooltip
            content={
              currentFile
                ? `Clear file: ${currentFile.name}`
                : 'Upload csv File'
            }
          >
            {currentFile ? (
              <button
                className="w-[46px] h-[46px] bg-white grid place-items-center transition-all rounded-full hover:bg-[#f5f5f5] cursor-pointer"
                onClick={() => {
                  setCurrentFile(undefined);
                  resetFileImport();
                }}
              >
                <GoX />
              </button>
            ) : (
              <>
                <label
                  className="w-[46px] h-[46px] bg-white grid place-items-center transition-all rounded-full hover:bg-[#f5f5f5] cursor-pointer"
                  htmlFor="file"
                >
                  <GoUpload />
                </label>
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  multiple={false}
                  accept=".csv"
                  onChange={(e) =>
                    setCurrentFile(
                      e.target.files ? e.target.files[0] : undefined
                    )
                  }
                />
              </>
            )}
          </CustomTooltip>
          {currentFile && (
            <CustomTooltip content="Run">
              <button
                className="w-[46px] h-[46px] bg-white grid place-items-center transition-all rounded-full hover:bg-[#f5f5f5] cursor-pointer"
                onClick={() =>
                  handleFileUpload(currentFile).catch(() =>
                    setCurrentFile(undefined)
                  )
                }
              >
                <FiSend />
              </button>
            </CustomTooltip>
          )}
          <button
            className="w-[46px] h-[46px] bg-white grid place-items-center transition-all rounded-full hover:bg-[#f5f5f5] disabled:opacity-80"
            disabled={!selectedItems.length}
            onClick={async () => {
              revalidatePath('/');
            }}
          >
            <GoArrowRight />
          </button>
        </div>
      </header>
      <div className="w-full overflow-x-auto flex items-center gap-[6px] px-[5px] pb-2.5">
        {data.map((item, index) => {
          const isItemOccupancySelected = selectedItems.some(
            (selectedItem) =>
              selectedItem.id === item.id &&
              selectedItem.occupancy_rate === item.occupancy_rate
          );

          const isItemRevparSelected = selectedItems.some(
            (selectedItem) =>
              selectedItem.id === item.id && selectedItem.revpar === item.revpar
          );

          const isItemAdrSelected = selectedItems.some(
            (selectedItem) =>
              selectedItem.id === item.id && selectedItem.adr === item.adr
          );

          return (
            <div
              className={cn(
                'flex-[1] border-[2px] transition-all border-transparent min-h-[177px] rounded-[22px] bg-white p-2 min-w-[289.32px]',
                {
                  'border-violet-500':
                    isItemAdrSelected ||
                    isItemOccupancySelected ||
                    isItemRevparSelected,
                }
              )}
              key={index}
            >
              <header className="flex gap-[13px] items-center justify-start w-full mb-[21PX]">
                <Image
                  src="/assets/hotel_logo.png"
                  width={64}
                  height={64}
                  alt="Hotel photo"
                  className="shrink-0"
                />
                <div className="flex flex-col gap-1 items-start">
                  <h3 className="text-sm">
                    {item.name || `Item ${index + 1}`}
                  </h3>
                  <p className="text-[#7F7F7F] text-[10px] inline-flex gap-[5px] items-center">
                    <div className="text-black w-[18px] h-[18px] rounded-full bg-[#F6F6F6] grid place-items-center">
                      <IoLocationOutline />
                    </div>
                    USA
                  </p>
                </div>
              </header>
              <div
                className={cn(
                  'w-full px-5 flex items-center justify-between gap-4',
                  {
                    'justify-center px-0': data.length < 4,
                  }
                )}
              >
                <button
                  className="flex flex-col items-center gap-1.5"
                  onClick={() => handleSelectItem(item, 'occupancy_rate')}
                >
                  <div className="relative -mt-2">
                    <Doughnut
                      id="occupancy"
                      data={chartData(
                        'Occupancy',
                        Number(item.occupancy_rate || 0),
                        false
                      )}
                      width={96}
                      height={96}
                      options={chartOptions('Occupancy')}
                    />
                    <h2
                      className={cn(
                        'w-full absolute top-1/2 left-0 text-center transition-all -translate-y-1/2 text-[17px] font-medium',
                        {
                          'text-violet-500': isItemOccupancySelected,
                        }
                      )}
                    >
                      {Number.isNaN(Number(item.occupancy_rate))
                        ? 0
                        : item.occupancy_rate || 0}
                      %
                    </h2>
                  </div>
                  <span
                    className={cn('transition-all text-xs text-[#B3B3B3]', {
                      '!text-violet-500': isItemOccupancySelected,
                    })}
                  >
                    Occupancy
                  </span>
                </button>
                <div className="flex flex-col gap-2">
                  <HotelOverviewCardButton
                    label="ADR"
                    isSelected={isItemAdrSelected}
                    onClick={() => handleSelectItem(item, 'adr')}
                    value={item.adr}
                  />
                  <HotelOverviewCardButton
                    label="RevPar"
                    isSelected={isItemRevparSelected}
                    onClick={() => handleSelectItem(item, 'revpar')}
                    value={item.revpar}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
