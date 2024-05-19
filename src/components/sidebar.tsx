"use client";

import { Stack, Link, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import TourIcon from "@mui/icons-material/Tour";
import PostAddIcon from "@mui/icons-material/PostAdd";
import HotelIcon from "@mui/icons-material/Hotel";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

interface MenuItem {
  title: string;
  path: string;
  Icon: any;
}

const menuItems: MenuItem[] = [
  {
    title: "Клиенты",
    path: "/clients",
    Icon: () => <PeopleIcon />,
  },
  {
    title: "Туры",
    path: "/tours",
    Icon: () => <TourIcon />,
  },
  {
    title: "Заявки",
    path: "/requests",
    Icon: () => <PostAddIcon />,
  },
  {
    title: "Отели",
    path: "/hotels",
    Icon: () => <HotelIcon />,
  },
  {
    title: "Статистика",
    path: "/stats",
    Icon: () => <AssessmentIcon />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <Stack spacing={1}>
      {menuItems.map(({ title, path, Icon }, idx) => (
        <Link
          key={idx}
          component={NextLink}
          href={path}
          underline='none'
          className={clsx("flex gap-2 p-2 rounded-xl", {
            "bg-gray-300": pathname === path,
          })}
        >
          <Icon />
          <Box className='hover:font-bold'>{title}</Box>
        </Link>
      ))}
    </Stack>
  );
}
