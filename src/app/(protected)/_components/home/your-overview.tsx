'use client';

import { useFileContext } from '@/app/_context/file.context';
import { YourOverview } from '@/components/shared/your-overview';
import { GetHotelDataResponse } from '@/server/actions/home/home.types';
import { formatToCurrency } from '@/utils/format-values.utils';

export function YourOverView(props: {
  comp_statistics: Awaited<GetHotelDataResponse>['comp_statistics'];
  my_statitics: Awaited<GetHotelDataResponse>['my_statistics'];
}) {
  const { fileUploadResponse } = useFileContext();

  const my_statitics = fileUploadResponse
    ? fileUploadResponse.my_statistics
    : props.my_statitics;

  const comp_statistics = fileUploadResponse
    ? fileUploadResponse.comp_statistics
    : props.comp_statistics;

  return (
    <div className="flex-[3] min-h-[550.73px] rounded-[35px] p-[6px] max-md:min-w-full">
      <h2 className="text-base ml-3 mt-[17px] mb-4 font-medium">
        Your Overview
      </h2>
      <div className="w-full flex gap-[7px] max-h-[92%]">
        <YourOverview
          type={'Your Property'}
          chartValue={+my_statitics.occupancy_rate}
          adr={Number(+my_statitics.adr || 0)}
          revPar={formatToCurrency(my_statitics.revpar)}
          empty={false}
          revenue={my_statitics.revenue}
        />
        <YourOverview
          type={'Comp Set'}
          chartValue={Number(comp_statistics.occupancy_rate || 0)}
          adr={Number(comp_statistics.adr || 0)}
          revPar={formatToCurrency(Number(comp_statistics.revpar || 0))}
          revenue={comp_statistics.revenue}
          empty={false}
        />
      </div>
    </div>
  );
}
