export interface TourEntity {
  id: number;
  country: string;
  hotel_id: number;
  type_room_id: number;
  type_food_id: number;
  price_purchase: number;
  price_sale: number;
  date_start: Date;
  date_end: Date;
  isActive: number;
}
