"use server";

import { dbPool } from "@/lib/db";
import { HotelEntity, HotelWithStats } from "@/types/hotel";

export const getAllHotels = async () => {
  const conn = await dbPool.connect();
  const data = await conn.query<HotelEntity[]>(`SELECT * FROM Hotel`);
  return data.recordset;
};

export const getHotelById = async (hotelId: number) => {
  const conn = await dbPool.connect();
  const data = await conn.query<HotelEntity>(`SELECT * FROM Hotel where id = ${hotelId}`);
  return data.recordset[0];
};

export const getHotelsWithStatistics = async () => {
  const conn = await dbPool.connect();
  const data = await conn.query<HotelWithStats[]>(`
    SELECT 
      h.id, 
      h.name, 
      h.stars, 
      hs.avg_mark AS 'avgMark', 
      hs.[count] AS 'countOfFeedbacks' 
    FROM Hotel h JOIN
    (
      SELECT
        h.id,
        avg(cast(fb.mark as float)) AS 'avg_mark',
        count(1) AS 'count'
      FROM Feedback fb 
      JOIN Hotel h ON fb.hotel_id = h.id
      GROUP BY h.id
    ) AS hs ON h.id = hs.id 
    ORDER BY hs.avg_mark DESC`);

  return data.recordset;
};
