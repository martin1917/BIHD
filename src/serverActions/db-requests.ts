"use server";

import { dbPool } from "@/lib/db";
import { RequestFull } from "@/types/request";
import { ClientStats, CountryStats, PaidTour } from "@/types/stats";
import { formatDateForMSSQL } from "@/utils";

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

export const getStatsByCountries = async () => {
  const conn = await dbPool.connect();
  const data = await conn.query<CountryStats[]>(`
		SELECT 
			t.country AS 'country',
			SUM(t.price_sale - t.price_purchase) AS 'profit',
			COUNT(1) AS 'count'
		FROM Request r
		JOIN RequestStatus rs ON r.request_status_id = rs.id
		JOIN Tour t ON r.tour_id = t.id
		WHERE rs.name = 'ОПЛАЧЕНА'
		GROUP BY t.country 
		ORDER BY profit DESC`);

  return data.recordset;
};

export const getStatsByClients = async () => {
  const conn = await dbPool.connect();
  const data = await conn.query<ClientStats[]>(`
	SELECT 
	cs.client_id AS 'clientId',
	c.second_name + ' ' + SUBSTRING(c.name, 1, 1) + '. ' + SUBSTRING(c.patronymic, 1, 1) + '.' AS 'clientFIO',
	cs.count_sales AS 'count',
	cs.total_sum AS 'totalSum'
	FROM Client c
	JOIN 
	(
		SELECT 
				r.client_id,
				COUNT(1) AS 'count_sales',
				SUM(t.price_sale) AS 'total_sum'
			FROM Request r
			JOIN RequestStatus rs ON r.request_status_id= rs.id
			JOIN Client c ON r.client_id = c.id
			JOIN Tour t ON r.tour_id = t.id
			WHERE rs.name = 'ОПЛАЧЕНА'
			GROUP BY r.client_id
		) cs ON c.id = cs.client_id 
		ORDER BY totalSum DESC`);

  return data.recordset;
};

export const getPaidTours = async (beginDate: Date, endDate: Date) => {
  const conn = await dbPool.connect();
  const data = await conn.query<PaidTour[]>(`
			SELECT 
				client_id AS 'clientId',
				t.id AS 'tourId',
				r.date AS 'date',	
				rs.name AS 'status',
				(t.price_sale - t.price_purchase) AS 'profit'
			FROM Request r
			JOIN Tour t ON r.tour_id = t.id
			JOIN RequestStatus rs ON r.request_status_id = rs.id
			WHERE 
				rs.name = 'ОПЛАЧЕНА' 
				AND r.date BETWEEN '${formatDateForMSSQL(beginDate)}' AND '${formatDateForMSSQL(endDate)}'`);

  return data.recordset;
};
