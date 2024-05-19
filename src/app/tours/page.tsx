import { dbPool } from "@/lib/db";
import { TourEntity } from "@/types/tour";
import * as utils from "@/utils";
import { clsx } from "clsx";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default async function ToursPage() {
  const conn = await dbPool.connect();
  const data = await conn.query<TourEntity[]>("select * from Tour");

  const countOfActiveTours = data.recordset.reduce((acc, tour) => (tour.isActive ? acc + 1 : acc), 0);

  return (
    <Box className='p-1 h-full w-full overflow-auto'>
      <Box className='w-max my-0 mx-auto'>
        <Box className='mb-3'>
          Количество доступных туров: <span className='font-bold'>{countOfActiveTours}</span>
        </Box>
        <Box className='mb-3'>
          Количество забронированных туров:{" "}
          <span className='font-bold'>{data.recordset.length - countOfActiveTours}</span>
        </Box>
        <TableContainer component={Paper} elevation={4}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='right'>ID</TableCell>
                <TableCell align='right'>Страна</TableCell>
                <TableCell align='right'>ID Отеля</TableCell>
                <TableCell align='right'>ID типа номера</TableCell>
                <TableCell align='right'>ID типа питания</TableCell>
                <TableCell align='right'>Цена покупки</TableCell>
                <TableCell align='right'>Цена продажи</TableCell>
                <TableCell align='right'>Дата начала</TableCell>
                <TableCell align='right'>Дата окончания</TableCell>
                <TableCell align='right'>Доступность</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.recordset.map((tour) => (
                <TableRow
                  key={tour.id}
                  className={clsx("odd:bg-gray-100", {
                    "bg-red-100 odd:bg-red-200/85": !tour.isActive,
                  })}
                >
                  <TableCell align='right'>{tour.id}</TableCell>
                  <TableCell align='right'>{tour.country}</TableCell>
                  <TableCell align='right'>{tour.hotel_id}</TableCell>
                  <TableCell align='right'>{tour.type_room_id}</TableCell>
                  <TableCell align='right'>{tour.type_food_id}</TableCell>
                  <TableCell align='right'>{tour.price_purchase}</TableCell>
                  <TableCell align='right'>{tour.price_sale}</TableCell>
                  <TableCell align='right'>{utils.formatDate(tour.date_start)}</TableCell>
                  <TableCell align='right'>{utils.formatDate(tour.date_end)}</TableCell>
                  <TableCell align='right'>{tour.isActive ? "✅" : "❌"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
