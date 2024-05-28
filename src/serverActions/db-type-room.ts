"use server";

import { dbPool } from "@/lib/db";
import { TypeRoomEntity } from "@/types/typeRoom";

export const getAllTypesRoom = async () => {
  const conn = await dbPool.connect();
  const data = await conn.query<TypeRoomEntity[]>(`SELECT * FROM TypeRoom`);
  return data.recordset;
};
