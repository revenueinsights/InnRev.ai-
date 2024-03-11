import Image from 'next/image';
import { Doughnut } from 'react-chartjs-2';
import { DollarSignIcon } from 'lucide-react';
import { Chart as ChartJS, ArcElement } from 'chart.js';

import { cn } from '@/utils/cn.util';
import { chartData, chartOptions } from '@/utils/chart.utils';
import { formatToCurrency } from '@/utils/format-values.utils';

ChartJS.register(ArcElement);

interface iYourOverviewProps {
  type: string;
  chartValue: number;
  adr: number;
  revPar: string;
  empty: boolean;
  revenue?: string | number;
}

export function YourOverview({
  chartValue,
  empty,
  adr,
  type,
  revPar,
  revenue,
}: iYourOverviewProps) {
  const formatedChartValue = Number.isNaN(chartValue) ? 0 : chartValue;

  return (
    <div className="p-3 bg-white rounded-3xl w-full h-full">
      <div className="flex items-center gap-4">
        <div className="w-[56px] h-[56px] grid place-items-center rounded-full bg-[#f6f6f6]">
          <Image src="/vectors/flash.svg" width={12} height={15} alt="" />
        </div>
        <span>{type} OCC</span>
      </div>
      <div className="mt-6">
        <div className="relative max-w-64 max-h-56 -mt-20 mx-auto">
          <Doughnut
            data={chartData('ADR', formatedChartValue, empty)}
            width={320}
            height={160}
            options={chartOptions('ADR')}
          />
          <div
            className={cn('needle', empty ? 'bg-[#B6B6B6]' : 'bg-[#948FFA]')}
            style={{
              transform: `rotate(${
                formatedChartValue === 0
                  ? -85
                  : formatedChartValue > 50
                  ? formatedChartValue - (100 - formatedChartValue + 5)
                  : formatedChartValue - (100 - formatedChartValue)
              }deg)`,
            }}
          />
          <div className="w-full absolute bottom-14 -left-3 text-center font-normal text-xl">
            {empty ? 'XX' : formatedChartValue}%
          </div>
        </div>
        <div className="flex flex-col gap-2 -mt-4">
          <div className="rounded-3xl overview_subcard p-3 pl-6 flex justify-between items-center">
            <div>
              <span className="text-xs text-[#ADADAD]">{type} ADR</span>
              <h3 className={cn('text-[17px]', empty && 'opacity-30')}>
                ${empty ? 'XX' : Number.isNaN(adr) ? 0 : adr}
              </h3>
            </div>
            <div className="button_round bg-white">
              <Image src="/vectors/car.svg" width={13} height={13} alt="" />
            </div>
          </div>
          <div className="rounded-3xl overview_subcard p-3 pl-6 flex justify-between items-center">
            <div>
              <span className="text-xs text-[#ADADAD]">{type} RevPar</span>
              <div className={`text-[17px] ${empty && 'opacity-30'}`}>
                {revPar}
              </div>
            </div>
            <div className="button_round bg-white">
              <Image src="/vectors/flash.svg" width={13} height={13} alt="" />
            </div>
          </div>
          <div className="rounded-3xl overview_subcard p-3 pl-6 flex justify-between items-center">
            <div>
              <span className="text-xs text-[#ADADAD]">{type} Revenue</span>
              <div className={`text-[17px] ${empty && 'opacity-30'}`}>
                {formatToCurrency(Number(revenue || 0))}
              </div>
            </div>
            <div className="button_round bg-white">
              <DollarSignIcon className="w-[13px] h-[13px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
