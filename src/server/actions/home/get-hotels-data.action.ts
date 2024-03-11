'use server';

import { api } from '@/api/api.service';

import type { iHotelData, iGetProfilesByUserIdResponse } from './home.types';

const analyticsProfileAPI = async (profileId: number) => {
  const response = await api
    .get<iHotelData[]>(`/analytics/profile/${profileId}`)
    .then((res) => res.data);

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

  const comp_statistics = restOfResponse.reduce((acc, hotel, index, array) => {
    const arrayLength = array.length;

    acc.adr = (Number(acc.adr) || 0) + Number(hotel.adr || 0);
    acc.revpar = (Number(acc.revpar) || 0) + Number(hotel.revpar || 0);
    acc.occupancy_rate =
      (Number(acc.occupancy_rate) || 0) + Number(hotel.occupancy_rate || 0);
    acc.revenue = (Number(acc.revenue) || 0) + Number(hotel.revenue || 0);
    acc.total_num_rooms =
      (Number(acc.total_num_rooms) || 0) + Number(hotel.total_num_rooms || 0);

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
  }, {} as iHotelData);

  return {
    initialResponse: response,
    my_statistics,
    comp_statistics,
  };
};

export async function getHotelsData(userProfileId?: string) {
  const userId = 1;

  try {
    const profilesResponse = await api
      .get<iGetProfilesByUserIdResponse[]>(`/analytics/user/${userId}`)
      .then((res) => Promise.resolve(res.data));

    if (!profilesResponse.length) return undefined;

    if (!userProfileId || Number.isNaN(+userProfileId)) {
      const response = await analyticsProfileAPI(
        profilesResponse[0]?.id as number
      );

      return {
        response,
        profilesResponse,
        currentProfile: profilesResponse[0],
      };
    }

    const response = await analyticsProfileAPI(+userProfileId);

    return { response, profilesResponse };
  } catch (error) {
    return Promise.reject(error);
  }
}
