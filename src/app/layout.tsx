"use client";

import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { Box, Container } from "@mui/material";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({ auth, children }: { auth: React.ReactNode; children: React.ReactNode }) {
  const path = usePathname();

  return (
    <html lang='en'>
      <head>
        <meta
          name='description'
          content='Курсовой работа. Приложение учета и анализа заявок клиентов для сервиса туристического агентства'
        />
        <title>TravelAgency</title>
      </head>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container className='h-screen max-w-[1600px]'>
              {path === "/login" || path === "/signup" ? (
                <Box className='mt-4'>{auth}</Box>
              ) : (
                <>
                  <Header />
                  <Box className='flex gap-2 h-[calc(100vh-5rem)]'>
                    <Box className='w-1/5 bg-red-50 py-1 px-2'>
                      <Sidebar />
                    </Box>
                    <Box className='w-4/5 bg-green-100/70 py-1 px-2'>{children}</Box>
                  </Box>
                </>
              )}
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
