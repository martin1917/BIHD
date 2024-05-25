"use server";

import { dbPool } from "@/lib/db";
import { RequestFull } from "@/types/request";

export const getAllRequests = async () => {
  const conn = await dbPool.connect();
  const data = await conn.query<RequestFull[]>(`
		SELECT 
			r.id,
			r.tour_id as 'tourId',
			c.second_name + ' ' + substring(c.name, 1, 1) + '. ' + substring(c.patronymic, 1, 1) + '.' as 'clientFIO',
			t.second_name + ' ' + substring(t.name, 1, 1) + '. ' + substring(t.patronymic, 1, 1) + '.' as 'touragentFIO',
			rs.name as 'requestStatus',
			r.date
		FROM Request r
		JOIN Client c ON r.client_id = c.id
		JOIN TourAgent t ON r.touragent_id = t.id
		JOIN RequestStatus rs ON r.request_status_id = rs.id`);

  return data.recordset;
};

export const updateStatus = async (requestsId: number, newStatus: string) => {
  const conn = await dbPool.connect();
  await conn.query(
    `UPDATE Request SET request_status_id = (SELECT id FROM RequestStatus WHERE name = '${newStatus}') WHERE id = ${requestsId}`
  );
};
