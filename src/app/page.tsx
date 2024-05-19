import { Box, Typography, Paper } from "@mui/material";

export default function Home() {
  return (
    <Box className='flex justify-center mt-5'>
      <Paper elevation={3} className='h-1/3 w-1/2 flex justify-center items-center p-5 bg-transparent'>
        <Typography variant='h4' className='text-center'>
          Начальная страница
          <Typography variant='h3' className='text-blue-600'>
            TravelAgency
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
}
