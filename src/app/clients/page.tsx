import { getAllClients } from "@/actions/db-clients";
import * as utils from "@/utils";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default async function ClientsPage() {
  const clients = await getAllClients();

  return (
    <Box className='p-1 h-full w-full overflow-auto'>
      <Box>
        <Typography variant='h6' className='mb-3'>
          Клиенты (общее количество: <b>{clients.length}</b> )
        </Typography>
        <TableContainer component={Paper} elevation={5} className='w-max'>
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
              {clients.map((client) => (
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
