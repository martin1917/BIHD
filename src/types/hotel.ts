export interface HotelEntity {
  id: number;
  name: string;
  description: string;
  stars: number;
}

export type HotelWithStats = Omit<HotelEntity, "description"> & {
  avgMark: number;
  countOfFeedbacks: number;
};
