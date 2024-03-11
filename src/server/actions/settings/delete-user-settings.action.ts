'use server';

import { revalidatePath } from 'next/cache';

import { api } from '@/api/api.service';

export async function deleteUserSettings(id: number) {
  try {
    await api.delete(`/profile/${id}`);

    revalidatePath('/');
    revalidatePath('/settings');
  } catch (error) {
    throw error;
  }
}
