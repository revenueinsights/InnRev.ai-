export interface iHotelData {
  id: number;
  name: string;
  adr?: string | number;
  revpar?: string | number;
  occupancy_rate?: string | number;
  revenue?: string | number;
  total_num_rooms?: string | number;
}

export type GetHotelDataResponse = Promise<{
  initialResponse: iHotelData[];
  my_statistics: {
    adr: number | string;
    revpar: number;
    revenue: number;
    occupancy_rate: string | number;
    total_num_rooms: number;
    id?: number | undefined;
    name?: string | undefined;
  };
  comp_statistics: iHotelData;
}>;

export interface iGetProfilesByUserIdResponse {
  id: number;
  name: string;
  user_id: number;
}

export interface iUploadCsvFileResponse {
  [k: string]: {
    id: number;
    name: string;
    adr: string;
    revpar: string;
    occupancy_rate: string;
    revenue: string;
    total_num_rooms: string;
  };
}
