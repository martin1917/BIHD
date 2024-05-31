"use client";

import { RequestFull } from "@/types/request";
import { RequestStatusEntity } from "@/types/requestStatus";
import { Box, Button, MenuItem, Select, TableCell, TableRow } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import * as utils from "@/utils";
import clsx from "clsx";
import { updateStatus, waitRequest } from "@/serverActions/db-requests";

export function RequestItem({
  request,
  statuses,
  setError,
}: {
  request: RequestFull;
  statuses: RequestStatusEntity[];
  setError: Dispatch<SetStateAction<string>>;
}) {
  const [status, setStatus] = useState(request.requestStatus);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleSave = async (requestId: number) => {
    setIsDisabled(true);
    if (status === "ОЖИДАНИЕ ОТ ТУРОПЕРАТОРА") {
      const res = await waitRequest(requestId);
      if (res) {
        setError(res);
        setStatus(request.requestStatus);
      }
    } else {
      await updateStatus(requestId, status);
    }
    setIsDisabled(false);
    setIsUpdating(false);
  };

  const handleCancel = () => {
    setIsUpdating(false);
    setStatus(request.requestStatus);
  };

  return (
    <TableRow key={request.id} className={clsx("odd:bg-gray-100")}>
      <TableCell align='center'>{request.id}</TableCell>
      <TableCell align='center'>{request.tourId}</TableCell>
      <TableCell align='center'>{request.clientFIO}</TableCell>
      <TableCell align='center'>{request.touragentFIO}</TableCell>
      <TableCell align='center'>
        {isUpdating && (
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((item) => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        )}
        {!isUpdating && status}
      </TableCell>
      <TableCell align='center'>{utils.formatDate(request.date)}</TableCell>
      <TableCell align='center'>
        {isUpdating && (
          <Box className='flex flex-col gap-2'>
            {status !== request.requestStatus && (
              <Button variant='outlined' size='small' disabled={isDisabled} onClick={() => handleSave(request.id)}>
                Сохранить
              </Button>
            )}
            <Button variant='outlined' size='small' onClick={handleCancel}>
              Отмена
            </Button>
          </Box>
        )}
        {!isUpdating && (
          <Button variant='outlined' size='small' onClick={() => setIsUpdating(true)}>
            Обновить
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
