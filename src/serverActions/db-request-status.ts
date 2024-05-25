"use server";

import { dbPool } from "@/lib/db";
import { RequestStatusEntity } from "@/types/requestStatus";

export const getAllRequestStatus = async () => {
  const conn = await dbPool.connect();
  const data = await conn.query<RequestStatusEntity[]>(`SELECT * FROM RequestStatus`);
  return data.recordset;
};
