export interface iCreateHotelSettingsPayload {
  profileName: string;
  hotel_name1: string;
  hotel_url1: string;
  hotel_name2: string;
  hotel_url2: string;
  hotel_name3: string;
  hotel_url3: string;
  hotel_name4: string;
  hotel_url4: string;
}

export interface iEditHotelSettingsPayload
  extends Partial<iCreateHotelSettingsPayload> {
  hotel_id1?: number;
  hotel_id2?: number;
  hotel_id3?: number;
  hotel_id4?: number;
}

export interface iSaveAnalyticSettingsPayload {
  start_time: string;
  end_time: string;
  frequency: string;
}

export interface iAnalyticSettingsResponse {
  id: number;
  start_time: string;
  end_time: string;
  frequency: string;
  userId: number;
}
