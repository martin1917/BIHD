"use server";

import { dbPool } from "@/lib/db";
import { AddFeedback, FeedbackEntity } from "@/types/feedback";
import { revalidatePath } from "next/cache";

export const getFeedbackForHotel = async (hotelId: number) => {
  const conn = await dbPool.connect();
  const data = await conn.query<FeedbackEntity[]>(
    `SELECT * FROM Feedback where hotel_id = ${hotelId} ORDER BY id DESC`
  );
  return data.recordset;
};

export const addFeedback = async ({ hotel_id, mark, comment }: AddFeedback) => {
  const conn = await dbPool.connect();
  await conn.query(`INSERT INTO Feedback (hotel_id, mark, comment) VALUES (${hotel_id}, ${mark}, '${comment}')`);
  revalidatePath(`/hotels/${hotel_id}`);
};
