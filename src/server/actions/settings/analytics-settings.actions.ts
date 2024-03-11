'use server';

import { revalidatePath } from 'next/cache';

import { api } from '@/api/api.service';

import type {
  iSaveAnalyticSettingsPayload,
  iAnalyticSettingsResponse,
} from './settings.types';

export async function getAnalyticSettings() {
  const userId = 1;

  try {
    const analyticSettingsResponse = await api.get<iAnalyticSettingsResponse[]>(
      `/setting/scrape/${userId}`
    );

    return Promise.resolve(analyticSettingsResponse.data[0]);
  } catch (error) {
    throw error;
  }
}

export async function saveAnalyticSettings(
  payload: iSaveAnalyticSettingsPayload,
  id?: number
) {
  const userId = 1;

  const reqData = {
    ...payload,
    userId,
    id,
  };

  try {
    await api.post('/setting/scrape', reqData);

    revalidatePath('/settings');
  } catch (err) {
    throw err;
  }
}
