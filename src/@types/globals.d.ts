import type { ReactNode } from 'react';

import type { EnvType } from '@/config/env.config';

declare global {
  export type WithChildren<T extends Record<string, any> = {}> = Readonly<
    T & {
      children: ReactNode;
    }
  >;

  export type Maybe<T> = T | null | undefined;

  export namespace IAPIResponses {
    export interface iHotelSetting {
      id: number;
      url: string;
      name: string;
      validated: boolean;
      user_id: number;
      adr?: string;
      revpar?: string;
      occupancy_rate?: string;
      revenue?: string;
      total_num_rooms?: string;
      latestAnalyticsTimestamp?: string;
    }

    export interface iRoomsResponse {
      id: number;
      check_in_date: string;
      check_out_date: string;
      timestamp: string;
      price: string;
      strikeout_price: string;
      num_room_available: string;
      listing_text: string;
      hotel_id: number;
    }

    export interface iProfileItem {
      id: number;
      profileName: string;
      hotels: {
        id: number;
        hotelName: string;
        hotelUrl: string;
        adr: string;
        revpar: string;
        revenue: string;
        occupancy_rate: string;
        total_num_rooms: string;
      }[];
    }

    export interface iFormatedProfileItem extends iProfileItem {
      firstHotel?: iProfileItem['hotels'][number];
    }

    export interface iHotelProfileItem extends Omit<iProfileItem, 'hotels'> {
      hotels: { hotelName: string; hotelUrl: string }[];
    }
  }

  type VoidReturn = void | Promise<void>;

  export type ServerComponentPageProps<
    ParamsType = Record<string, string | undefined>,
    SearchParamsType = Record<string, string | undefined>
  > = {
    params: ParamsType;
    searchParams: SearchParamsType;
  };

  namespace NodeJS {
    interface ProcessEnv extends EnvType {}
  }
}
