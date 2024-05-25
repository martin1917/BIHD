import { getToursInfoForCountries } from "@/serverActions/db-tours";
import NextLink from "next/link";
import {
  Box,
  Button,
  Divider,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

async function TourStatsPage() {
  const countryOverviews = await getToursInfoForCountries();

  return (
    <Box className=''>
      <Box className='flex items-center'>
        <Typography variant='h4'>Информация по турам для каждой страны</Typography>
        <Link component={NextLink} href={`/tours`} className='ml-5'>
          <Button variant='contained' className=''>
            Смотреть все туры
          </Button>
        </Link>
      </Box>
      <Divider className='my-5' />
      <TableContainer component={Paper} elevation={5} className='h-full w-max overflow-auto'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Страна</TableCell>
              <TableCell align='center'>Количество путевок</TableCell>
              <TableCell align='center'>Минимальная цена тура</TableCell>
              <TableCell align='center'>Максимальная цена тура</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countryOverviews.map((country) => (
              <TableRow key={country.name} className='odd:bg-gray-100'>
                <TableCell align='center'>{country.name}</TableCell>
                <TableCell align='center'>{country.countTours}</TableCell>
                <TableCell align='center'>{`${country.minPrice} ₽`}</TableCell>
                <TableCell align='center'>{`${country.maxPrice} ₽`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TourStatsPage;
