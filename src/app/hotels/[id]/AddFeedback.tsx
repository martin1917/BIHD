"use client";

import { addFeedback } from "@/actions/db-feedback";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

function AddFeedback({ hotel_id }: { hotel_id: number }) {
  const [comment, setComment] = useState<string>("");
  const [mark, setMark] = useState<number>(3);
  const [btnDisable, setBtnDisable] = useState<boolean>(false);

  const handleSendFeedback = async () => {
    setBtnDisable(true);
    await addFeedback({ hotel_id, mark, comment });
    setBtnDisable(false);
    setComment("");
    setMark(3);
  };

  return (
    <Box className='flex flex-col gap-3'>
      <TextField
        label='Комментарий'
        multiline
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        className='w-full bg-white'
      />
      <Box className='flex gap-2'>
        <FormControl className='w-[100px]'>
          <InputLabel>Оценка</InputLabel>
          <Select value={`${mark}`} label='Оценка' className='bg-white' onChange={(e) => setMark(+e.target.value)}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <Tooltip title='Отправить' placement='right-start'>
          <Button variant='contained' onClick={handleSendFeedback} disabled={btnDisable}>
            <SendIcon />
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default AddFeedback;
