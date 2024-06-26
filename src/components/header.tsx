import { Box, Link } from "@mui/material";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import NextLink from "next/link";

export default function Header() {
  return (
    <Box className='flex justify-between items-center p-2 mb-2 bg-amber-100'>
      <Link component={NextLink} href='/' underline='none' className='hover:underline'>
        <Box className='flex justify-center items-center gap-1'>
          <TravelExploreIcon className='size-14' />
          <Box className='font-bold text-3xl'>TravelAgancy</Box>
        </Box>
      </Link>
    </Box>
  );
}
