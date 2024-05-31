"use client";

import { RequestFull } from "@/types/request";
import { RequestStatusEntity } from "@/types/requestStatus";
import {
  Alert,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { RequestItem } from "./RequestItem";
import { useState } from "react";

export function RequestsTable({ requests, statuses }: { requests: RequestFull[]; statuses: RequestStatusEntity[] }) {
  const [error, setError] = useState<string>("");

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setError("");
  };

  return (
    <>
      <Snackbar
        open={error.length !== 0}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='error' variant='filled'>
          {error}
        </Alert>
      </Snackbar>
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
              <RequestItem key={idx} request={request} statuses={statuses} setError={setError} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
