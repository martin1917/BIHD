"use client";

import { getAllTours, getTours } from "@/actions/db-tours";
import { TourEntity } from "@/types/tour";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

function TourFilter({ setTours }: { setTours: Dispatch<SetStateAction<TourEntity[]>> }) {
  const [country, setCountry] = useState<string>("");
  const [markStart, setMarkStart] = useState<number>(1);
  const [markEnd, setMarkEnd] = useState<number>(5);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const handleFilter = async () => {
    const tours = await getTours(country, markStart, markEnd);
    setTours(tours);
    setIsFiltered(true);
  };

  const handleCancelFilter = async () => {
    const tours = await getAllTours();
    setTours(tours);
    setIsFiltered(false);
  };

  return (
    <Box className='flex flex-col gap-3'>
      <TextField
        label='Страна'
        className='w-full bg-white'
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <Box className='flex gap-5 justify-between '>
        <FormControl className='w-[120px]'>
          <InputLabel>Мин. оценка</InputLabel>
          <Select
            value={`${markStart}`}
            label='Мин. оценка'
            className='bg-white'
            onChange={(e) => setMarkStart(+e.target.value)}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <FormControl className='w-[120px]'>
          <InputLabel>Макс. оценка</InputLabel>
          <Select
            value={`${markEnd}`}
            label='Макс. оценка'
            className='bg-white'
            onChange={(e) => setMarkEnd(+e.target.value)}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <Button variant='contained' onClick={handleCancelFilter} disabled={!isFiltered}>
          <FilterAltOffIcon />
        </Button>
        <Button variant='contained' onClick={handleFilter}>
          <SearchIcon />
        </Button>
      </Box>
    </Box>
  );
}

export default TourFilter;
