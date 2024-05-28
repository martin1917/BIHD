"use server";

import { dbPool } from "@/lib/db";
import { TypeFoodEntity } from "@/types/typeFood";

export const getAllTypesFood = async () => {
  const conn = await dbPool.connect();
  const data = await conn.query<TypeFoodEntity[]>(`SELECT * FROM TypeFood`);
  return data.recordset;
};
