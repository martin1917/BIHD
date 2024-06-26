import { Box, Divider, Paper, Typography } from "@mui/material";

const data = [
  {
    name: "Дисциплина",
    value: "Базы и хранилища данных",
  },
  {
    name: "Тема",
    value: "Приложение учета и анализа заявок клиентов для сервиса туристического агентства",
  },
  {
    name: "Студент",
    value: "Левин М.В.",
  },
  {
    name: "Группа",
    value: "20ВП1",
  },
];

export default function DetailPage() {
  return (
    <Box>
      <Typography variant='h3' className='text-center font-bold italic'>
        Курсовой проект
      </Typography>
      <Divider>Информация</Divider>
      <Paper elevation={5} className='w-3/4 mx-auto mt-5 px-5 bg-transparent'>
        <Box className='flex flex-col'>
          {data.map(({ name, value }, idx) => (
            <Box>
              <DetailItem key={idx} name={name} value={value} />
              {idx !== data.length - 1 ? <Divider /> : null}
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

function DetailItem({ name, value }: { name: string; value: string }) {
  return (
    <Box className='flex text-lg py-2'>
      <Box className='w-1/3 font-bold self-center'>{name}</Box>
      <Divider orientation='vertical' flexItem />
      <Box className='w-full ps-2 self-center'>{value}</Box>
    </Box>
  );
}
