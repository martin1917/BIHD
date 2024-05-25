import { getHotelsWithStatistics } from "@/actions/db-hotels";
import { HotelWithStats } from "@/types/hotel";
import { Box, Button, Grid, Link, Paper, Rating, Typography } from "@mui/material";
import NextLink from "next/link";

function HotelItem({ hotel, num }: { hotel: HotelWithStats; num: number }) {
  return (
    <Paper elevation={4} className='flex flex-col gap-1 p-1 relative'>
      <Box className='absolute select-none top-1 right-1 text-xs'>{num}</Box>
      <Typography className='text-lg'>Название: {hotel.name}</Typography>
      <Typography> Средняя оценка: {hotel.avgMark.toFixed(2)}</Typography>
      <Typography> Количество отзывов: {hotel.countOfFeedbacks}</Typography>
      <Box className='flex gap-4'>
        <Box>Количество звезд:</Box>
        <Rating precision={0.5} value={hotel.stars} readOnly />
      </Box>
      <Link component={NextLink} href={`/hotels/${hotel.id}`} className='mt-2'>
        <Button size='small' variant='contained' className='w-full'>
          Открыть
        </Button>
      </Link>
    </Paper>
  );
}

export default async function HotelsPage() {
  const hotels = await getHotelsWithStatistics();

  return (
    <Box className='p-1'>
      <Grid container spacing={2}>
        {hotels.map((hotel, idx) => (
          <Grid item xs={4} key={idx}>
            <HotelItem hotel={hotel} num={idx + 1} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
