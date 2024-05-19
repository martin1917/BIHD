import { dbPool } from "@/lib/db";
import { ClientEntity } from "@/types/client";
import * as utils from "@/utils";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default async function ClientsPage() {
  const conn = await dbPool.connect();
  const data = await conn.query<ClientEntity[]>("select * from Client");

  return (
    <Box className='p-1 h-full w-full overflow-auto'>
      <Box className='w-max my-0 mx-auto'>
        <Box className='mb-3'>
          Общее количество клиентов: <span className='font-bold'>{data.recordset.length}</span>
        </Box>
        <TableContainer component={Paper} elevation={4}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='right'>ID</TableCell>
                <TableCell align='right'>Фамилия</TableCell>
                <TableCell align='right'>Имя</TableCell>
                <TableCell align='right'>Отчество</TableCell>
                <TableCell align='right'>Дата рождения</TableCell>
                <TableCell align='right'>Почта</TableCell>
                <TableCell align='right'>Телефон</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.recordset.map((client) => (
                <TableRow key={client.id} className='odd:bg-gray-100'>
                  <TableCell align='right'>{client.id}</TableCell>
                  <TableCell align='right'>{client.second_name}</TableCell>
                  <TableCell align='right'>{client.name}</TableCell>
                  <TableCell align='right'>{client.patronymic}</TableCell>
                  <TableCell align='right'>{utils.formatDate(client.birthday)}</TableCell>
                  <TableCell align='right'>{client.email}</TableCell>
                  <TableCell align='right'>{client.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
