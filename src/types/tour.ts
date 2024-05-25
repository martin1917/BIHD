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

export interface TourWithDetailsEntity {
  id: number;
  country: string;
  hotelName: string;
  typeRoomName: string;
  typeFoodName: string;
  dateStart: Date;
  dateEnd: Date;
  pricePurchase: number;
  priceSale: number;
}
