"use client";

import { Alert, Box, Button, Divider, Paper, Snackbar, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

export default function SignupPage() {
  const router = useRouter();
  const [signupError, setSignupError] = useState<boolean>(false);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [isExpectation, setIsExpectation] = useState<boolean>(false);

  useEffect(() => {
    if (!login.match(/^[A-Za-z0-9]{3,20}$/g)) {
      setLoginError("Разрешенны только символы латиницы и цифры. Длина логина должна быть от 3 до 20 символов");
    } else {
      setLoginError("");
    }
  }, [login]);

  useEffect(() => {
    if (!password.match(/^[A-Za-z0-9]{3,20}$/g)) {
      setPasswordError("Разрешенны только символы латиницы и цифры. Длина пароля должна быть от 3 до 20 символов");
    } else {
      setPasswordError("");
    }
  }, [password]);

  useEffect(() => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Пароли не совпадают");
    } else {
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setSignupError(false);
  };

  const handleClick = async () => {
    setIsExpectation(true);
    const value = await new Promise<number>((resolve) => setTimeout(() => resolve(Math.random()), 1000)).finally(() =>
      setIsExpectation(false)
    );
    if (value > 0.3) {
      router.push("/");
    } else {
      setSignupError(true);
    }
  };

  return (
    <>
      <Snackbar
        open={signupError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='error' variant='filled'>
          ошибка входа
        </Alert>
      </Snackbar>
      <Paper elevation={6} className='mx-auto px-4 py-2 flex flex-col sm:max-w-[480px]'>
        <Typography className='text-center text-xl sm:text-3xl'>Регистрация</Typography>
        <Divider className='my-4' />
        <Box className='flex flex-col gap-6 mb-2'>
          <Box>
            <TextField
              focused
              className='w-full'
              color={login.length === 0 ? "info" : loginError ? "error" : "info"}
              label='Логин'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            {loginError && login.length !== 0 && (
              <Typography className='text-center text-[12px] md:text-sm mt-1 text-red-500'>{loginError}</Typography>
            )}
          </Box>
          <Box>
            <TextField
              focused
              className='w-full'
              color={password.length === 0 ? "info" : passwordError ? "error" : "info"}
              label='Пароль'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && password.length !== 0 && (
              <Typography className='text-center text-[12px] md:text-sm mt-1 text-red-500'>{passwordError}</Typography>
            )}
          </Box>
          <Box>
            <TextField
              focused
              className='w-full'
              color={confirmPasswordError ? "error" : "info"}
              label='Подтверждение пароля'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError && (
              <Typography className='text-center text-[12px] md:text-sm mt-1 text-red-500'>
                {confirmPasswordError}
              </Typography>
            )}
          </Box>
          <Button
            disabled={
              isExpectation || loginError.length > 0 || passwordError.length > 0 || confirmPasswordError.length > 0
            }
            className='self-center'
            variant='contained'
            onClick={handleClick}
          >
            Зарегистрироваться
            {isExpectation && <HourglassEmptyIcon className='ml-2' />}
          </Button>
        </Box>
        <Link className='self-center text-sm' href='/login'>
          Уже существует аккаунт?
        </Link>
      </Paper>
    </>
  );
}
