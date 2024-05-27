import { Box, Button, Link } from "@mui/material";
import NextLink from "next/link";

export default async function StatsPage() {
  return (
    <Box className='flex gap-2 p-1'>
      <Link component={NextLink} href={`/stats/country`}>
        <Button variant='contained'>Статистика по странам</Button>
      </Link>
      <Link component={NextLink} href={`/stats/clients`}>
        <Button variant='contained'>Статистика по клиентам</Button>
      </Link>
      <Link component={NextLink} href={`/stats/tours`}>
        <Button variant='contained'>Статистика по заказам</Button>
      </Link>
    </Box>
  );
}
