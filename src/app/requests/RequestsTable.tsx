"use client";

import { RequestFull } from "@/types/request";
import { RequestStatusEntity } from "@/types/requestStatus";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { RequestItem } from "./RequestItem";

export function RequestsTable({ requests, statuses }: { requests: RequestFull[]; statuses: RequestStatusEntity[] }) {
  return (
    <TableContainer component={Paper} elevation={5} className=''>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>ID</TableCell>
            <TableCell align='center'>ID тура</TableCell>
            <TableCell align='center'>Клиент</TableCell>
            <TableCell align='center'>Турагент</TableCell>
            <TableCell align='center'>Статус</TableCell>
            <TableCell align='center'>Дата</TableCell>
            <TableCell align='center'>Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request, idx) => (
            <RequestItem key={idx} request={request} statuses={statuses} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
