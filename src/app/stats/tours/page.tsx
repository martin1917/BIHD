"use client";

import NextLink from "next/link";
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
  Typography,
} from "@mui/material";
import Filter from "./Filter";
import { useState } from "react";
import { PaidTour } from "@/types/stats";
import { formatDate } from "@/utils";

export default function TourStatsPage() {
  const [stats, setStats] = useState<PaidTour[]>([]);
  return (
    <Box className='flex flex-col gap-5 p-1'>
      <Box className='flex gap-5 items-center'>
        <Paper elevation={3} className='p-2 bg-transparent'>
          <Filter setStats={setStats} />
        </Paper>
        <Link component={NextLink} href={`/stats`}>
          <Button variant='contained' size='small'>
            Назад
          </Button>
        </Link>
      </Box>
      {stats.length > 0 && (
        <Box>
          <Typography>
            Общая выручка: <b>{stats.reduce((sum, item) => sum + item.profit, 0)} ₽</b>
          </Typography>
        </Box>
      )}
      <TableContainer component={Paper} elevation={5} className='w-max'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ID клиента</TableCell>
              <TableCell align='center'>ID тура</TableCell>
              <TableCell align='center'>Дата</TableCell>
              <TableCell align='center'>Статус</TableCell>
              <TableCell align='center'>Выручка</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((stat) => (
              <TableRow key={stat.clientId} className='odd:bg-gray-100'>
                <TableCell align='center'>{stat.clientId}</TableCell>
                <TableCell align='center'>{stat.tourId}</TableCell>
                <TableCell align='center'>{formatDate(stat.date)}</TableCell>
                <TableCell align='center'>{stat.status}</TableCell>
                <TableCell align='center'>{`${stat.profit} ₽`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
