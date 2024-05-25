import { getHotelById } from "@/actions/db-hotels";
import { getFeedbackForHotel } from "@/actions/db-feedback";
import { Box, Paper, Rating, Typography } from "@mui/material";
import AddFeedback from "./AddFeedback";

export default async function HotelPage({ params }: { params: { id: string } }) {
  const hotel = await getHotelById(+params.id);
  const feedbacks = await getFeedbackForHotel(+params.id);

  return (
    <Box className='w-full h-full pr-2 pb-4 overflow-auto'>
      <Box className='flex flex-col gap-4'>
        <Typography variant='h4'>Название отеля: {hotel.name}</Typography>
        <Typography variant='h5'>Описание отеля: {hotel.description}</Typography>
        <Box className='flex items-center gap-3'>
          <Typography variant='h6'>Количество звезд: </Typography>
          <Rating precision={0.5} value={hotel.stars} readOnly />
          <Typography variant='h6'> ({hotel.stars}*) </Typography>
        </Box>
      </Box>
      <Typography variant='h6' className='mt-7 mb-2'>
        Отзывы
      </Typography>
      <Box className='mb-5'>
        <AddFeedback hotel_id={+params.id} />
      </Box>
      <Box className='flex flex-col gap-3'>
        {feedbacks.map((feedback, idx) => (
          <Paper elevation={3} key={idx} className='p-1'>
            <Typography className='text-lg'>Оценка: {feedback.mark}</Typography>
            <Typography className='text-lg'>Комментарий: {feedback.comment}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
