"use server";

import { dbPool } from "@/lib/db";
import { CountryOverwiew } from "@/types/country";
import { TourEntity, TourWithDetailsEntity } from "@/types/tour";
import { formatDateForMSSQL } from "@/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getAllTours = async () => {
  const conn = await dbPool.connect();
  const data = await conn.query<TourEntity[]>("SELECT * FROM Tour");
  return data.recordset;
};

export const getTours = async (country: string | null, markStart: number, markEnd: number) => {
  const conn = await dbPool.connect();
  const data = await conn.query<TourEntity[]>(`
    SELECT t.*
    FROM Tour t 
      JOIN Hotel h ON t.hotel_id = h.id 
      JOIN TypeFood tf ON t.type_food_id = tf.id
      JOIN TypeRoom tr ON t.type_room_id = tr.id
    WHERE
      ${country ? `t.country LIKE '%${country}%' AND` : ``} 
      h.stars BETWEEN ${markStart} AND ${markEnd}`);
  return data.recordset;
};

export const getToorDetails = async (tourId: number) => {
  const conn = await dbPool.connect();
  const data = await conn.query<TourWithDetailsEntity>(`
    SELECT 
      t.id AS id, 
      t.country AS country, 
      h.name AS hotelName, 
      tr.name AS typeRoomName, 
      tf.name AS typeFoodName, 
      t.date_start AS dateStart,
      t.date_end AS dateEnd,
      t.price_purchase AS pricePurchase,
      t.price_sale AS priceSale
    FROM Tour t 
    JOIN Hotel h ON t.hotel_id = h.id
    JOIN TypeRoom tr ON t.type_room_id = tr.id
    JOIN TypeFood tf ON t.type_food_id = tf.id
    WHERE t.id = ${tourId}`);

  return data.recordset[0];
};

export const getToursInfoForCountries = async () => {
  const conn = await dbPool.connect();
  const data = await conn.query<CountryOverwiew[]>(`
    SELECT 
      country as 'name', 
      count(1) AS 'countTours',
      min(price_sale) AS 'minPrice',
      max(price_sale) AS 'maxPrice'
    FROM Tour 
    GROUP BY country
    ORDER BY countTours DESC`);

  return data.recordset;
};

export const createTour = async ({
  nameTour,
  country,
  hotelName,
  typeRoom,
  typeFood,
  pricePurchase,
  priceSale,
  dateStart,
  countDays,
}: {
  nameTour: string;
  country: string;
  hotelName: string;
  typeRoom: string;
  typeFood: string;
  pricePurchase: number;
  priceSale: number;
  dateStart: Date;
  countDays: number;
}) => {
  const conn = await dbPool.connect();
  await conn.query(`
    exec CreateTour
      @NameTour = '${nameTour}',
      @Country = '${country}',
      @HotelName = '${hotelName}',
      @TypeRoom = '${typeRoom}',
      @TypeFood = '${typeFood}',
      @PricePurchase = ${pricePurchase},
      @PriceSale = ${priceSale},
      @DateStart = '${formatDateForMSSQL(dateStart)}',
      @CountDays = ${countDays}`);

  revalidatePath("/tours");
  redirect("/tours");
};
