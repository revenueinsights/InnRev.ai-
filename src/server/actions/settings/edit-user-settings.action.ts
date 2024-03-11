'use server';

import { revalidatePath } from 'next/cache';

import { api } from '@/api/api.service';

import type { iEditHotelSettingsPayload } from './settings.types';

export async function editUserSettings(
  {
    hotel_name1,
    hotel_name2,
    hotel_name3,
    hotel_name4,
    hotel_url1,
    hotel_url2,
    hotel_url3,
    hotel_url4,
    profileName,
    hotel_id1,
    hotel_id2,
    hotel_id3,
    hotel_id4,
  }: iEditHotelSettingsPayload,
  hotelCode: number
) {
  const userId = 1;
  const reqData = {
    userId,
    profileName,
    hotels: [
      {
        id: hotel_id1,
        name: hotel_name1,
        url: hotel_url1,
      },
      {
        id: hotel_id2,
        name: hotel_name2,
        url: hotel_url2,
      },
      {
        id: hotel_id3,
        name: hotel_name3,
        url: hotel_url3,
      },
      {
        id: hotel_id4,
        name: hotel_name4,
        url: hotel_url4,
      },
    ].filter((hotel) => hotel.name !== undefined || hotel.url !== undefined),
  };

  try {
    await api.put(`/profile/${hotelCode}`, reqData).catch((err) => {
      throw err;
    });

    revalidatePath('/');
    revalidatePath('/settings');
  } catch (error) {
    throw error;
  }
}
