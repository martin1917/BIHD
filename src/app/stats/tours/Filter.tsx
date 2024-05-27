"use client";

import { getPaidTours } from "@/serverActions/db-requests";
import { PaidTour } from "@/types/stats";
import { Box, Button, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

export default function Filter({ setStats }: { setStats: Dispatch<SetStateAction<PaidTour[]>> }) {
  const [beginDate, setBeginDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleClick = async () => {
    const stats = await getPaidTours(beginDate, endDate);
    setStats(stats);
  };

  return (
    <Box className='flex gap-5 items-center'>
      <Box className='flex flex-col gap-1'>
        <Typography className='text-center'>От</Typography>
        <input
          className='block'
          type='date'
          value={beginDate.toLocaleDateString("en-CA")}
          onChange={(e) => setBeginDate(new Date(e.target.value))}
        />
      </Box>
      <Box className='flex flex-col gap-1'>
        <Typography className='text-center'>До</Typography>
        <input
          className='block'
          type='date'
          value={endDate.toLocaleDateString("en-CA")}
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
      </Box>
      <Box className='flex flex-col gap-1'>
        <Button variant='contained' size='small' onClick={handleClick}>
          Применить
        </Button>
        <Button variant='contained' size='small' onClick={() => setStats([])}>
          Очистить
        </Button>
      </Box>
    </Box>
  );
}
