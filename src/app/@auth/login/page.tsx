"use client";

import { Box, Button, Divider, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClick = () => {
    const value = Math.random();
    const isSuccess = value > 0.15;
    isSuccess ? router.push("/") : alert("ошибка входа");
  };

  return (
    <Paper elevation={6} className='m-auto px-4 py-2 flex flex-col md:max-w-[480px]'>
      <Typography className='text-center text-xl md:text-3xl'>Вход</Typography>
      <Divider className='my-4' />
      <Box className='flex flex-col gap-6 mb-2'>
        <TextField focused label='Логин' value={login} onChange={(e) => setLogin(e.target.value)} />
        <TextField
          focused
          label='Пароль'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className='self-center' variant='contained' onClick={handleClick}>
          Войти
        </Button>
      </Box>
      <Link className='self-end text-sm' href='/signup'>
        Регистрация
      </Link>
    </Paper>
  );
}
