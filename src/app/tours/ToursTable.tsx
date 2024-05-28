"use client";

import * as utils from "@/utils";
import { clsx } from "clsx";
import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TourEntity } from "@/types/tour";
import { useState } from "react";
import TourInfoModal from "./TourInfoModal";
import TourFilter from "./TourFilter";
import NextLink from "next/link";

interface ToursTableProps {
  tours: TourEntity[];
}

export default function ToursTable({ tours }: ToursTableProps) {
  const [toursState, setTours] = useState(tours);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedTourId, setSelectedTourId] = useState<number>();

  const handleClose = () => setModalIsOpen(false);
  const handleOpen = () => setModalIsOpen(true);

  const handleDoubleClickOnRow = (tourId: number) => {
    setSelectedTourId(tourId);
    handleOpen();
  };

  return (
    <Box className='overflow-auto mr-1'>
      <TourInfoModal tourId={selectedTourId} open={modalIsOpen} handleClose={handleClose} />
      <Box className='mb-4 py-2 flex gap-20'>
        <TourFilter setTours={setTours} />
        <Link component={NextLink} href={`/tours/create`}>
          <Button variant='contained'>Добавить новый тур</Button>
        </Link>
        <Link component={NextLink} href={`/tourStats`}>
          <Button variant='contained' size='small' className='text-[0.7rem] w-[12rem]'>
            Получить информация по турам для каждой страны
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper} elevation={5} className='w-max'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='right'>ID</TableCell>
              <TableCell align='right'>Страна</TableCell>
              <TableCell align='right'>ID Отеля</TableCell>
              <TableCell align='right'>ID типа номера</TableCell>
              <TableCell align='right'>ID типа питания</TableCell>
              <TableCell align='right'>Цена покупки</TableCell>
              <TableCell align='right'>Цена продажи</TableCell>
              <TableCell align='right'>Дата начала</TableCell>
              <TableCell align='right'>Дата окончания</TableCell>
              <TableCell align='right'>Доступность</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toursState.map((tour) => (
              <TableRow
                key={tour.id}
                onDoubleClick={() => handleDoubleClickOnRow(tour.id)}
                className={clsx(
                  "select-none odd:bg-gray-100 hover:cursor-pointer hover:bg-blue-200 active:bg-blue-300",
                  {
                    "bg-red-100 odd:bg-red-200/85": !tour.isActive,
                  }
                )}
              >
                <TableCell align='right'>{tour.id}</TableCell>
                <TableCell align='right'>{tour.country}</TableCell>
                <TableCell align='right'>{tour.hotel_id}</TableCell>
                <TableCell align='right'>{tour.type_room_id}</TableCell>
                <TableCell align='right'>{tour.type_food_id}</TableCell>
                <TableCell align='right'>{`${tour.price_purchase} ₽`}</TableCell>
                <TableCell align='right'>{`${tour.price_sale} ₽`}</TableCell>
                <TableCell align='right'>{utils.formatDate(tour.date_start)}</TableCell>
                <TableCell align='right'>{utils.formatDate(tour.date_end)}</TableCell>
                <TableCell align='right'>{tour.isActive ? "✅" : "❌"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
