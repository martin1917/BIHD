import { getStatsByClients, getStatsByCountries } from "@/serverActions/db-requests";
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

export default async function CountryStatsPage() {
  const countryStats = await getStatsByCountries();

  return (
    <Box className='h-full w-full overflow-auto p-1'>
      <Box className='flex gap-5'>
        <Typography variant='h6' className='mb-3'>
          Статистика по всем странам
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
              <TableCell align='center'>Страна</TableCell>
              <TableCell align='center'>Количество купленных туров</TableCell>
              <TableCell align='center'>Общая потраченная сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countryStats.map((stat) => (
              <TableRow key={stat.country} className='odd:bg-gray-100'>
                <TableCell align='center'>{stat.country}</TableCell>
                <TableCell align='center'>{stat.count}</TableCell>
                <TableCell align='center'>{`${stat.profit} ₽`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
