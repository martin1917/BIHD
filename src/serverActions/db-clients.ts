"use server";

import { dbPool } from "@/lib/db";
import { ClientEntity } from "@/types/client";

export const getAllClients = async () => {
  const conn = await dbPool.connect();
  const data = await conn.query<ClientEntity[]>("SELECT * FROM Client");
  return data.recordset;
};
