'use server';

import { api } from '@/api/api.service';

import type { iHotelData, iUploadCsvFileResponse } from './home.types';

export async function uploadCSVFile(file: File) {
  const formData = new FormData();

  formData.append('file', file, 'sample_inputs2.csv');

  try {
    const response = await api
      .post<iUploadCsvFileResponse>('/expedia/upload_result', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const response = res.data;

        const formattedArray: iHotelData[] = [];

        Object.keys(response).forEach((key, index) => {
          const originalObject = response[key];

          const formatedIndex = index + 1;

          const formattedObject = {
            id: originalObject?.id || formatedIndex,
            name: originalObject?.name || `Item ${formatedIndex}`,
            adr: Number(originalObject?.adr),
            revpar:
              originalObject?.revpar !== 'NaN'
                ? parseFloat(originalObject?.revpar || '0')
                : '0',
            occupancy_rate:
              originalObject?.occupancy_rate !== 'NaN'
                ? Number(originalObject?.occupancy_rate)
                : '0',
            revenue:
              originalObject?.revenue !== 'NaN'
                ? Number(originalObject?.revenue || '0')
                : '0',
            total_num_rooms:
              originalObject?.total_num_rooms !== 'NaN'
                ? Number(originalObject?.total_num_rooms || '0')
                : 0,
          };

          // console.log({ formattedObject, originalObject });

          formattedArray.push(formattedObject);
        });

        return Promise.resolve(formattedArray);
      });

    const firstItem = response[0];

    const my_statistics = {
      ...firstItem,
      adr: Number(firstItem?.adr),
      revpar: Number(firstItem?.revpar),
      revenue: Number(firstItem?.revenue),
      occupancy_rate: firstItem?.occupancy_rate || 0,
      total_num_rooms: Number(firstItem?.total_num_rooms),
    };

    const restOfResponse = response.slice(1);

    const comp_statistics = restOfResponse.reduce(
      (acc, hotel, index, array) => {
        const arrayLength = array.length;

        acc.adr = (Number(acc.adr) || 0) + Number(hotel.adr || 0);
        acc.revpar = (Number(acc.revpar) || 0) + Number(hotel.revpar || 0);
        acc.occupancy_rate =
          (Number(acc.occupancy_rate) || 0) + Number(hotel.occupancy_rate || 0);
        acc.revenue = (Number(acc.revenue) || 0) + Number(hotel.revenue || 0);
        acc.total_num_rooms =
          (Number(acc.total_num_rooms) || 0) +
          Number(hotel.total_num_rooms || 0);

        if (index === arrayLength - 1) {
          acc.adr /= arrayLength;
          acc.revpar /= arrayLength;
          acc.occupancy_rate /= arrayLength;
          acc.revenue /= arrayLength;
          acc.total_num_rooms /= arrayLength;
        }
        acc.adr = acc.adr.toFixed(2);
        acc.revpar = acc.revpar.toFixed(2);
        acc.occupancy_rate = acc.occupancy_rate.toFixed(2);
        acc.revenue = acc.revenue.toFixed(2);
        return acc;
      },
      {} as iHotelData
    );

    return {
      initialResponse: response,
      my_statistics,
      comp_statistics,
    };
  } catch (error) {
    console.error({ requestError: error });
  }
}
