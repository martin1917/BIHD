import { getStatsByClients } from "@/serverActions/db-requests";
import NextLink from "next/link";
import {
  Box,
  Typography,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Link,
  Button,
} from "@mui/material";

export default async function ClientStatsPage() {
  const clientStats = await getStatsByClients();

  return (
    <Box className='h-full w-full overflow-auto p-1'>
      <Box className='flex gap-5'>
        <Typography variant='h6' className='mb-3'>
          Статистика по всем клиентам
        </Typography>
        <Link component={NextLink} href={`/stats`}>
          <Button variant='contained' size='small'>
            Назад
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper} elevation={5} className='w-max'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID клиента</TableCell>
              <TableCell align='center'>ФИО клиента</TableCell>
              <TableCell align='center'>Количество купленных туров</TableCell>
              <TableCell align='center'>Общая потраченная сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientStats.map((stat) => (
              <TableRow key={stat.clientId} className='odd:bg-gray-100'>
                <TableCell align='center'>{stat.clientId}</TableCell>
                <TableCell align='center'>{stat.clientFIO}</TableCell>
                <TableCell align='center'>{stat.count}</TableCell>
                <TableCell align='center'>{`${stat.totalSum} ₽`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
