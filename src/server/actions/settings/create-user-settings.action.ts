'use server';

import { revalidatePath } from 'next/cache';

import { api } from '@/api/api.service';

import type { iCreateHotelSettingsPayload } from './settings.types';

export async function createUserSettings({
  hotel_name1,
  hotel_name2,
  hotel_name3,
  hotel_name4,
  hotel_url1,
  hotel_url2,
  hotel_url3,
  hotel_url4,
  profileName,
}: iCreateHotelSettingsPayload) {
  const userId = 1;
  const reqData = {
    userId,
    profileName,
    hotels: [
      {
        name: hotel_name1,
        url: hotel_url1,
      },
      {
        name: hotel_name2,
        url: hotel_url2,
      },
      {
        name: hotel_name3,
        url: hotel_url3,
      },
      {
        name: hotel_name4,
        url: hotel_url4,
      },
    ].filter((hotel) => hotel.name !== undefined || hotel.url !== undefined),
  };

  try {
    await api.post('/profile', reqData).catch((err) => {
      throw err;
    });

    revalidatePath('/');
    revalidatePath('/settings');
  } catch (error) {
    throw error;
  }
}
