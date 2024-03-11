'use server';

import { api } from '@/api/api.service';

export async function getHotelsSettings(
  query?: string
): Promise<IAPIResponses.iFormatedProfileItem[]> {
  const userId: number = 1;

  try {
    const hotelsResponse = await api
      .get<IAPIResponses.iProfileItem[]>(`/profile/user/${userId}`)
      .then((res) => Promise.resolve(res.data));

    const formatedResponse = hotelsResponse.map((item) => ({
      ...item,
      firstHotel: item.hotels[0],
    }));

    if (query) {
      const filteredHotels = formatedResponse.filter((hotel) =>
        hotel.profileName.toLowerCase().includes(query.toLowerCase())
      );

      return Promise.resolve(filteredHotels);
    }

    return Promise.resolve(formatedResponse);
  } catch (error) {
    throw error;
  }
}
