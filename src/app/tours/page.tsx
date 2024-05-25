import { Box } from "@mui/material";
import ToursTable from "./ToursTable";
import { getAllTours } from "@/actions/db-tours";

export default async function ToursPage() {
  const tours = await getAllTours();

  return (
    <Box className='h-full w-full overflow-auto'>
      <ToursTable tours={tours} />
    </Box>
  );
}
