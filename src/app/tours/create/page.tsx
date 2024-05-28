"use client";

import { getAllHotels } from "@/serverActions/db-hotels";
import { createTour } from "@/serverActions/db-tours";
import { getAllTypesFood } from "@/serverActions/db-type-food";
import { getAllTypesRoom } from "@/serverActions/db-type-room";
import { HotelEntity } from "@/types/hotel";
import { TypeFoodEntity } from "@/types/typeFood";
import { TypeRoomEntity } from "@/types/typeRoom";
import { Box, Button, FormControl, InputLabel, Link, MenuItem, Select, TextField } from "@mui/material";
import NextLink from "next/link";
import { useEffect, useState } from "react";

export default function CreateTourPage() {
  const [allHotels, setAllHotels] = useState<HotelEntity[]>([]);
  const [allTypesRoom, setAllTypesRoom] = useState<TypeRoomEntity[]>([]);
  const [allTypesFood, setAllTypesFood] = useState<TypeFoodEntity[]>([]);
  const [tour, setTour] = useState({
    nameTour: "",
    country: "",
    hotelName: "",
    typeRoom: "",
    typeFood: "",
    pricePurchase: 0,
    priceSale: 0,
    dateStart: new Date(),
    countDays: 1,
  });

  useEffect(() => {
    const getData = async () => {
      setAllHotels(await getAllHotels());
      setAllTypesRoom(await getAllTypesRoom());
      setAllTypesFood(await getAllTypesFood());
    };
    getData();
  }, []);

  const handleCreate = async () => {
    await createTour({ ...tour });
  };

  if (allHotels.length == 0 || allTypesRoom.length == 0 || allTypesFood.length == 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box className='relative flex flex-col mt-4 mx-auto gap-5 w-1/2'>
      <Link component={NextLink} href={`/tours`} className='top-2 left-2'>
        <Button size='small' variant='contained'>
          Назад
        </Button>
      </Link>
      <TextField
        label='Название тура'
        value={tour.nameTour}
        onChange={(e) => setTour({ ...tour, nameTour: e.target.value })}
      />
      <TextField label='Страна' value={tour.country} onChange={(e) => setTour({ ...tour, country: e.target.value })} />
      <FormControl>
        <InputLabel>Отель</InputLabel>
        <Select value={tour.hotelName} label='Отель' onChange={(e) => setTour({ ...tour, hotelName: e.target.value })}>
          {allHotels.map((hotel, idx) => (
            <MenuItem key={idx} value={hotel.name}>
              {hotel.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Тип комнаты</InputLabel>
        <Select
          value={tour.typeRoom}
          label='Тип комнаты'
          onChange={(e) => setTour({ ...tour, typeRoom: e.target.value })}
        >
          {allTypesRoom.map((type, idx) => (
            <MenuItem key={idx} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Тип питания</InputLabel>
        <Select
          value={tour.typeFood}
          label='Тип питания'
          onChange={(e) => setTour({ ...tour, typeFood: e.target.value })}
        >
          {allTypesFood.map((type, idx) => (
            <MenuItem key={idx} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label='Цена покупки'
        value={tour.pricePurchase}
        onChange={(e) => setTour({ ...tour, pricePurchase: +e.target.value })}
      />
      <TextField
        label='Цена продажи'
        value={tour.priceSale}
        onChange={(e) => setTour({ ...tour, priceSale: +e.target.value })}
      />
      <input
        className='block h-10 text-lg'
        type='date'
        value={tour.dateStart.toLocaleDateString("en-CA")}
        onChange={(e) => setTour({ ...tour, dateStart: new Date(e.target.value) })}
      />
      <TextField
        label='Количество дней'
        value={tour.countDays}
        onChange={(e) => setTour({ ...tour, countDays: +e.target.value })}
      />
      <Button variant='contained' onClick={handleCreate}>
        Создать
      </Button>
    </Box>
  );
}
