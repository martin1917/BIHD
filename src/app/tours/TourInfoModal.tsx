"use client";

import * as utils from "@/utils";
import { TourWithDetailsEntity } from "@/types/tour";
import { Box, Button, Divider, Modal, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getToorDetails } from "@/actions/db-tours";

interface TourInfoProps {
  tourId?: number;
  open: boolean;
  handleClose: () => void;
}

function Property({ name, value }: { name: string; value: string }) {
  return (
    <Box className='flex'>
      <Box className='w-2/5'>{name}: </Box>
      <Box className='w-3/5'>{value}</Box>
    </Box>
  );
}

export default function TourInfoModal({ tourId, open, handleClose }: TourInfoProps) {
  const [tourWithDetail, setTourWithDetail] = useState<TourWithDetailsEntity>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (tourId) {
      getToorDetails(tourId).then((res) => {
        setTourWithDetail(res);
        setIsLoading(false);
      });
    }
  }, [tourId]);

  if (isLoading) return null;

  return (
    <Modal open={open} className='no-underline'>
      <Paper
        elevation={9}
        className='absolute top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 p-2 bg-white'
      >
        <Button
          variant='contained'
          size='small'
          className='absolute min-w-4 right-1 top-1 bg-red-500'
          onClick={handleClose}
        >
          X
        </Button>
        <Typography variant='h6' component='h2' className='mb-4'>
          Информация о туре
        </Typography>
        <Box>
          <Property name='ID' value={`${tourWithDetail?.id}`} />
          <Divider />
          <Property name='Страна' value={`${tourWithDetail?.country}`} />
          <Divider />
          <Property name='Отель' value={`${tourWithDetail?.hotelName}`} />
          <Divider />
          <Property name='Тип комнаты' value={`${tourWithDetail?.typeRoomName}`} />
          <Divider />
          <Property name='Тип питания' value={`${tourWithDetail?.typeFoodName}`} />
          <Divider />
          <Property name='Дата начала' value={utils.formatDate(tourWithDetail?.dateStart!)} />
          <Divider />
          <Property name='Дата окончания' value={utils.formatDate(tourWithDetail?.dateEnd!)} />
          <Divider />
          <Property name='Цена покупки' value={`${tourWithDetail?.pricePurchase} ₽`} />
          <Divider />
          <Property name='Цена продажи' value={`${tourWithDetail?.priceSale} ₽`} />
        </Box>
      </Paper>
    </Modal>
  );
}
