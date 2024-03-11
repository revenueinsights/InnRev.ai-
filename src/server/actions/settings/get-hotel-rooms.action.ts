'use server';

import { api } from '@/api/api.service';

export async function getHotelsRooms(hotelId: number) {
  try {
    const roomsResponse = await api.get<IAPIResponses.iRoomsResponse[]>(
      `/rooms/${hotelId}`
    );

    return Promise.resolve(roomsResponse.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
